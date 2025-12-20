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

- **Objects Management**:
  - Manage network objects (IPs, Subnets, Ports, Groups) for reuse in rules.
  - Search and filter capabilities.

- **System Settings**:
  - Configure Hostname, Date/Time (NTP), Network Interfaces, DNS, and Services.
  - Interactive UI for system states.

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

- **Node.js**: v18.0.0 or higher is required.
- **npm**: v9.0.0 or higher (or yarn/pnpm).
- **Backend**: The Security Layer Backend (FastAPI) must be running and accessible.

## ⚙️ Installation & Configuration

### 1. Clone the repository
```bash
git clone <repository-url>
cd security_layer_front
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configuration (Environment Variables)
Create a `.env` file in the root directory to configure the application. This step is crucial for connecting to the backend API.

**Example `.env` file:**
```env
# URL of the Backend API (FastAPI)
# Ensure this matches your running backend instance
VITE_API_URL=http://localhost:8000/v1
```

*If no `.env` file is present, the application defaults to `http://localhost:8000/v1`.*

### 4. API Validation
Before running the frontend, verify that the backend API is operational:

1.  Open your browser or tool (e.g., Postman/curl).
2.  Navigate to `http://localhost:8000/v1/system/status` (or your configured URL).
3.  You should receive a JSON response indicating the system status (e.g., `{"status": "running", ...}`).
4.  Ensure CORS is enabled on the backend to allow requests from `http://localhost:5173`.

## 🚀 Compilation and Execution

### Development Mode
To start the application in development mode with Hot Module Replacement (HMR):

```bash
npm run dev
```
- Access the app at: `http://localhost:5173`
- The app will automatically reload if you change any source files.

### Production Build
To build the application for production deployment:

1.  **Compile the code**:
    ```bash
    npm run build
    ```
    This validates types (`tsc`) and bundles the application using Vite into the `dist/` directory.

2.  **Preview the build** (optional, to test the production build locally):
    ```bash
    npm run preview
    ```

3.  **Deployment**:
    The contents of the `dist/` directory are static files (HTML, CSS, JS). You can deploy them to any static file server:
    - **Nginx**: Copy `dist/*` to `/var/www/html`.
    - **Apache**: Copy `dist/*` to the public web folder.
    - **Vercel/Netlify**: Point the deployment to the `dist` folder.

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components (Layout, ProtectedRoute, etc.)
├── pages/          # Application pages
│   ├── Dashboard/  # Dashboard views, charts, and audit logs
│   ├── Rules/      # Rules listing, filters, modals (Create/Edit/Delete)
│   ├── Objects/    # Network objects management
│   ├── Settings/   # System configuration
│   ├── Login/      # Authentication page
│   └── ...
├── utils/          # Utility functions and API client (fetch wrapper with JWT)
├── types/          # TypeScript interfaces (FirewallRule, AuditLog, etc.)
├── App.tsx         # Main application component and routing configuration
└── main.tsx        # Entry point mounting the React app
```

## 🤝 Contribution

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
© 2024 NetFilter Defense Inc. All rights reserved.
