import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { breakdownsAPI } from '../services/api';

function BreakdownForm() {
  const [formData, setFormData] = useState({
    vehicleId: '',
    location: '',
    description: '',
    severity: 'medium',
    photoUrls: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = {
        ...formData,
        photoUrls: formData.photoUrls ? formData.photoUrls.split(',').map((url) => url.trim()) : [],
      };
      await breakdownsAPI.create(data);
      setSuccess('Arıza başarıyla bildirildi! (Breakdown reported successfully!)');
      setTimeout(() => {
        navigate('/breakdowns');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Arıza bildirilirken hata oluştu (Error reporting breakdown)');
    }
  };

  return (
    <div className="form-container">
      <h2>Arıza Bildir (Report Breakdown)</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Araç ID (Vehicle ID)</label>
          <input
            type="text"
            name="vehicleId"
            value={formData.vehicleId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Konum (Location)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Açıklama (Description)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Önem Derecesi (Severity)</label>
          <select name="severity" value={formData.severity} onChange={handleChange}>
            <option value="low">Düşük (Low)</option>
            <option value="medium">Orta (Medium)</option>
            <option value="high">Yüksek (High)</option>
            <option value="critical">Kritik (Critical)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Fotoğraf URL'leri (Photo URLs) (Virgülle ayrılmış / Comma separated)</label>
          <input
            type="text"
            name="photoUrls"
            value={formData.photoUrls}
            onChange={handleChange}
            placeholder="http://example.com/photo1.jpg, http://example.com/photo2.jpg"
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            Bildir (Report)
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/breakdowns')}
            style={{ flex: 1 }}
          >
            İptal (Cancel)
          </button>
        </div>
      </form>
    </div>
  );
}

export default BreakdownForm;
