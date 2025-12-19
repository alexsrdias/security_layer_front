import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Trash2,
    ShieldCheck,
    ChevronDown
} from 'lucide-react';
import { api } from '../../utils/api';
import type { FirewallRule } from '../../types';
import RuleModal from './RuleModal';
import './Rules.css';

const Rules: React.FC = () => {
    const [rules, setRules] = useState<FirewallRule[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchRules = async () => {
        setLoading(true);
        try {
            const data = await api.getRules();
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

    const handleCreateRule = async (newRule: Partial<FirewallRule>) => {
        try {
            await api.createRule(newRule);
            await fetchRules();
        } catch (error) {
            console.error('Error creating rule:', error);
            throw error;
        }
    };

    return (
        <div className="rules-container fade-in">
            <header className="page-header">
                <div>
                    <div className="breadcrumb">Sistema de Gestão iptables</div>
                    <h1>Firewall Rules</h1>
                    <p className="subtitle">Gestão completa das regras iptables ativas</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} /> New Rule
                </button>
            </header>

            <RuleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateRule}
            />

            <div className="filter-bar card">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search rules by IP, port, comment..." />
                </div>
                <div className="filter-actions">
                    <div className="select-wrapper">
                        <span>Type:</span>
                        <button className="select-btn">All <ChevronDown size={16} /></button>
                    </div>
                    <div className="select-wrapper">
                        <span>Action:</span>
                        <button className="select-btn">All <ChevronDown size={16} /></button>
                    </div>
                    <div className="select-wrapper">
                        <span>Chain:</span>
                        <button className="select-btn">All <ChevronDown size={16} /></button>
                    </div>
                    <div className="select-wrapper">
                        <span>State:</span>
                        <button className="select-btn">Active <ChevronDown size={16} /></button>
                    </div>
                    <button className="icon-btn"><Filter size={18} /></button>
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
                                    <th>Type</th>
                                    <th>Chain</th>
                                    <th>Source</th>
                                    <th>Destination</th>
                                    <th>Protocol/Port</th>
                                    <th>Action</th>
                                    <th>Comment</th>
                                    <th>Statistics</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rules.map((rule) => (
                                    <tr key={rule.id}>
                                        <td>
                                            <div className="type-pill">
                                                <ShieldCheck size={14} /> Firewall
                                            </div>
                                        </td>
                                        <td><span className="chain-badge">{rule.chain}</span></td>
                                        <td><code className="code-text">{rule.source}</code></td>
                                        <td><code className="code-text">{rule.destination}</code></td>
                                        <td><code className="code-text">{rule.protocol}</code></td>
                                        <td>
                                            <span className={`action-badge ${rule.action.toLowerCase()}`}>
                                                {rule.action}
                                            </span>
                                        </td>
                                        <td><span className="comment-text">{rule.description}</span></td>
                                        <td><span className="stats-text">{rule.hits_packets} pkts, {rule.hits_bytes}</span></td>
                                        <td>
                                            <div className="row-actions">
                                                <button className="icon-btn sm"><MoreHorizontal size={16} /></button>
                                                <button className="icon-btn sm danger"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="table-footer">
                            <span>Showing {rules.length} items</span>
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
