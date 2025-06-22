import {
  validateUsername,
  validatePassword,
  getErrors,
  clearErrors,
} from './script';

describe('Auth validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Username validation', () => {
    it('should reject short username', () => {
      validateUsername('login');
      expect(getErrors()).toContain(
        'Логин должен содержать минимум 6 символов'
      );
    });

    it('should accept valid username', () => {
      clearErrors();
      validateUsername('admin123');
      expect(getErrors()).toHaveLength(0);
    });
  });

  describe('Password validation', () => {
    it('should reject weak password', () => {
      clearErrors();
      validatePassword('weak');
      const errors = getErrors();
      expect(errors).toEqual([
        'Пароль должен содержать минимум 8 символов',
        'Пароль должен содержать хотя бы одну цифру (0-9)',
        'Пароль должен содержать хотя бы одну заглавную букву (A-Z)',
        'Пароль должен содержать хотя бы один специальный символ (_!@#)',
      ]);
    });

    it('should accept strong password', () => {
      clearErrors();
      validatePassword('StrongPass123!');
      const errors = getErrors();
      expect(errors).toHaveLength(0);
    });
  });
});
