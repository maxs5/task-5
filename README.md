# Registration Forms (Vite + React)

Две версии формы регистрации:
1. Plain React (без библиотек)
2. React Hook Form + Yup

## Требования
Node.js 18+ (рекомендуется LTS).

## Установка
```
npm install
```

## Запуск
```
npm run dev
```

## Сборка
```
npm run build
```

## Структура
- `src/App.jsx` — переключение между вариантами
- `src/RegistrationFormPlain.jsx` — чистый React
- `src/RegistrationFormRHF.jsx` — RHF + Yup
- `src/style.css` — стили

## Логирование
После сабмита данные выводятся в консоль браузера.
