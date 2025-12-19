import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import type { FirewallRule } from '../../types';
import './DeleteRuleModal.css';

interface DeleteRuleModalProps {
    isOpen: boolean;
    rule: FirewallRule | null;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    loading: boolean;
}

const DeleteRuleModal: React.FC<DeleteRuleModalProps> = ({ isOpen, rule, onClose, onConfirm, loading }) => {
    if (!isOpen || !rule) return null;

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-card">
                <header className="delete-modal-header">
                    <div className="delete-icon-wrapper">
                        <AlertTriangle size={24} />
                    </div>
                    <h2>Delete Firewall Rule?</h2>
                </header>

                <div className="delete-modal-body">
                    <p>
                        Are you sure you want to delete this rule? This action will remove the rule from the database and cannot be undone.
                    </p>

                    <div className="rule-summary">
                        <div className="rule-detail-row">
                            <span className="detail-label">ID:</span>
                            <span className="detail-value">#{rule.id}</span>
                        </div>
                        <div className="rule-detail-row">
                            <span className="detail-label">Table / Chain:</span>
                            <span className="detail-value">{rule.table_name} / {rule.chain}</span>
                        </div>
                        <div className="rule-detail-row">
                            <span className="detail-label">Source IP:</span>
                            <span className="detail-value">{rule.src_ip || 'Any'}</span>
                        </div>
                        <div className="rule-detail-row">
                            <span className="detail-label">Destination IP:</span>
                            <span className="detail-value">{rule.dst_ip || 'Any'}</span>
                        </div>
                        <div className="rule-detail-row">
                            <span className="detail-label">Action:</span>
                            <span className="detail-value" style={{ color: rule.action === 'DROP' ? '#ef4444' : '#10b981' }}>
                                {rule.action}
                            </span>
                        </div>
                    </div>
                </div>

                <footer className="delete-modal-footer">
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn-danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <span>Deleting...</span>
                        ) : (
                            <>
                                <Trash2 size={16} /> Confirm Delete
                            </>
                        )}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default DeleteRuleModal;
