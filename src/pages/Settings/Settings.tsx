import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import './Settings.css';

const Settings: React.FC = () => {
    // --- State Mockups ---
    const [hostname, setHostname] = useState('fw-ubuntu-lts-01');
    const [ntpEnabled, setNtpEnabled] = useState(true);
    const [ntpServer, setNtpServer] = useState('pool.ntp.org');

    // Network Interfaces
    const interfaces = [
        { name: 'eth0', ip: '192.168.1.10', netmask: '255.255.255.0', gateway: '192.168.1.1', vlan: '-' },
        { name: 'eth1', ip: '10.0.0.5', netmask: '255.255.0.0', gateway: '-', vlan: '100' }
    ];

    // Services
    const services = [
        { name: 'iptables (netfilter)', status: 'Running' },
        { name: 'sshd', status: 'Running' },
        { name: 'ntpd', status: 'Running' },
        { name: 'cron', status: 'Running' }
    ];

    return (
        <div className="settings-container fade-in">
            <div className="breadcrumb">Home {'>'} Settings {'>'} System Settings</div>
            <header className="page-header">
                <h1>System Settings</h1>
            </header>

            <div className="settings-grid">
                {/* Left Column */}
                <div className="settings-col left">

                    {/* Hostname Card */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>Hostname</h3>
                            <button className="btn btn-sm btn-secondary">
                                <Edit2 size={14} /> Edit
                            </button>
                        </div>
                        <div className="settings-card-body">
                            <div className="settings-form-group">
                                <label>Current Hostname: {hostname}</label>
                                <input
                                    type="text"
                                    className="settings-input"
                                    value={hostname}
                                    onChange={(e) => setHostname(e.target.value)}
                                />
                            </div>
                            <div className="card-actions">
                                <button className="btn btn-secondary">Cancel</button>
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>Date and Time</h3>
                        </div>
                        <div className="settings-card-body">
                            <div className="settings-form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                <div>
                                    <label>NTP Synchronization</label>
                                    <label className="toggle-label">
                                        <div className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={ntpEnabled}
                                                onChange={(e) => setNtpEnabled(e.target.checked)}
                                            />
                                            <span className="slider"></span>
                                        </div>
                                        {ntpEnabled ? 'On' : 'Off'}
                                    </label>
                                </div>
                                <div>
                                    <label>NTP Server</label>
                                    <input
                                        type="text"
                                        className="settings-input"
                                        value={ntpServer}
                                        onChange={(e) => setNtpServer(e.target.value)}
                                        disabled={!ntpEnabled}
                                    />
                                </div>
                            </div>
                            <div className="settings-form-group">
                                <label>Current System Time</label>
                                <div style={{ fontSize: '0.95rem', color: '#1e293b' }}>
                                    {new Date().toISOString().replace('T', ' ').split('.')[0]} UTC
                                </div>
                            </div>
                            <div className="card-actions">
                                <button className="btn btn-secondary">Cancel</button>
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>

                    {/* Network Interface Configuration */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>Network Interface Configuration</h3>
                        </div>
                        <div className="settings-card-body" style={{ padding: 0 }}>
                            <table className="settings-table">
                                <thead>
                                    <tr>
                                        <th>Interface</th>
                                        <th>IP Address</th>
                                        <th>Netmask</th>
                                        <th>Gateway</th>
                                        <th>VLAN ID</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {interfaces.map(iface => (
                                        <tr key={iface.name}>
                                            <td style={{ fontWeight: 500 }}>{iface.name}</td>
                                            <td>{iface.ip}</td>
                                            <td>{iface.netmask}</td>
                                            <td>{iface.gateway}</td>
                                            <td>{iface.vlan}</td>
                                            <td>
                                                <button className="icon-btn sm" title="Edit Interface">
                                                    <Edit2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={{ padding: '16px 24px' }} className="card-actions">
                                <button className="btn btn-primary">Save All</button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column */}
                <div className="settings-col right">

                    {/* Timezone */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>Timezone</h3>
                        </div>
                        <div className="settings-card-body">
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '8px' }}>Select Timezone</label>
                            <select className="settings-select">
                                <option>UTC (Coordinated Universal Time)</option>
                                <option>America/New_York (EST)</option>
                                <option>Europe/London (GMT)</option>
                                <option>Asia/Tokyo (JST)</option>
                            </select>
                            <div className="card-actions">
                                <button className="btn btn-secondary" disabled>Save</button>
                            </div>
                        </div>
                    </div>

                    {/* DNS Configuration */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>DNS Configuration</h3>
                        </div>
                        <div className="settings-card-body">
                            <div className="settings-form-group">
                                <label>Primary DNS Server</label>
                                <input type="text" className="settings-input" placeholder="e.g. 8.8.8.8" />
                            </div>
                            <div className="settings-form-group">
                                <label>Secondary DNS Server</label>
                                <input type="text" className="settings-input" placeholder="e.g. 1.1.1.1" />
                            </div>
                            <div className="card-actions">
                                <button className="btn btn-secondary">Cancel</button>
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>

                    {/* Service Management */}
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <h3>Service Management</h3>
                        </div>
                        <div className="settings-card-body" style={{ padding: 0 }}>
                            <table className="settings-table">
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map(service => (
                                        <tr key={service.name}>
                                            <td style={{ fontWeight: 500 }}>{service.name}</td>
                                            <td>
                                                <span className={`status-dot ${service.status.toLowerCase()}`}></span>
                                                {service.status}
                                            </td>
                                            <td>
                                                <button className="action-link">[Restart]</button>
                                                <button className="action-link danger">[Stop]</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div style={{ padding: '16px 24px' }} className="card-actions">
                                <button className="btn btn-primary">Save Service State</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;
