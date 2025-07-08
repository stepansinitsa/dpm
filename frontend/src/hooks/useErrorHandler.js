import { useState } from 'react';

export function useErrorHandler() {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err.message || 'Произошла ошибка');
    setTimeout(() => setError(null), 5000);
  };

  return { error, handleError };
}