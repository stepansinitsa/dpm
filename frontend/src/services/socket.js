import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_WS_URL, {
  withCredentials: true,
});

// Подписка на конкретный чат
export const subscribeToChat = (chatId, handler) => {
  socket.emit('subscribeToChat', chatId);
  socket.on('chatMessage', handler);
};

// Отправка сообщения
export const sendSupportMessage = (chatId, text) => {
  socket.emit('sendMessage', {
    supportRequest: chatId,
    text,
  });
};

export default socket;