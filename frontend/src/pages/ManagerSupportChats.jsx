import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

function ManagerSupportChats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    async function fetchChats() {
      try {
        const res = await apiClient.get('/api/manager/support-requests');
        setChats(res.data);
      } catch (err) {
        alert('Ошибка загрузки обращений');
      }
    }

    fetchChats();
  }, []);

  return (
    <div className="manager-support-chats">
      <h2>Обращения клиентов</h2>
      <div className="chat-list">
        {chats.map(chat => (
          <div key={chat.id}>
            <h4>{chat.client.name} ({chat.hasNewMessages ? '⚠' : ''})</h4>
            <button onClick={() => window.location.href = `/chat/${chat.id}`}>Открыть</button>
          </div>
        ))}
      </div>
    </div>
  );
}