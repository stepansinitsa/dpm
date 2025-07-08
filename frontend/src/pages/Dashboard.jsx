import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import ReservationCard from '../components/ReservationCard';

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReservations() {
      try {
        const res = await apiClient.get('/api/client/reservations');
        setReservations(res.data);
      } catch (err) {
        alert('Ошибка загрузки броней');
      } finally {
        setLoading(false);
      }
    }

    loadReservations();
  }, []);

  return (
    <div className="dashboard">
      <h2>Мои брони</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="reservations">
          {reservations.map(reservation => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;