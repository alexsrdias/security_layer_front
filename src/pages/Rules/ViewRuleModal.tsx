import React from 'react';
import { X, FileText, Calendar, Activity } from 'lucide-react';
import type { FirewallRule } from '../../types';
import './ViewRuleModal.css';

interface ViewRuleModalProps {
    isOpen: boolean;
    rule: FirewallRule | null;
    onClose: () => void;
    onEdit?: (rule: FirewallRule) => void;
}

const ViewRuleModal: React.FC<ViewRuleModalProps> = ({ isOpen, rule, onClose, onEdit }) => {
    if (!isOpen || !rule) return null;

    return (
        <div className="view-modal-overlay" onClick={onClose}>
            <div className="view-modal-card" onClick={e => e.stopPropagation()}>
                <header className="view-modal-header">
                    <h2>
                        <FileText size={20} />
                        Rule Details #{rule.id}
                    </h2>
                    <button className="close-icon-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </header>

                <div className="view-modal-body">
                    <div className="view-details-grid">
                        <div className="detail-item">
                            <label>Table</label>
                            <div className="detail-content">{rule.table_name}</div>
                        </div>
                        <div className="detail-item">
                            <label>Chain</label>
                            <div className="detail-content">{rule.chain}</div>
                        </div>

                        <div className="detail-item">
                            <label>Priority</label>
                            <div className="detail-content">{rule.priority}</div>
                        </div>
                        <div className="detail-item">
                            <label>Status</label>
                            <div className="detail-content">
                                <span className={`status-badge-lg ${rule.status.toLowerCase()}`}>
                                    {rule.status}
                                </span>
                            </div>
                        </div>

                        <div className="detail-item">
                            <label>Source IP</label>
                            <div className="detail-content">{rule.src_ip || 'Any (0.0.0.0/0)'}</div>
                        </div>
                        <div className="detail-item">
                            <label>Destination IP</label>
                            <div className="detail-content">{rule.dst_ip || 'Any (0.0.0.0/0)'}</div>
                        </div>

                        <div className="detail-item">
                            <label>Protocol</label>
                            <div className="detail-content">{rule.protocol}</div>
                        </div>
                        <div className="detail-item">
                            <label>Ports (Src / Dst)</label>
                            <div className="detail-content">
                                {rule.src_port || '*'} / {rule.dst_port || '*'}
                            </div>
                        </div>

                        <div className="detail-item full-width">
                            <label>Action</label>
                            <div className="detail-content" style={{
                                color: rule.action === 'DROP' ? '#ef4444' : '#10b981',
                                fontWeight: 'bold'
                            }}>
                                {rule.action}
                            </div>
                        </div>

                        <div className="detail-item full-width">
                            <label>Interfaces (In / Out)</label>
                            <div className="detail-content">
                                {rule.in_interface || '*'} / {rule.out_interface || '*'}
                            </div>
                        </div>

                        <div className="detail-item full-width">
                            <label>Log Prefix / Description</label>
                            <div className="detail-content" style={{ minHeight: '60px' }}>
                                {rule.log_prefix || 'No description provided.'}
                            </div>
                        </div>

                        <div className="detail-item">
                            <label><Calendar size={12} /> Created At</label>
                            <div className="detail-content" style={{ fontSize: '0.8rem' }}>
                                {rule.created_at ? new Date(rule.created_at).toLocaleString() : 'N/A'}
                            </div>
                        </div>
                        <div className="detail-item">
                            <label><Activity size={12} /> Last Updated</label>
                            <div className="detail-content" style={{ fontSize: '0.8rem' }}>
                                {rule.updated_at ? new Date(rule.updated_at).toLocaleString() : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="view-modal-footer" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    {onEdit && (
                        <button className="btn btn-primary" onClick={() => onEdit(rule)}>Edit Rule</button>
                    )}
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                </footer>
            </div>
        </div>
    );
};

export default ViewRuleModal;
