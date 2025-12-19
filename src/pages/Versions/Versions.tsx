import React, { useState, useEffect } from 'react';
import { History, RotateCcw, CheckCircle, Clock } from 'lucide-react';
import { api } from '../../utils/api';
import type { RuleVersion } from '../../types';
import './Versions.css';

const Versions: React.FC = () => {
    const [versions, setVersions] = useState<RuleVersion[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVersions = async () => {
        setLoading(true);
        try {
            // Assuming getAuditLogs or a dedicated getVersions endpoint
            const data = await api.getAuditLogs();
            setVersions(data);
        } catch (error) {
            console.error('Failed to fetch versions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVersions();
    }, []);

    const handleRollback = async (versionId: string) => {
        if (!confirm('Tem certeza que deseja reverter para esta versão? Todas as regras atuais serão substituídas.')) return;

        try {
            await api.rollback(versionId);
            alert('Rollback executado com sucesso!');
            await fetchVersions();
        } catch (error) {
            alert('Erro ao executar rollback.');
        }
    };

    const handleDeploy = async () => {
        try {
            await api.deploy();
            alert('Deploy executado com sucesso!');
            await fetchVersions();
        } catch (error) {
            alert('Erro ao executar deploy.');
        }
    };

    return (
        <div className="versions-container fade-in">
            <header className="page-header">
                <div>
                    <h1>Deploy & History</h1>
                    <p className="subtitle">Gestão de versões e rollback de segurança</p>
                </div>
                <button className="btn btn-primary" onClick={handleDeploy}>
                    <Clock size={20} /> Deploy Current Changes
                </button>
            </header>

            <div className="versions-list card">
                <div className="list-header">
                    <h3>Histórico de Versões</h3>
                </div>

                {loading ? (
                    <div className="loading">Carregando histórico...</div>
                ) : (
                    <div className="version-items">
                        {versions.map((v) => (
                            <div key={v.id} className={`version-item ${v.is_active ? 'active' : ''}`}>
                                <div className="version-status">
                                    {v.is_active ? <CheckCircle className="status-icon active" size={24} /> : <History className="status-icon" size={24} />}
                                </div>
                                <div className="version-info">
                                    <div className="version-meta">
                                        <span className="version-id">Versão #{v.id.substring(0, 8)}</span>
                                        <span className="version-date">{new Date(v.created_at).toLocaleString()}</span>
                                    </div>
                                    <p className="version-desc">{v.description || 'Sem descrição'}</p>
                                    <div className="version-author">Por: {v.created_by}</div>
                                </div>
                                <div className="version-actions">
                                    {!v.is_active && (
                                        <button className="btn btn-secondary btn-sm" onClick={() => handleRollback(v.id)}>
                                            <RotateCcw size={16} /> Rollback
                                        </button>
                                    )}
                                    {v.is_active && <span className="active-badge">Currently Active</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Versions;
