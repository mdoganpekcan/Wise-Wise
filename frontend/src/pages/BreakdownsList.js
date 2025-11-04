import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { breakdownsAPI } from '../services/api';

function BreakdownsList() {
  const { isDriver, isManager } = useAuth();
  const [breakdowns, setBreakdowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBreakdowns();
  }, [filter]);

  const fetchBreakdowns = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await breakdownsAPI.getAll(params);
      setBreakdowns(response.data);
    } catch (error) {
      console.error('Error fetching breakdowns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async (id, e) => {
    e.stopPropagation();
    try {
      await breakdownsAPI.acknowledge(id);
      fetchBreakdowns();
    } catch (error) {
      console.error('Error acknowledging breakdown:', error);
      alert('Arıza onaylanırken hata oluştu (Error acknowledging breakdown)');
    }
  };

  const handleUpdateStatus = async (id, status, e) => {
    e.stopPropagation();
    try {
      await breakdownsAPI.updateStatus(id, { status });
      fetchBreakdowns();
    } catch (error) {
      console.error('Error updating breakdown status:', error);
      alert('Arıza durumu güncellenirken hata oluştu (Error updating breakdown status)');
    }
  };

  if (loading) {
    return <div className="loading">Yükleniyor... (Loading...)</div>;
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <h2>Arızalar (Breakdowns)</h2>
        {isDriver && (
          <button className="btn btn-primary" onClick={() => navigate('/breakdowns/new')}>
            Arıza Bildir (Report Breakdown)
          </button>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>Filtre (Filter):</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Tümü (All)</option>
          <option value="reported">Bildirildi (Reported)</option>
          <option value="acknowledged">Onaylandı (Acknowledged)</option>
          <option value="in_progress">Devam Ediyor (In Progress)</option>
          <option value="resolved">Çözüldü (Resolved)</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {isManager && <th>Şoför (Driver)</th>}
              <th>Araç (Vehicle)</th>
              <th>Konum (Location)</th>
              <th>Açıklama (Description)</th>
              <th>Önem (Severity)</th>
              <th>Durum (Status)</th>
              <th>Tarih (Date)</th>
              {isManager && <th>İşlemler (Actions)</th>}
            </tr>
          </thead>
          <tbody>
            {breakdowns.map((breakdown) => (
              <tr
                key={breakdown._id}
                onClick={() => navigate(`/breakdowns/${breakdown._id}`)}
                style={{ cursor: 'pointer' }}
              >
                {isManager && <td>{breakdown.driverId?.fullName || 'N/A'}</td>}
                <td>{breakdown.vehicleId}</td>
                <td>{breakdown.location}</td>
                <td>{breakdown.description}</td>
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
                {isManager && (
                  <td>
                    {breakdown.status === 'reported' && (
                      <button
                        className="btn btn-success"
                        onClick={(e) => handleAcknowledge(breakdown._id, e)}
                      >
                        Onayla (Acknowledge)
                      </button>
                    )}
                    {breakdown.status === 'acknowledged' && (
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleUpdateStatus(breakdown._id, 'in_progress', e)}
                      >
                        Başlat (Start)
                      </button>
                    )}
                    {breakdown.status === 'in_progress' && (
                      <button
                        className="btn btn-success"
                        onClick={(e) => handleUpdateStatus(breakdown._id, 'resolved', e)}
                      >
                        Çöz (Resolve)
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {breakdowns.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#7f8c8d' }}>
            Arıza bulunamadı (No breakdowns found)
          </div>
        )}
      </div>
    </div>
  );
}

export default BreakdownsList;
