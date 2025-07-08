import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import ChatBox from '../components/ChatBox';

function SupportChat() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await apiClient.get('/api/client/support-requests');
        setChats(res.data);
      } catch (err) {
        alert('Ошибка загрузки обращений');
      }
    }

    fetchData();
  }, []);

  return (
    <div className="support-chat">
      <h2>Чат с поддержкой</h2>
      <div className="chat-list">
        {chats.map(chat => (
          <div key={chat.id}>
            <h4>{chat.isActive ? 'Активный' : 'Закрытый'} ({chat.unreadCount})</h4>
            <button onClick={() => openChat(chat)}>Открыть</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupportChat;