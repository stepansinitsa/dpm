import { SessionGuard } from '../src/auth/guards/session.guard';

describe('SessionGuard', () => {
  let guard: SessionGuard;

  beforeEach(() => {
    guard = new SessionGuard();
  });

  it('должен пропустить авторизованного пользователя', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ session: { user: {} } }),
      }),
    };

    expect(guard.canActivate(context as any)).toBe(true);
  });

  it('должен запретить неавторизованным', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ session: { user: null } }),
      }),
    };

    expect(guard.canActivate(context as any)).toBe(false);
  });
});