import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { expensesAPI } from '../services/api';

function ExpenseForm() {
  const [formData, setFormData] = useState({
    amount: '',
    category: 'fuel',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receiptUrl: '',
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
      await expensesAPI.create(formData);
      setSuccess('Harcama başarıyla oluşturuldu! (Expense created successfully!)');
      setTimeout(() => {
        navigate('/expenses');
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Harcama oluşturulurken hata oluştu (Error creating expense)');
    }
  };

  return (
    <div className="form-container">
      <h2>Yeni Harcama (New Expense)</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Kategori (Category)</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="fuel">Yakıt (Fuel)</option>
            <option value="food">Yemek (Food)</option>
            <option value="toll">Geçiş Ücreti (Toll)</option>
            <option value="parking">Park (Parking)</option>
            <option value="maintenance">Bakım (Maintenance)</option>
            <option value="other">Diğer (Other)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Miktar (Amount) (₺)</label>
          <input
            type="number"
            name="amount"
            step="0.01"
            min="0"
            value={formData.amount}
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
          <label>Tarih (Date)</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fiş URL (Receipt URL) (İsteğe bağlı / Optional)</label>
          <input
            type="url"
            name="receiptUrl"
            value={formData.receiptUrl}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
            Kaydet (Save)
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/expenses')}
            style={{ flex: 1 }}
          >
            İptal (Cancel)
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
