import React, { useEffect, useState } from 'react';
import socket from '../services/socket';

function ChatBox({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.emit('subscribeToChat', chatId);

    socket.on('chatMessage', (request, message) => {
      if (request.id === chatId) {
        setMessages(prev => [...prev, message]);
      }
    });

    return () => {
      socket.off('chatMessage');
    };
  }, [chatId]);

  const handleSend = () => {
    if (!input.trim()) return;
    socket.emit('sendMessage', {
      supportRequest: chatId,
      text: input,
    });
    setInput('');
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.author.role}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишите сообщение..."
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  );
}

export default ChatBox;