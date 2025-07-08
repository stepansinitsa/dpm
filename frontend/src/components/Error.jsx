import React from 'react';

function Error({ message }) {
  if (!message) return null;

  return (
    <div className="error-box">
      <p>⚠ {message}</p>
    </div>
  );
}

export default Error;