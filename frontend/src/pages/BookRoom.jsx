import React, { useState } from 'react';
import apiClient from '../services/apiClient';

function BookRoom() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleBook = async () => {
    if (!startDate || !endDate) {
      alert('Выберите даты заезда и выезда');
      return;
    }

    try {
      await apiClient.post('/api/client/reservations', {
        hotelRoom: 'roomIdHere',
        startDate,
        endDate,
      });
      alert('Бронь создана');
    } catch (err) {
      alert('Ошибка бронирования');
    }
  };

  return (
    <div className="book-room">
      <h2>Забронировать номер</h2>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleBook}>Забронировать</button>
    </div>
  );
}

export default BookRoom;