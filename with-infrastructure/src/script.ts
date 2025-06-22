const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById(
  'username'
) as HTMLInputElement | null;
const passwordInput = document.getElementById(
  'password'
) as HTMLInputElement | null;

const CORRECT_USERNAME = 'admin123';
const CORRECT_PASSWORD = 'coolPassword_123';
const SECRET_USERNAME = 'johnsnow';

let errors: string[] = [];
const overlay = document.getElementById('overlay');
const secretGif = document.getElementById('secret-gif');

const errorMessages = {
  username: {
    empty: 'Логин не может быть пустым',
    minLength: 'Логин должен содержать минимум 6 символов',
    maxLength: 'Логин не должен превышать 20 символов',
    invalidChars:
      'Логин может содержать только буквы (a-z, A-Z), цифры (0-9) и/или символы _-',
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
  invalid: 'Неверный логин или пароль',
};

export const validateUsername = (username: string | undefined) => {
  if (!username) {
    errors.push(errorMessages.username.empty);
  } else {
    if (username.length < 6) errors.push(errorMessages.username.minLength);
    if (username.length > 20) errors.push(errorMessages.username.maxLength);
    if (!/^[a-zA-Z0-9_-]+$/.test(<string>username)) {
      errors.push(errorMessages.username.invalidChars);
    }
    if (usernameInput?.value === SECRET_USERNAME) {
      //alert("❄️ You know nothing, Jon Snow", "error");
      startSnow();
    }
  }
};

export const validatePassword = (password: string | undefined) => {
  if (!password) {
    errors.push(errorMessages.password.empty);
  } else {
    if (password.length < 8) errors.push(errorMessages.password.minLength);
    if (password.length > 30) errors.push(errorMessages.password.maxLength);
    if (!/\d/.test(<string>password))
      errors.push(errorMessages.password.noDigit);
    if (!/[A-Z]/.test(<string>password))
      errors.push(errorMessages.password.noUpper);
    if (!/[a-z]/.test(<string>password))
      errors.push(errorMessages.password.noLower);
    if (!/[_!@#]/.test(<string>password)) {
      errors.push(errorMessages.password.noSpecial);
    }
    if (/[^a-zA-Z0-9_!@#]/.test(password)) {
      errors.push(errorMessages.password.invalidChars);
    }
  }

  return errors.length ? errors : null;
};

const saveCredentials = (remember: boolean | undefined) => {
  localStorage.removeItem('rememberedUsername');
  sessionStorage.removeItem('sessionUsername');

  if (remember) {
    localStorage.setItem('rememberedUsername', <string>usernameInput?.value);
  } else {
    sessionStorage.setItem('sessionUsername', <string>usernameInput?.value);
  }
};

function startSnow() {
  document.body.classList.add('snow-background');
  overlay?.classList.remove('hidden');
  secretGif?.classList.remove('hidden');
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  function frame() {
    // @ts-expect-error global function from the 'canvas-confetti' library loaded via CDN
    confetti({
      particleCount: 8,
      spread: 70,
      origin: { y: Math.random() - 0.2 },
      colors: [
        '#ffffff',
        '#f0f8ff',
        '#e0f7ff',
        '#b3e5fc',
        '#81d4fa',
        '#aeeaff',
        '#7ec6e9',
        '#4fc3f7',
        '#29b6f6',
        '#039be5',
        '#1e90ff',
        '#1773cd',
      ],
      shapes: ['circle'],
      scalar: 1.1,
      ticks: 200,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      setTimeout(() => {
        document.body.classList.remove('snow-background');
        overlay?.classList.add('hidden');
        secretGif?.classList.add('hidden');
      }, 500);
    }
  }

  frame();
}

export const clearErrors = () => {
  errors = [];
  usernameInput?.classList.remove('error');
  passwordInput?.classList.remove('error');
};

export function getErrors() {
  return errors;
}

function showErrors() {
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  if (usernameError) usernameError.innerHTML = '';
  if (passwordError) passwordError.innerHTML = '';

  for (const error of errors) {
    const div = document.createElement('div');
    div.className = 'error-message';
    div.textContent = error;

    if (error.includes('Логин')) {
      usernameError?.appendChild(div);
      usernameInput?.classList.add('error');
    } else {
      passwordError?.appendChild(div);
      passwordInput?.classList.add('error');
    }
  }
}

const checkCredentials = () => {
  if (
    usernameInput?.value === CORRECT_USERNAME &&
    passwordInput?.value === CORRECT_PASSWORD
  ) {
    const rememberCheckbox = document.getElementById(
      'remember'
    ) as HTMLInputElement | null;
    saveCredentials(rememberCheckbox?.checked);
    alert('Вход выполнен успешно!');
    return;
  }
  errors.push(errorMessages.invalid);
};

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  clearErrors();

  validateUsername(usernameInput?.value);
  validatePassword(passwordInput?.value);

  if (errors.length === 0) {
    checkCredentials();
  } else {
    showErrors();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const username =
    localStorage.getItem('rememberedUsername') ||
    sessionStorage.getItem('sessionUsername');
  if (username) {
    if (usernameInput) usernameInput.value = username;
  }
});
