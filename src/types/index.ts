export type UserRole = 'ADMIN' | 'OPERATOR' | 'VIEWER';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  token?: string;
}

export interface FirewallRule {
  id: string;
  table: 'filter' | 'nat' | 'mangle';
  chain: 'INPUT' | 'OUTPUT' | 'FORWARD' | 'PREROUTING' | 'POSTROUTING';
  source: string;
  destination: string;
  protocol: string;
  port?: string;
  action: 'ACCEPT' | 'DROP' | 'REJECT' | 'SNAT' | 'DNAT' | 'MASQUERADE';
  state?: string;
  description: string;
  hits_packets: number;
  hits_bytes: string;
  is_active: boolean;
  version_id: string;
}

export interface RuleVersion {
  id: string;
  created_at: string;
  created_by: string;
  description: string;
  is_active: boolean;
  hash: string;
}

export interface SystemStatus {
  service: string;
  status: 'running' | 'stopped' | 'error';
  uptime?: string;
  cpu_usage?: number;
  mem_usage?: number;
}
