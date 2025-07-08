# HotelHub – сайт для бронирования гостиниц

## Описание

Проект реализован как часть дипломной работы на курсе Fullstack-разработчика.  
Включает:

- NestJS API (бэкенд)
- React SPA (фронтенд)
- MongoDB
- WebSocket чат техподдержки
- Ролевая система: `client`, `manager`, `admin`
- Бронирование с проверкой доступности по датам
- Загрузка и перетаскивание изображений

## Технологии

- **Backend:** NestJS, MongoDB, Mongoose, Passport.js, Socket.IO
- **Frontend:** React, Redux Toolkit, Axios, Socket.IO, Vite
- **Безопасность:** XSS защита, хэширование паролей, сессии
- **WebSocket:** Чат техподдержки с подпиской по chatId
- **Формы:** Валидация через `yup` + `react-hook-form`
- **Стили:** CSS-модули, адаптивный дизайн
- **Запуск:** Docker Compose

## Установка

1. Клонируй репозиторий
2. Создай `.env` из `.env-example`
3. Выполни `docker-compose up --build`

## Эндпоинты

### Auth

- POST `/api/auth/login`
- POST `/api/auth/logout`
- POST `/api/client/register`

### Hotels

- GET `/api/common/hotel-rooms`
- GET `/api/common/hotel-rooms/:id`
- POST `/api/admin/hotels`
- PUT `/api/admin/hotels/:id`
- POST `/api/admin/hotel-rooms`
- PUT `/api/admin/hotel-rooms/:id`

### Reservations

- POST `/api/client/reservations`
- GET `/api/client/reservations`
- DELETE `/api/client/reservations/:id`
- GET `/api/manager/reservations/:userId`
- DELETE `/api/manager/reservations/:id`

### Support

- POST `/api/client/support-requests`
- GET `/api/client/support-requests`
- GET `/api/manager/support-requests`
- GET `/api/common/support-requests/:id/messages`
- POST `/api/common/support-requests/:id/messages`
- POST `/api/common/support-requests/:id/messages/read`
- WebSocket: `subscribeToChat(chatId)`

## Лицензия

MIT
