# Security Layer Frontend - Firewall Management System

A modern, responsive web interface for managing Linux firewall rules (iptables) centrally. This frontend interacts with a Python/FastAPI backend to provide a seamless user experience for security administrators.

## 🚀 Features

- **Dashboard**: 
  - Real-time system health and status monitoring.
  - Visual representation of network traffic (Inbound/Outbound).
  - Recent audit logs showing user activities and rule changes.
  - Active vs. Configured rules statistics.

- **Firewall Rules Management**:
  - **CRUD Operations**: Create, Read, Update, and Delete firewall rules.
  - **Advanced Filtering**: Filter rules by Source/Destination IP, Protocol, Port, Table (Filter, NAT, Mangle), Chain, and Status.
  - **Edit Capabilities**: Modify existing rules directly from the details view.
  - **Validation**: Input validation for IPs and required fields.

- **Security & Access**:
  - Login page with JWT-based authentication.
  - Protected routes ensuring only authenticated users can access management features.

- **User Experience**:
  - Clean, modern UI inspired by top-tier security tools.
  - Responsive design for various screen sizes.
  - Meaningful visual feedback (success/error toasts, status badges).

## 🛠️ Tech Stack

- **Framework**: [React 18+](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management**: React Hooks (useState, useEffect, Context)
- **Styling**: Vanilla CSS with CSS Variables for theming (Dark/Light mode ready structures)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 📋 Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher) or yarn

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd security_layer_front
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory if you need to override the default API URL.
   
   ```env
   VITE_API_URL=http://localhost:8000/v1
   ```
   *Default is `http://localhost:8000/v1` if not specified.*

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`.

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
```

This will generate static assets in the `dist` folder, ready to be served by Nginx, Apache, or any static host.

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components (Layout, ProtectedRoute, etc.)
├── pages/          # Application pages
│   ├── Dashboard/  # Dashboard views and logic
│   ├── Rules/      # Rules listing, management modals, and filters
│   ├── Login/      # Authentication page
│   └── ...
├── utils/          # Utility functions and API client (axios/fetch wrapper)
├── types/          # TypeScript interfaces and type definitions
├── App.tsx         # Main application component and routing
└── main.tsx        # Entry point
```

## 🤝 Contribution

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
© 2024 NetFilter Defense Inc. All rights reserved.
