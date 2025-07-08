import React from 'react';

function ReservationCard({ reservation }) {
  return (
    <div className="reservation-card">
      <h3>{reservation.hotel.title}</h3>
      <p><strong>Заезд:</strong> {new Date(reservation.startDate).toLocaleDateString()}</p>
      <p><strong>Выезд:</strong> {new Date(reservation.endDate).toLocaleDateString()}</p>
      <p><strong>Гостиница:</strong> {reservation.hotel.title}</p>
      <p><strong>Номер:</strong> {reservation.hotelRoom.description}</p>
    </div>
  );
}

export default ReservationCard;