import React, { useState } from 'react';
import apiClient from '../services/apiClient';

function AddHotelPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 10) {
      alert('Максимум 10 изображений');
      return;
    }

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    try {
      const res = await apiClient.put('/api/admin/hotels/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setImages([...images, ...res.data]);
    } catch (err) {
      alert('Ошибка загрузки изображений');
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
      const res = await apiClient.post('/api/admin/hotels', {
        title,
        description,
      });
      window.location.href = `/edit-hotel/${res.data.id}`;
    } catch (err) {
      alert('Не удалось добавить гостиницу');
    }
  };

  return (
    <div className="add-hotel-page">
      <h2>Добавление гостиницы</h2>
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
      <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
      <DraggableImageList images={images} onReorder={setImages} />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}

export default AddHotelPage;