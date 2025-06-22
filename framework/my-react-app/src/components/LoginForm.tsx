import React, { useState, useEffect } from 'react';
import { validateUsername, validatePassword, clearErrors, getErrors } from '../utils/validation';
import '../styles.css';

const CORRECT_USERNAME = 'admin123';
const CORRECT_PASSWORD = 'coolPassword_123';
const SECRET_USERNAME = 'johnsnow';

const errorMessages = {
  invalid: 'Неверный логин или пароль',
};

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [showSnow, setShowSnow] = useState(false);

  useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername') ||
      sessionStorage.getItem('sessionUsername');
    if (rememberedUsername) {
      setUsername(rememberedUsername);
    }
  }, []);

  const saveCredentials = () => {
    localStorage.removeItem('rememberedUsername');
    sessionStorage.removeItem('sessionUsername');

    if (remember) {
      localStorage.setItem('rememberedUsername', username);
    } else {
      sessionStorage.setItem('sessionUsername', username);
    }
  };

  const startSnow = () => {
    setShowSnow(true);

    const duration = 5 * 1000;
    const end = Date.now() + duration;

    function frame() {
      // @ts-ignore
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
          setShowSnow(false);
        }, 500);
      }
    }

    frame();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    let newErrors: string[] = [];

    validateUsername(username);
    validatePassword(password);
    newErrors = getErrors();

    if (username === SECRET_USERNAME) {
      startSnow();
    }

    if (newErrors.length === 0) {
      if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        saveCredentials();
        alert('Вход выполнен успешно!');
      } else {
        newErrors.push(errorMessages.invalid);
      }
    }

    setErrors(newErrors);
  };

  const hasError = (field: string) => {
    return errors.some(error => error.includes(field));
  };

  return (
    <>
      <div id="overlay" className={showSnow ? '' : 'hidden'}></div>
      <div className={`app-container ${showSnow ? 'snow-background' : ''}`}>
        <header>
          <span>pupupu</span>
        </header>
        <main>
          <div id="secret-gif" className={showSnow ? '' : 'hidden'}>
            <img src="/images/secret.gif" alt="Winter is here!" />
          </div>
          <form id="login-form" onSubmit={handleSubmit}>
            <h1>Войти в pupupu</h1>

            <fieldset>
              <button type="button" className="social-button" id="google" aria-label="Войти через Google">
                Войти через Google
              </button>
              <button type="button" className="social-button" id="telegram" aria-label="Войти через Telegram">
                Войти через Telegram
              </button>
            </fieldset>

            <div className="divider">
              <span>или</span>
            </div>

            <label htmlFor="username">
              Логин
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                required
                aria-required="true"
                className={hasError('Логин') ? 'error' : ''}
              />
            </label>

            <div id="username-error" className="input-error">
              {errors.filter(error => error.includes('Логин')).map((error, i) => (
                <div key={i} className="error-message">{error}</div>
              ))}
            </div>

            <label htmlFor="password">
              Пароль
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
                aria-required="true"
                className={hasError('Пароль') ? 'error' : ''}
              />
            </label>

            <div id="password-error" className="input-error">
              {errors.filter(error => error.includes('Пароль')).map((error, i) => (
                <div key={i} className="error-message">{error}</div>
              ))}
            </div>

            <label className="remember-label">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Сохранять сессию?
            </label>

            <button type="submit" id="login-button">Войти</button>
          </form>
        </main>
        <footer>
          © 2025 madvicspar
        </footer>
      </div>
    </>
  );
};

export default LoginForm;