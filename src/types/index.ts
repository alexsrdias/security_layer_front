export type UserRole = 'ADMIN' | 'OPERATOR' | 'VIEWER';

export interface User {
  id: string;
  username: string;
  full_name?: string;
  role: string;
  role_description?: string;
  token?: string;
}

export interface FirewallRule {
  id: number;
  priority: number;
  table_name: string;
  chain: string;
  in_interface?: string;
  out_interface?: string;
  src_ip?: string;
  dst_ip?: string;
  protocol: string;
  src_port?: number;
  dst_port?: number;
  action: string;
  log_prefix?: string;
  enabled: boolean;
  status: 'DRAFT' | 'APPLIED' | 'PENDING';
  created_at?: string;
  updated_at?: string;
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

export interface AuditLog {
  id: number;
  action: string;
  username: string;
  details: string;
  timestamp: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
}
