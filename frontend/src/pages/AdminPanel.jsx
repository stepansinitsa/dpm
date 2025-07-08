import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import HotelCard from '../components/HotelCard';

function AdminPanel() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await apiClient.get('/api/admin/hotels');
        setHotels(res.data);
      } catch (err) {
        alert('Ошибка загрузки гостиниц');
      }
    }

    fetchHotels();
  }, []);

  return (
    <div className="admin-panel">
      <h2>Админ-панель</h2>
      <section>
        <h3>Гостиницы</h3>
        <div className="hotel-list">
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;