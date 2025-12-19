import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { FirewallRule } from '../../types';
import './RuleModal.css';

interface RuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (rule: Partial<FirewallRule>) => Promise<void>;
}

const RuleModal: React.FC<RuleModalProps> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<Partial<FirewallRule>>({
        table: 'filter',
        chain: 'INPUT',
        action: 'ACCEPT',
        protocol: 'tcp',
        source: 'any',
        destination: 'any',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Failed to save rule:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-card fade-in">
                <header className="modal-header">
                    <h2>Create New Firewall Rule</h2>
                    <button onClick={onClose} className="close-btn"><X size={20} /></button>
                </header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Table</label>
                            <select
                                value={formData.table}
                                onChange={e => setFormData({ ...formData, table: e.target.value as any })}
                            >
                                <option value="filter">filter</option>
                                <option value="nat">nat</option>
                                <option value="mangle">mangle</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Chain</label>
                            <select
                                value={formData.chain}
                                onChange={e => setFormData({ ...formData, chain: e.target.value as any })}
                            >
                                <option value="INPUT">INPUT</option>
                                <option value="FORWARD">FORWARD</option>
                                <option value="OUTPUT">OUTPUT</option>
                                <option value="PREROUTING">PREROUTING</option>
                                <option value="POSTROUTING">POSTROUTING</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Protocol</label>
                            <select
                                value={formData.protocol}
                                onChange={e => setFormData({ ...formData, protocol: e.target.value })}
                            >
                                <option value="tcp">TCP</option>
                                <option value="udp">UDP</option>
                                <option value="icmp">ICMP</option>
                                <option value="all">ALL</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Action</label>
                            <select
                                value={formData.action}
                                onChange={e => setFormData({ ...formData, action: e.target.value as any })}
                            >
                                <option value="ACCEPT">ACCEPT</option>
                                <option value="DROP">DROP</option>
                                <option value="REJECT">REJECT</option>
                                <option value="SNAT">SNAT</option>
                                <option value="DNAT">DNAT</option>
                                <option value="MASQUERADE">MASQUERADE</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Source IP / Range</label>
                            <input
                                type="text"
                                placeholder="e.g. 192.168.1.0/24 or any"
                                value={formData.source}
                                onChange={e => setFormData({ ...formData, source: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Destination IP / Range</label>
                            <input
                                type="text"
                                placeholder="e.g. 10.0.0.1 or any"
                                value={formData.destination}
                                onChange={e => setFormData({ ...formData, destination: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Port (Optional)</label>
                            <input
                                type="text"
                                placeholder="e.g. 80, 443"
                                value={formData.port}
                                onChange={e => setFormData({ ...formData, port: e.target.value })}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Description / Comment</label>
                            <textarea
                                placeholder="Why is this rule being created?"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    <footer className="modal-footer">
                        <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Rule'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default RuleModal;
