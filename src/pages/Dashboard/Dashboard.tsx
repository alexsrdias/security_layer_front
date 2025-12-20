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
    const [logs, setLogs] = useState<any[]>([]); // Using any[] temporarily if strict typing fails, or AuditLog[]
    const [rulesStats, setRulesStats] = useState<{ active: number, total: number } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statusData, logsData, rulesData] = await Promise.all([
                    api.getSystemStatus().catch(err => console.error('System status error:', err)),
                    api.getAuditLogs().catch(err => console.error('Audit logs error:', err)),
                    api.getRules().catch(err => console.error('Rules fetch error:', err))
                ]);

                if (statusData) setStatus(statusData);

                if (rulesData) {
                    const total = rulesData.length;
                    const active = rulesData.filter((r: any) => r.status === 'APPLIED').length;
                    setRulesStats({ active, total });
                }

                if (logsData) {
                    // Sort by timestamp desc and take top 10
                    const sortedLogs = Array.isArray(logsData) ? logsData.sort((a: any, b: any) =>
                        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
                    ).slice(0, 10) : [];
                    setLogs(sortedLogs);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }
        };
        fetchData();
    }, []);

    const formatTime = (isoString: string) => {
        if (!isoString) return '-';
        const date = new Date(isoString);
        // Short format: MM/DD HH:mm
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const getSeverityClass = (log: any) => {
        if (log.severity) return log.severity;
        const text = (log.action + log.details).toLowerCase();
        if (text.includes('alert') || text.includes('drop') || text.includes('error') || text.includes('dnat')) return 'alert';
        if (text.includes('success') || text.includes('rollback') || text.includes('applied') || text.includes('create')) return 'success';
        return '';
    };

    // Helper to extract ID from details string if possible
    const extractId = (details: string): string => {
        if (!details) return '-';
        // Look for pattern "ID: 123" or "rule 123" or "#123"
        const match = details.match(/(?:id|rule|regra)[:\s#]*(\d+)/i);
        return match ? `#${match[1]}` : '-';
    };



    return (
        <div className="dashboard-container fade-in">
            <header className="page-header">
                <div>
                    <h1>Dashboard Overview</h1>
                    <p className="subtitle">Centralized Firewall Management on Ubuntu LTS</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">Download PDF</button>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh Data</button>
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
                        <span className="stat-value">
                            {rulesStats ? `${rulesStats.active} / ${rulesStats.total}` : 'Loading...'}
                        </span>
                        <span className="stat-change">
                            Active / Configured
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon warning">
                        <Lock size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Blocked (24h)</span>
                        <span className="stat-value">{status?.blocked_24h || '0'}</span>
                        <span className="stat-change positive">
                            <ArrowDownRight size={14} /> Packet Drops
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon danger">
                        <AlertTriangle size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Security Alerts</span>
                        <span className="stat-value">{status?.alerts || '0'}</span>
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
                        <div className="activity-header">
                            <span>Date</span>
                            <span>ID</span>
                            <span>Action / Details</span>
                            <span style={{ textAlign: 'right' }}>User</span>
                        </div>
                        {logs.length > 0 ? (
                            logs.map((log) => {
                                // Flexible field mapping
                                const timestamp = log.timestamp || log.created_at || log.date || new Date().toISOString();
                                // Try to find ID in properties first, then regex
                                const ruleId = log.rule_id || log.resource_id || log.id || extractId(log.details || '') || extractId(log.action || '');
                                // Try to find User in properties
                                const user = log.username || log.user?.username || log.user || log.created_by || 'System';
                                const action = log.action || 'Update';
                                const details = log.details || log.description || '';

                                return (
                                    <div key={log.id || Math.random()} className={`activity-item ${getSeverityClass(log)}`}>
                                        <div className="activity-date" title={new Date(timestamp).toLocaleString()}>
                                            {formatTime(timestamp)}
                                        </div>
                                        <div className="activity-id">
                                            {ruleId && ruleId !== '-' ? (ruleId.toString().startsWith('#') ? ruleId : `#${ruleId}`) : '-'}
                                        </div>
                                        <div className="activity-action" title={details}>
                                            {action} <span style={{ opacity: 0.7, fontWeight: 400 }}>{details ? `- ${details}` : ''}</span>
                                        </div>
                                        <div className="activity-user" title={user}>
                                            {user}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="activity-item">
                                <span style={{ color: '#94a3b8', fontStyle: 'italic', gridColumn: '1 / -1', textAlign: 'center' }}>
                                    No recent activity found.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
