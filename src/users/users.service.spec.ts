import { ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UsersService } from './users.service.js';
import { User } from './entities/user.entity.js';

// Repositorio falso en memoria con los métodos que usa el servicio
function createFakeRepo() {
  let rows: User[] = [];
  let seq = 0;
  const repo = {
    count: async () => rows.length,
    find: async () => [...rows],
    findOneBy: async ({ id }: { id: string }) => rows.find((u) => u.id === id) ?? null,
    existsBy: async ({ email }: { email: string }) => rows.some((u) => u.email === email),
    create: (data: Partial<User>) => ({ ...data }) as User,
    merge: (entity: User, changes: Partial<User>) => Object.assign(entity, changes),
    save: async (data: User | User[]) => {
      const list = Array.isArray(data) ? data : [data];
      for (const u of list) {
        if (!u.id) {
          u.id = `00000000-0000-4000-8000-${String(++seq).padStart(12, '0')}`;
          rows.push(u);
        }
      }
      return data;
    },
    remove: async (u: User) => {
      rows = rows.filter((r) => r.id !== u.id);
      return u;
    },
  };
  return repo as unknown as Repository<User>;
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    service = new UsersService(createFakeRepo());
    await service.onModuleInit();
  });

  it('inserta los usuarios iniciales una sola vez', async () => {
    await service.onModuleInit();
    expect(await service.findAll()).toHaveLength(2);
  });

  it('crea un usuario y guarda el email en minúsculas', async () => {
    const { data } = await service.create({ name: 'Ana', lastname: 'Gómez', email: 'Ana@Correo.com' });
    expect(data.email).toBe('ana@correo.com');
    expect(await service.findOne(data.id)).toMatchObject({ name: 'Ana' });
  });

  it('rechaza un email repetido con 409', async () => {
    await expect(
      service.create({ name: 'X', lastname: 'Y', email: 'JUANITA@correo.com' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('actualiza solo los campos enviados', async () => {
    const [first] = await service.findAll();
    const { data } = await service.update(first.id, { name: 'Juana' });
    expect(data).toMatchObject({ name: 'Juana', lastname: 'Perez', email: 'juanita@correo.com' });
  });

  it('permite actualizar conservando el mismo email', async () => {
    const [first] = await service.findAll();
    await expect(service.update(first.id, { email: 'juanita@correo.com' })).resolves.toBeDefined();
  });

  it('no permite cambiar a un email que usa otro usuario', async () => {
    const [first] = await service.findAll();
    await expect(service.update(first.id, { email: 'carlos@correo.com' })).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it('devuelve 404 al buscar, editar o eliminar un usuario inexistente', async () => {
    const missing = '11111111-1111-4111-8111-111111111111';
    await expect(service.findOne(missing)).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.update(missing, { name: 'Z' })).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.remove(missing)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('elimina un usuario', async () => {
    const [first] = await service.findAll();
    await service.remove(first.id);
    expect(await service.findAll()).toHaveLength(1);
  });
});
