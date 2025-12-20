import React, { useState } from 'react';
import { Search, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import './Objects.css';

interface NetworkObject {
    id: string;
    name: string;
    type: 'IP Address' | 'Subnet' | 'Port' | 'Group';
    value: string;
    description: string;
    createdOn: string;
    lastModified: string;
    status: 'Active' | 'Inactive';
}

const mockObjects: NetworkObject[] = [
    { id: '1', name: 'Web-Server-IP', type: 'IP Address', value: '192.168.1.10', description: 'Primary web server IP', createdOn: '2023-10-25', lastModified: '2024-01-12', status: 'Active' },
    { id: '2', name: 'Database-Subnet', type: 'Subnet', value: '10.0.1.0/24', description: 'Internal database network', createdOn: '2023-09-15', lastModified: '2023-12-01', status: 'Active' },
    { id: '3', name: 'SSH-Port', type: 'Port', value: '22', description: 'Standard SSH port', createdOn: '2023-08-01', lastModified: '2023-11-05', status: 'Active' },
    { id: '4', name: 'App-Service-Group', type: 'Group', value: 'Contains 3 objects', description: 'Group for application services', createdOn: '2024-02-10', lastModified: '2024-03-20', status: 'Active' },
    { id: '5', name: 'Database-Backup-IP', type: 'IP Address', value: '192.168.1.20', description: 'Backup DB Server', createdOn: '2023-10-26', lastModified: '2024-01-15', status: 'Active' },
    { id: '6', name: 'Legacy-System', type: 'Subnet', value: '10.0.9.0/24', description: 'Old legacy network', createdOn: '2022-05-10', lastModified: '2023-12-01', status: 'Inactive' },
    { id: '7', name: 'HTTP-Port', type: 'Port', value: '80', description: 'Standard HTTP port', createdOn: '2023-08-01', lastModified: '2023-11-05', status: 'Active' },
    { id: '8', name: 'HTTPS-Port', type: 'Port', value: '443', description: 'Standard HTTPS port', createdOn: '2023-08-01', lastModified: '2023-11-05', status: 'Active' },
    { id: '9', name: 'VPN-Subnet', type: 'Subnet', value: '172.16.0.0/16', description: 'VPN Client Network', createdOn: '2024-01-15', lastModified: '2024-02-01', status: 'Active' },
    { id: '10', name: 'Monitoring-Group', type: 'Group', value: 'Contains 5 objects', description: 'Monitoring tools access', createdOn: '2024-02-15', lastModified: '2024-02-15', status: 'Active' },
];

const Objects: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredObjects = mockObjects.filter(obj => {
        const matchesSearch = obj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            obj.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
            obj.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'All' || obj.type === typeFilter;
        const matchesStatus = statusFilter === 'All' || obj.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <div className="objects-container fade-in">
            <header className="page-header">
                <div>
                    <h1 style={{ marginBottom: '4px' }}>Objects List</h1>
                    <div className="breadcrumb">Home {'>'} Firewall Management {'>'} Objects</div>
                </div>
            </header>

            <div className="objects-header-actions">
                <button className="btn btn-primary">
                    Create New Object
                </button>
                <div className="search-input-wrapper">
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                    <input
                        type="text"
                        placeholder="Search objects by name, type, or value..."
                        className="settings-input"
                        style={{ paddingLeft: '40px' }}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="objects-filters">
                <div className="filter-group">
                    <span className="filter-label">Filter by Type</span>
                    {['All', 'IP Address', 'Subnet', 'Port', 'Group'].map(type => (
                        <button
                            key={type}
                            className={`filter-btn ${typeFilter === type ? 'active' : ''}`}
                            onClick={() => setTypeFilter(type)}
                        >
                            {type === 'IP Address' ? 'IP' : type}
                        </button>
                    ))}
                </div>
                <div className="filter-group">
                    <span className="filter-label">Filter by Status</span>
                    {['All', 'Active', 'Inactive'].map(status => (
                        <button
                            key={status}
                            className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
                            onClick={() => setStatusFilter(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="objects-table-wrapper">
                <table className="objects-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Description</th>
                            <th>Created On</th>
                            <th>Last Modified</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredObjects.length > 0 ? (
                            filteredObjects.map(obj => (
                                <tr key={obj.id}>
                                    <td style={{ fontWeight: 500 }}>{obj.name}</td>
                                    <td>{obj.type}</td>
                                    <td style={{ fontFamily: 'monospace' }}>{obj.value}</td>
                                    <td>{obj.description}</td>
                                    <td>{obj.createdOn}</td>
                                    <td>{obj.lastModified}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="action-btn" title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="action-btn delete" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                                    No objects found matching current filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="pagination">
                    <span>Showing 1-10 of {mockObjects.length} items</span>
                    <button className="pagination-btn" disabled><ChevronLeft size={16} /></button>
                    <button className="pagination-btn active">1</button>
                    <button className="pagination-btn"><ChevronRight size={16} /></button>
                </div>
            </div>
        </div>
    );
};

export default Objects;
