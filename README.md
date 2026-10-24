# Weather Manager (Frontend)

## Стек технологій

- **Core:** React, Vite
- **Стейт-менеджмент:** Redux Toolkit
- **UI & Стилізація:** Material UI
- **Роутинг:** React Router DOM
- **HTTP-клієнт:** Axios
- **Інтернаціоналізація:** i18next, react-i18next (UA / EN)

---

## Архітектура та функціонал

- `src/api/` — конфігурація інстансу Axios та функції запитів до бекенду.
- `src/components/` — UI-компоненти: авторизація, модальні вікна профілю, погодні картки та навігація.
- `src/store/` — сховище Redux Toolkit і слайси стану (`authSlice`, `weatherSlice`, `favouritesSlice`).
- `src/assets/locales/` — словники локалізації інтерфейсу (`ua.json`, `en.json`).
- `src/constants/` — глобальні константи та конфігураційні змінні.

---

## 🚀 Встановлення та запуск

# 1. Клонування репозиторію та перехід у папку
```bash
git clone https://github.com/javidoru02-byte/Weather-manager.git
cd Weather-manager
```

# 2. Встановлення залежностей
```bash
npm install
```

# 3. Запуск клієнта для розробки
```bash
npm run dev
```
