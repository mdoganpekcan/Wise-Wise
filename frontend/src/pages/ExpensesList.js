import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { expensesAPI } from '../services/api';

function ExpensesList() {
  const { isDriver, isManager } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, [filter]);

  const fetchExpenses = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await expensesAPI.getAll(params);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id, e) => {
    e.stopPropagation();
    try {
      await expensesAPI.approve(id);
      fetchExpenses();
    } catch (error) {
      console.error('Error approving expense:', error);
      alert('Harcama onaylanırken hata oluştu (Error approving expense)');
    }
  };

  const handleReject = async (id, e) => {
    e.stopPropagation();
    const reason = prompt('Ret nedeni (Rejection reason):');
    if (reason) {
      try {
        await expensesAPI.reject(id, reason);
        fetchExpenses();
      } catch (error) {
        console.error('Error rejecting expense:', error);
        alert('Harcama reddedilirken hata oluştu (Error rejecting expense)');
      }
    }
  };

  if (loading) {
    return <div className="loading">Yükleniyor... (Loading...)</div>;
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Harcamalar (Expenses)</h2>
        {isDriver && (
          <button className="btn btn-primary" onClick={() => navigate('/expenses/new')}>
            Yeni Harcama (New Expense)
          </button>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>Filtre (Filter):</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tümü (All)</option>
          <option value="pending">Bekleyen (Pending)</option>
          <option value="approved">Onaylanan (Approved)</option>
          <option value="rejected">Reddedilen (Rejected)</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {isManager && <th>Şoför (Driver)</th>}
              <th>Kategori (Category)</th>
              <th>Açıklama (Description)</th>
              <th>Miktar (Amount)</th>
              <th>Tarih (Date)</th>
              <th>Durum (Status)</th>
              {isManager && <th>İşlemler (Actions)</th>}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense._id}
                onClick={() => navigate(`/expenses/${expense._id}`)}
                style={{ cursor: 'pointer' }}
              >
                {isManager && <td>{expense.driverId?.fullName || 'N/A'}</td>}
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>₺{expense.amount.toFixed(2)}</td>
                <td>{new Date(expense.date).toLocaleDateString('tr-TR')}</td>
                <td>
                  <span className={`badge badge-${expense.status}`}>
                    {expense.status === 'pending'
                      ? 'Bekliyor'
                      : expense.status === 'approved'
                      ? 'Onaylandı'
                      : 'Reddedildi'}
                  </span>
                </td>
                {isManager && (
                  <td>
                    {expense.status === 'pending' && (
                      <div className="actions">
                        <button
                          className="btn btn-success"
                          onClick={(e) => handleApprove(expense._id, e)}
                        >
                          Onayla (Approve)
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => handleReject(expense._id, e)}
                        >
                          Reddet (Reject)
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {expenses.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#7f8c8d' }}>
            Harcama bulunamadı (No expenses found)
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpensesList;
