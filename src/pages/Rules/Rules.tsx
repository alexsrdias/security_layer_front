import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Trash2
} from 'lucide-react';
import { api } from '../../utils/api';
import type { FirewallRule } from '../../types';
import DeleteRuleModal from './DeleteRuleModal';
import RuleModal from './RuleModal';
import ViewRuleModal from './ViewRuleModal';
import './Rules.css';

const Rules: React.FC = () => {
    const [rules, setRules] = useState<FirewallRule[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter States
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTable, setFilterTable] = useState('All');
    const [filterChain, setFilterChain] = useState('All');
    const [filterAction, setFilterAction] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    // View Modal State
    const [ruleToView, setRuleToView] = useState<FirewallRule | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    // Delete Modal State
    const [ruleToDelete, setRuleToDelete] = useState<FirewallRule | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchRules = async () => {
        setLoading(true);
        try {
            const data = await api.getRules();
            console.log('Rules fetched:', data);
            setRules(data);
        } catch (error) {
            console.error('Failed to fetch rules:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    // Create / Edit State
    const [editingRule, setEditingRule] = useState<FirewallRule | null>(null);

    const handleSaveRule = async (ruleData: Partial<FirewallRule>) => {
        try {
            if (editingRule) {
                // Update existing rule
                await api.updateRule(editingRule.id, ruleData);
            } else {
                // Create new rule
                await api.createRule(ruleData);
            }
            await fetchRules();
            setEditingRule(null); // Reset editing state
        } catch (error) {
            console.error('Error saving rule:', error);
            throw error; // Let modal handle error
        }
    };

    const openCreateModal = () => {
        setEditingRule(null);
        setIsModalOpen(true);
    };

    const handleEditRule = (rule: FirewallRule) => {
        setEditingRule(rule);
        setIsViewModalOpen(false); // Close view modal if open
        setIsModalOpen(true); // Open edit/create modal
    };

    const openViewModal = (rule: FirewallRule) => {
        setRuleToView(rule);
        setIsViewModalOpen(true);
    };

    const openDeleteModal = (rule: FirewallRule) => {
        setRuleToDelete(rule);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!ruleToDelete) return;

        setIsDeleting(true);
        try {
            await api.deleteRule(ruleToDelete.id);
            await fetchRules(); // Refresh list
            setIsDeleteModalOpen(false);
            setRuleToDelete(null);
        } catch (error: any) {
            console.error('Error deleting rule:', error);
            alert(`Error deleting rule: ${error.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

    // Filter Logic
    const filteredRules = rules.filter(rule => {
        const matchesSearch =
            (rule.src_ip?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (rule.dst_ip?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (rule.log_prefix?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
            (rule.dst_port?.toString().includes(searchTerm)) ||
            (rule.protocol?.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesTable = filterTable === 'All' || rule.table_name === filterTable;
        const matchesChain = filterChain === 'All' || rule.chain === filterChain;
        const matchesAction = filterAction === 'All' || rule.action === filterAction;
        const matchesStatus = filterStatus === 'All' || rule.status === filterStatus;

        return matchesSearch && matchesTable && matchesChain && matchesAction && matchesStatus;
    });

    const clearFilters = () => {
        setSearchTerm('');
        setFilterTable('All');
        setFilterChain('All');
        setFilterAction('All');
        setFilterStatus('All');
    };

    return (
        <div className="rules-container fade-in">
            <header className="page-header">
                <div>
                    <div className="breadcrumb">Firewall Management System</div>
                    <h1>Firewall Rules</h1>
                    <p className="subtitle">Complete management of active firewall rules</p>
                </div>
                <button className="btn btn-primary" onClick={openCreateModal}>
                    <Plus size={20} /> New Rule
                </button>
            </header>

            <RuleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRule}
                initialData={editingRule}
            />

            <ViewRuleModal
                isOpen={isViewModalOpen}
                rule={ruleToView}
                onClose={() => setIsViewModalOpen(false)}
                onEdit={handleEditRule}
            />

            <DeleteRuleModal
                isOpen={isDeleteModalOpen}
                rule={ruleToDelete}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                loading={isDeleting}
            />

            <div className="filter-bar card">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search rules by IP, port, comment..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-actions">
                    <div className="select-wrapper">
                        <span>Type:</span>
                        <select value={filterTable} onChange={(e) => setFilterTable(e.target.value)} className="filter-select">
                            <option value="All">All</option>
                            <option value="FILTER">FILTER</option>
                            <option value="NAT">NAT</option>
                            <option value="MANGLE">MANGLE</option>
                        </select>
                    </div>
                    <div className="select-wrapper">
                        <span>Action:</span>
                        <select value={filterAction} onChange={(e) => setFilterAction(e.target.value)} className="filter-select">
                            <option value="All">All</option>
                            <option value="ACCEPT">ACCEPT</option>
                            <option value="DROP">DROP</option>
                            <option value="REJECT">REJECT</option>
                            <option value="SNAT">SNAT</option>
                            <option value="DNAT">DNAT</option>
                            <option value="MASQUERADE">MASQUERADE</option>
                        </select>
                    </div>
                    <div className="select-wrapper">
                        <span>Chain:</span>
                        <select value={filterChain} onChange={(e) => setFilterChain(e.target.value)} className="filter-select">
                            <option value="All">All</option>
                            <option value="INPUT">INPUT</option>
                            <option value="OUTPUT">OUTPUT</option>
                            <option value="FORWARD">FORWARD</option>
                            <option value="PREROUTING">PREROUTING</option>
                            <option value="POSTROUTING">POSTROUTING</option>
                        </select>
                    </div>
                    <div className="select-wrapper">
                        <span>State:</span>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
                            <option value="All">All</option>
                            <option value="APPLIED">Applied</option>
                            <option value="DRAFT">Draft</option>
                            <option value="PENDING">Pending</option>
                        </select>
                    </div>
                    <button className="icon-btn" onClick={clearFilters} title="Clear Filters">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="table-container card">
                {loading ? (
                    <div className="loading-state">Loading rules...</div>
                ) : (
                    <>
                        <table className="rules-table">
                            <thead>
                                <tr>
                                    <th>Priority</th>
                                    <th>Table</th>
                                    <th>Chain</th>
                                    <th>Source</th>
                                    <th>Destination</th>
                                    <th>Proto / Port</th>
                                    <th>Action</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRules.length > 0 ? (
                                    filteredRules.map((rule) => (
                                        <tr key={rule.id}>
                                            <td>
                                                <span className="priority-badge">{rule.priority}</span>
                                            </td>
                                            <td><span className="table-badge">{rule.table_name}</span></td>
                                            <td><span className="chain-badge">{rule.chain}</span></td>
                                            <td><code className="code-text">{rule.src_ip || 'any'}</code></td>
                                            <td><code className="code-text">{rule.dst_ip || 'any'}</code></td>
                                            <td>
                                                <code className="code-text">
                                                    {rule.protocol}
                                                    {rule.dst_port ? ` :${rule.dst_port}` : ''}
                                                </code>
                                            </td>
                                            <td>
                                                <span className={`action-badge ${rule.action.toLowerCase()}`}>
                                                    {rule.action}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${rule.status.toLowerCase()}`}>
                                                    {rule.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="row-actions">
                                                    <button
                                                        className="icon-btn sm"
                                                        onClick={() => openViewModal(rule)}
                                                        title="View Details"
                                                    >
                                                        <MoreHorizontal size={16} />
                                                    </button>
                                                    <button
                                                        className="icon-btn sm danger"
                                                        onClick={() => openDeleteModal(rule)}
                                                        title="Delete Rule"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                            No rules found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="table-footer">
                            <span>Showing {filteredRules.length} items</span>
                            <div className="pagination">
                                <button className="page-btn active">1</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Rules;
