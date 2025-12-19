import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    Activity,
    Lock,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { api } from '../../utils/api';
import './Dashboard.css';

const data = [
    { name: '00:00', inbound: 400, outbound: 240 },
    { name: '04:00', inbound: 300, outbound: 139 },
    { name: '08:00', inbound: 200, outbound: 980 },
    { name: '12:00', inbound: 278, outbound: 390 },
    { name: '16:00', inbound: 189, outbound: 480 },
    { name: '20:00', inbound: 239, outbound: 380 },
    { name: '23:59', inbound: 349, outbound: 430 },
];

const Dashboard: React.FC = () => {
    const [status, setStatus] = useState<any>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const data = await api.getSystemStatus();
                setStatus(data);
            } catch (error) {
                console.error('Failed to fetch system status:', error);
            }
        };
        fetchStatus();
    }, []);
    return (
        <div className="dashboard-container fade-in">
            <header className="page-header">
                <div>
                    <h1>Dashboard Overview</h1>
                    <p className="subtitle">Centralized iptables Management on Ubuntu LTS</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">Download PDF</button>
                    <button className="btn btn-primary">Refresh Data</button>
                </div>
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon success">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">System Health</span>
                        <span className="stat-value">{status?.status || 'Protected'}</span>
                        <span className="stat-change positive">
                            <ArrowUpRight size={14} /> {status?.uptime || '100% Online'}
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon info">
                        <Activity size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Active Rules</span>
                        <span className="stat-value">{status?.active_rules || '3,450'}</span>
                        <span className="stat-change">
                            v1.4.2 Active
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon warning">
                        <Lock size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Blocked (24h)</span>
                        <span className="stat-value">{status?.blocked_24h || '15,204'}</span>
                        <span className="stat-change positive">
                            <ArrowDownRight size={14} /> 12% vs last day
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon danger">
                        <AlertTriangle size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Security Alerts</span>
                        <span className="stat-value">{status?.alerts || '3'}</span>
                        <span className="stat-change negative">
                            High Priority
                        </span>
                    </div>
                </div>
            </div>

            <div className="dashboard-main-grid">
                <div className="chart-section card">
                    <div className="card-header">
                        <h3>Network Traffic Volume (24h)</h3>
                        <div className="chart-legend">
                            <span className="legend-item"><i className="color-dot inbound"></i> Inbound</span>
                            <span className="legend-item"><i className="color-dot outbound"></i> Outbound</span>
                        </div>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="inbound" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInbound)" strokeWidth={2} />
                                <Area type="monotone" dataKey="outbound" stroke="#10b981" fillOpacity={1} fill="url(#colorOutbound)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="recent-changes card">
                    <div className="card-header">
                        <h3>Recent Changes & Alerts</h3>
                    </div>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-time">10:45 AM</div>
                            <div className="activity-content">
                                <strong>Rule #234</strong> updated by Admin
                            </div>
                        </div>
                        <div className="activity-item alert">
                            <div className="activity-time">09:30 AM</div>
                            <div className="activity-content">
                                <strong>Alert:</strong> High Drop Rate on INPUT Chain
                            </div>
                        </div>
                        <div className="activity-item success">
                            <div className="activity-time">Yesterday</div>
                            <div className="activity-content">
                                Rollback to <strong>Version v45</strong> Successful
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-time">Yesterday</div>
                            <div className="activity-content">
                                <strong>Rule #230</strong> created by User1
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
