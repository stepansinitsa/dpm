import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import DraggableImageList from '../components/DraggableImageList';

function EditHotelPage({ match }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const res = await apiClient.get(`/api/admin/hotels/${match.params.id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImages(res.data.images || []);
      } catch (err) {
        alert('Ошибка загрузки гостиницы');
      }
    }

    fetchHotel();
  }, [match.params.id]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) {
      alert('Максимум 10 изображений');
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const res = await apiClient.put(`/api/admin/hotels/media/${match.params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImages([...images, ...res.data]);
    } catch (err) {
      alert('Не удалось загрузить изображения');
    }
  };

  const handleSave = async () => {
    if (title.length < 5) {
      alert('Название должно быть не меньше 5 символов');
      return;
    }

    if (description.length < 100) {
      alert('Описание должно быть не меньше 100 символов');
      return;
    }

    try {
      await apiClient.put(`/api/admin/hotels/${match.params.id}`, {
        title,
        description,
      });
      window.location.href = '/admin';
    } catch (err) {
      alert('Не удалось сохранить изменения');
    }
  };

  return (
    <div className="edit-hotel-page">
      <h2>Редактировать гостиницу</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
        minLength={100}
      />

      <label>Добавить изображения:</label>
      <input type="file" multiple accept="image/*" onChange={handleImageUpload} />

      <DraggableImageList images={images} onReorder={setImages} />

      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}

export default EditHotelPage;