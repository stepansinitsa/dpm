import React from 'react';
import { Link } from 'react-router-dom';

function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img src={hotel.images[0]} alt={hotel.hotel.title} style={{ width: '100%' }} />
      <h3>{hotel.hotel.title}</h3>
      <p>{truncateText(hotel.description)}</p>
      <Link to={`/room/${hotel.id}`}>
        <button>Подробнее</button>
      </Link>
    </div>
  );
}

export default HotelCard;