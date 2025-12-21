import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Shield,
    Box,
    Users,
    Settings,
    LogOut,
    Bell,
    Search,
    History,
    Activity,
    FileBarChart,
    Network,
    RotateCcw
} from 'lucide-react';
import './Layout.css';

const Layout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="layout-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="sidebar-logo-container">
                        <img src="/logo.png" alt="Logo" className="sidebar-logo-img" />
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <span className="nav-group-title">NAVIGATION</span>
                        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink to="/rules" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Shield size={20} />
                            <span>Rules</span>
                        </NavLink>
                        <NavLink to="/objects" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Box size={20} />
                            <span>Objects</span>
                        </NavLink>
                        <NavLink to="/groups" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Users size={20} />
                            <span>Groups</span>
                        </NavLink>
                        <NavLink to="/chains" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Network size={20} />
                            <span>Chains</span>
                        </NavLink>
                    </div>

                    <div className="nav-group">
                        <span className="nav-group-title">SYSTEM</span>
                        <NavLink to="/logs" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <History size={20} />
                            <span>Audit Logs</span>
                        </NavLink>
                        <NavLink to="/versions" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <RotateCcw size={20} />
                            <span>Versions & Rollback</span>
                        </NavLink>
                        <NavLink to="/reports" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <FileBarChart size={20} />
                            <span>Reports</span>
                        </NavLink>
                        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Settings size={20} />
                            <span>Settings</span>
                        </NavLink>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="user-avatar">
                            {/* Get initials from full name or username */}
                            {(localStorage.getItem('full_name') || localStorage.getItem('username') || 'AD')
                                .split(' ')
                                .map(n => n[0])
                                .join('')
                                .substring(0, 2)
                                .toUpperCase()}
                        </div>
                        <div className="user-info">
                            <span className="user-name">{localStorage.getItem('full_name') || 'Admin User'}</span>
                            <span className="user-role">{localStorage.getItem('role_description') || 'System Administrator'}</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="top-header">
                    <div className="header-search">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search rules, logs or objects..." />
                    </div>
                    <div className="header-actions">
                        <button className="header-btn">
                            <Activity size={20} />
                        </button>
                        <button className="header-btn">
                            <Bell size={20} />
                            <span className="notification-dot"></span>
                        </button>
                        <div className="header-divider"></div>
                        <div className="system-health">
                            <div className="health-indicator success"></div>
                            <span>System Online</span>
                        </div>
                    </div>
                </header>

                <section className="content-area">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Layout;
