import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

function HotelDetailsPage({ match }) {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    async function loadHotel() {
      const res = await apiClient.get(`/api/common/hotel-rooms/${match.params.id}`);
      setHotel(res.data);
    }

    loadHotel();
  }, [match.params.id]);

  if (!hotel) return <p>Загрузка...</p>;

  return (
    <div className="hotel-details">
      <h2>{hotel.hotel.title}</h2>
      <p>{hotel.hotel.description}</p>
      <div className="hotel-images">
        {hotel.images.map((img, idx) => (
          <img key={idx} src={img} alt={`Номер ${idx}`} />
        ))}
      </div>
    </div>
  );
}

export default HotelDetailsPage;