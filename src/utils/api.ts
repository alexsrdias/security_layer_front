import type { FirewallRule, SystemStatus, User } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/v1';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    // console.log('DEBUG: Current Token:', token); 
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
};

export const api = {
    // 🔐 Autenticação
    login: async (username: string, password: string): Promise<User> => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('grant_type', '');
        params.append('scope', '');
        params.append('client_id', '');
        params.append('client_secret', '');

        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json',
            },
            body: params.toString(),
        });

        if (!response.ok) throw new Error('Authentication failed');
        const data = await response.json();
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
        }
        return data;
    },

    // 🛡️ Regras de Firewall
    getRules: async (): Promise<FirewallRule[]> => {
        const response = await fetch(`${BASE_URL}/rules/`, {
            headers: getHeaders(),
        });
        if (!response.ok) throw new Error('Could not load rules');
        return response.json();
    },

    createRule: async (rule: Partial<FirewallRule>) => {
        const response = await fetch(`${BASE_URL}/rules/`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(rule),
        });
        return response.json();
    },

    updateRule: async (ruleId: number, rule: Partial<FirewallRule>) => {
        const response = await fetch(`${BASE_URL}/rules/${ruleId}/`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(rule),
        });
        if (!response.ok) {
            throw new Error(`Failed to update rule (Status: ${response.status})`);
        }
        return response.json();
    },

    deleteRule: async (ruleId: number) => {
        const response = await fetch(`${BASE_URL}/rules/${ruleId}/`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Delete Rule Error:', response.status, errorText);
            throw new Error(`Failed to delete rule (Status: ${response.status}). ${errorText}`);
        }
        return true;
    },

    enableRule: async (ruleId: string) => {
        const response = await fetch(`${BASE_URL}/rules/${ruleId}/enable`, {
            method: 'POST',
            headers: getHeaders(),
        });
        return response.json();
    },

    // 🚢 Deploy e Configuração
    deploy: async () => {
        const response = await fetch(`${BASE_URL}/deploy/`, {
            method: 'POST',
            headers: getHeaders(),
        });
        return response.json();
    },

    rollback: async (versionId: string) => {
        const response = await fetch(`${BASE_URL}/deploy/rollback/${versionId}`, {
            method: 'POST',
            headers: getHeaders(),
        });
        return response.json();
    },

    // 📊 Sistema e Telemetria
    getSystemStatus: async (): Promise<SystemStatus> => {
        const response = await fetch(`${BASE_URL}/system/status`, {
            headers: getHeaders(),
        });
        return response.json();
    },

    // 📜 Auditoria
    getAuditLogs: async () => {
        const response = await fetch(`${BASE_URL}/audit/logs`, {
            headers: getHeaders(),
        });
        return response.json();
    }
};
