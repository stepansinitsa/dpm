import { validate } from 'class-validator';
import { LoginDto } from '../src/auth/dto/login.dto';
import { RegisterDto } from '../src/auth/dto/register.dto';

describe('DTO Validation', () => {
  it('должен валидировать корректный LoginDto', async () => {
    const dto = new LoginDto();
    dto.email = 'test@example.com';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('должен не пройти валидацию при неверном email', async () => {
    const dto = new LoginDto();
    dto.email = 'invalid-email';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('должен проверять минимальную длину пароля в RegisterDto', async () => {
    const dto = new RegisterDto();
    dto.email = 'test@example.com';
    dto.password = '123';
    dto.name = 'Test User';

    const errors = await validate(dto);
    expect(errors.some(e => e.property === 'password')).toBe(true);
  });
});