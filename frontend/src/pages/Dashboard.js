import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { expensesAPI, breakdownsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, isDriver, isManager } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [breakdowns, setBreakdowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [expensesRes, breakdownsRes] = await Promise.all([
        expensesAPI.getAll(),
        breakdownsAPI.getAll(),
      ]);
      setExpenses(expensesRes.data);
      setBreakdowns(breakdownsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    if (isDriver) {
      return {
        totalExpenses: expenses.length,
        pendingExpenses: expenses.filter((e) => e.status === 'pending').length,
        approvedExpenses: expenses.filter((e) => e.status === 'approved').length,
        totalBreakdowns: breakdowns.length,
      };
    } else {
      return {
        totalExpenses: expenses.length,
        pendingExpenses: expenses.filter((e) => e.status === 'pending').length,
        totalBreakdowns: breakdowns.length,
        reportedBreakdowns: breakdowns.filter((b) => b.status === 'reported').length,
      };
    }
  };

  if (loading) {
    return <div className="loading">Yükleniyor... (Loading...)</div>;
  }

  const stats = getStats();

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <h2>Hoş Geldiniz, {user.fullName} (Welcome)</h2>
        <p>Rol: {user.role === 'driver' ? 'Şoför (Driver)' : 'Yönetici (Manager)'}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Toplam Harcamalar (Total Expenses)</h3>
          <div className="value">{stats.totalExpenses}</div>
        </div>
        <div className="stat-card">
          <h3>Bekleyen Harcamalar (Pending Expenses)</h3>
          <div className="value">{stats.pendingExpenses}</div>
        </div>
        {isDriver && (
          <div className="stat-card">
            <h3>Onaylanan Harcamalar (Approved Expenses)</h3>
            <div className="value">{stats.approvedExpenses}</div>
          </div>
        )}
        <div className="stat-card">
          <h3>
            {isDriver
              ? 'Toplam Arızalar (Total Breakdowns)'
              : 'Bildirilen Arızalar (Reported Breakdowns)'}
          </h3>
          <div className="value">
            {isDriver ? stats.totalBreakdowns : stats.reportedBreakdowns}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="table-container">
          <div className="table-header">
            <h3>Son Harcamalar (Recent Expenses)</h3>
            {isDriver && (
              <button
                className="btn btn-primary"
                onClick={() => navigate('/expenses/new')}
              >
                Yeni Harcama (New Expense)
              </button>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Kategori (Category)</th>
                <th>Miktar (Amount)</th>
                <th>Durum (Status)</th>
                <th>Tarih (Date)</th>
              </tr>
            </thead>
            <tbody>
              {expenses.slice(0, 5).map((expense) => (
                <tr
                  key={expense._id}
                  onClick={() => navigate(`/expenses/${expense._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{expense.category}</td>
                  <td>₺{expense.amount.toFixed(2)}</td>
                  <td>
                    <span className={`badge badge-${expense.status}`}>
                      {expense.status === 'pending'
                        ? 'Bekliyor'
                        : expense.status === 'approved'
                        ? 'Onaylandı'
                        : 'Reddedildi'}
                    </span>
                  </td>
                  <td>{new Date(expense.date).toLocaleDateString('tr-TR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <div className="table-header">
            <h3>Son Arızalar (Recent Breakdowns)</h3>
            {isDriver && (
              <button
                className="btn btn-primary"
                onClick={() => navigate('/breakdowns/new')}
              >
                Arıza Bildir (Report Breakdown)
              </button>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Araç (Vehicle)</th>
                <th>Önem (Severity)</th>
                <th>Durum (Status)</th>
                <th>Tarih (Date)</th>
              </tr>
            </thead>
            <tbody>
              {breakdowns.slice(0, 5).map((breakdown) => (
                <tr
                  key={breakdown._id}
                  onClick={() => navigate(`/breakdowns/${breakdown._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{breakdown.vehicleId}</td>
                  <td>
                    <span className={`badge badge-${breakdown.severity}`}>
                      {breakdown.severity}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${breakdown.status}`}>
                      {breakdown.status === 'reported'
                        ? 'Bildirildi'
                        : breakdown.status === 'acknowledged'
                        ? 'Onaylandı'
                        : breakdown.status === 'in_progress'
                        ? 'Devam Ediyor'
                        : 'Çözüldü'}
                    </span>
                  </td>
                  <td>{new Date(breakdown.reportDate).toLocaleDateString('tr-TR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
