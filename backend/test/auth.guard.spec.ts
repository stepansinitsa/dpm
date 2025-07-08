import { Reflector } from '@nestjs/core';
import { RoleGuard } from '../src/auth/guards/role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
    const reflector = new Reflector();
    guard = new RoleGuard(reflector);
  });

  it('должен разрешить доступ администратору', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ session: { user: { role: 'admin' } }),
      }),
    };

    expect(guard.canActivate(context as any)).toBe(true);
  });

  it('должен запретить доступ неадмину', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ session: { user: { role: 'client' } }),
      }),
    };

    expect(guard.canActivate(context as any)).toBe(false);
  });
});