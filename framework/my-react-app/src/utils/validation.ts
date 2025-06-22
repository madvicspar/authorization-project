export let errors: string[] = [];

export const errorMessages = {
  username: {
    empty: 'Логин не может быть пустым',
    minLength: 'Логин должен содержать минимум 6 символов',
    maxLength: 'Логин не должен превышать 20 символов',
    invalidChars: 'Логин может содержать только буквы (a-z, A-Z), цифры (0-9) и/или символы _-',
  },
  password: {
    empty: 'Пароль не может быть пустым',
    minLength: 'Пароль должен содержать минимум 8 символов',
    maxLength: 'Пароль не должен превышать 30 символов',
    noDigit: 'Пароль должен содержать хотя бы одну цифру (0-9)',
    noUpper: 'Пароль должен содержать хотя бы одну заглавную букву (A-Z)',
    noLower: 'Пароль должен содержать хотя бы одну строчную букву (a-z)',
    noSpecial: 'Пароль должен содержать хотя бы один специальный символ (_!@#)',
    invalidChars: 'Пароль содержит недопустимые символы',
  },
};

export const validateUsername = (username: string | undefined) => {
  if (!username) {
    errors.push(errorMessages.username.empty);
  } else {
    if (username.length < 6) errors.push(errorMessages.username.minLength);
    if (username.length > 20) errors.push(errorMessages.username.maxLength);
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      errors.push(errorMessages.username.invalidChars);
    }
  }
};

export const validatePassword = (password: string | undefined) => {
  if (!password) {
    errors.push(errorMessages.password.empty);
  } else {
    if (password.length < 8) errors.push(errorMessages.password.minLength);
    if (password.length > 30) errors.push(errorMessages.password.maxLength);
    if (!/\d/.test(password)) errors.push(errorMessages.password.noDigit);
    if (!/[A-Z]/.test(password)) errors.push(errorMessages.password.noUpper);
    if (!/[a-z]/.test(password)) errors.push(errorMessages.password.noLower);
    if (!/[_!@#]/.test(password)) {
      errors.push(errorMessages.password.noSpecial);
    }
    if (/[^a-zA-Z0-9_!@#]/.test(password)) {
      errors.push(errorMessages.password.invalidChars);
    }
  }
};

export const clearErrors = () => {
  errors = [];
};

export function getErrors() {
  return errors;
}