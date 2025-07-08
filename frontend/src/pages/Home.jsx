import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import HotelCard from '../components/HotelCard';

function Home() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await apiClient.get('/api/common/hotel-rooms');
        setHotels(res.data);
      } catch (err) {
        alert('Не удалось загрузить отели');
      }
    }

    fetchHotels();
  }, []);

  return (
    <div className="home-page">
      <h1>Добро пожаловать в HotelHub</h1>
      <div className="hotel-list">
        {hotels.map(hotel => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default Home;