import React from 'react';

function ChatItem({ chat }) {
  return (
    <div className="chat-item">
      <h4>{chat.title}</h4>
      {chat.hasNewMessages && <span className="new-message-indicator">⚠</span>}
    </div>
  );
}

export default ChatItem;