# 🚀 Probe
![Probe Dashboard](/client/public/probe.svg) 

**Advanced B2B Teams Project Management SaaS Platform**

Probe is a comprehensive project management solution designed for modern teams. Streamline your workflow with intuitive task management, role-based permissions, and collaborative workspaces - all in one powerful platform.

![Probe Dashboard](/probe.png)

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Key Features](#-key-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛠️ Tech Stack

### **Frontend**
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0.5-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.16-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

- **React 18.3.1** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS 4.1.16** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Query (TanStack)** - Server state management
- **React Router Dom 7.1.1** - Client-side routing
- **React Hook Form** - Performant form handling
- **Zustand** - Lightweight state management
- **Zod** - Schema validation
- **Lucide React** - Beautiful icon library

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=flat&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat&logo=typescript&logoColor=white)

- **Node.js & Express 4.21.2** - Server runtime and web framework
- **TypeScript 5.7.2** - Type-safe backend development
- **MongoDB & Mongoose 8.9.2** - NoSQL database with ODM
- **Passport.js** - Authentication middleware
- **Google OAuth 2.0** - Social authentication
- **Bcrypt** - Password hashing
- **Zod** - Runtime type validation
- **UUID** - Unique identifier generation

### **Other Tools**
![ESLint](https://img.shields.io/badge/ESLint-Latest-4B32C3?style=flat&logo=eslint&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-8.4.49-DD3A0A?style=flat&logo=postcss&logoColor=white)

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **ts-node-dev** - TypeScript development server
- **CORS** - Cross-origin resource sharing

---

## ✨ Key Features

### 🏢 **Multi-Workspace Management**
- Create and manage multiple workspaces for different teams or projects
- Role-based access control (Owner, Admin, Member)
- Invite team members via unique workspace codes

### 📊 **Advanced Project Organization**
- Create projects within workspaces with custom emojis
- Project-specific task management and analytics
- Hierarchical organization for complex workflows

### ✅ **Comprehensive Task Management**
- Create, edit, and delete tasks with detailed descriptions
- Task status tracking (Backlog, Todo, In Progress, In Review, Done)
- Priority levels (Low, Medium, High)
- Due date management and overdue tracking
- Assign tasks to team members

### 🔐 **Robust Authentication & Security**
- Local authentication with secure password hashing
- Google OAuth 2.0 integration
- Session-based authentication with configurable expiration
- Protected routes with role-based permissions

### 👥 **Team Collaboration**
- Member role management with granular permissions
- Real-time workspace analytics
- Team member profiles and activity tracking

### 📈 **Analytics & Insights**
- Workspace-level analytics dashboard
- Task completion tracking
- Overdue task monitoring
- Project progress visualization

### 🎨 **Modern User Experience**
- Responsive design for all devices
- Dark/light theme support (via Radix UI)
- Accessible components following WCAG guidelines
- Smooth animations and transitions

---

## 🚀 Getting Started

### **Prerequisites**

Before running this application, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd probe-advanced-b2b-teams-project-management-saas
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### **Configuration**

#### **Backend Environment Setup**

1. Create `.env` file in the `backend` directory:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Configure your environment variables in `backend/.env`:
   ```env
   PORT=8000
   NODE_ENV=development

   # MongoDB Configuration
   MONGO_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/probe_db"

   # Session Configuration
   SESSION_SECRET="your_super_secret_session_key_here"
   SESSION_EXPIRES_IN="1d"

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

   # Frontend Configuration
   FRONTEND_ORIGIN=http://localhost:3000
   FRONTEND_GOOGLE_CALLBACK_URL=http://localhost:3000/google/callback
   ```

#### **Frontend Environment Setup**

1. Create `.env` file in the `client` directory:
   ```bash
   cd client
   cp .env.example .env
   ```

2. Configure your environment variables in `client/.env`:
   ```env
   VITE_API_BASE_URL="http://localhost:8000/api"
   ```

### **Database Setup**

1. **Initialize the database with roles (optional):**
   ```bash
   cd backend
   npm run pre-seed
   ```

2. **Seed sample data(required):**
   ```bash
   npm run seed
   ```

### **Running the Application**

#### **Development Mode**

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:8000`

2. **Start the Frontend Development Server:**
   ```bash
   cd client
   npm run dev
   ```
   Client will run on `http://localhost:5173`

#### **Production Mode**

1. **Build and Start Backend:**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build Frontend:**
   ```bash
   cd client
   npm run build
   npm run preview
   ```

---

## 📁 Project Structure

```
probe-advanced-b2b-teams-project-management-saas/
├── backend/
│   ├── src/
│   │   ├── config/           # App configuration
│   │   ├── controllers/      # Route controllers
│   │   ├── enums/           # TypeScript enums
│   │   ├── middlewares/     # Express middlewares
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── validation/      # Zod schemas
│   │   └── seeders/         # Database seeders
│   ├── package.json
│   └── tsconfig.json
├── client/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utility libraries
│   │   ├── pages/           # Page components
│   │   ├── types/           # TypeScript types
│   │   └── context/         # React contexts
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## 🔗 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `POST /api/auth/logout` - User logout

### **Workspaces**
- `POST /api/workspace/create/new` - Create workspace
- `GET /api/workspace/all` - Get user workspaces
- `GET /api/workspace/:id` - Get workspace details
- `PUT /api/workspace/update/:id` - Update workspace
- `DELETE /api/workspace/delete/:id` - Delete workspace
- `GET /api/workspace/members/:id` - Get workspace members
- `GET /api/workspace/analytics/:id` - Get workspace analytics

### **Projects**
- `POST /api/project/workspace/:workspaceId/create` - Create project
- `GET /api/project/workspace/:workspaceId/all` - Get workspace projects
- `GET /api/project/:projectId/workspace/:workspaceId` - Get project details
- `PUT /api/project/:projectId/workspace/:workspaceId/update` - Update project
- `DELETE /api/project/:projectId/workspace/:workspaceId/delete` - Delete project

### **Tasks**
- `POST /api/task/project/:projectId/workspace/:workspaceId/create` - Create task
- `GET /api/task/workspace/:workspaceId/all` - Get workspace tasks
- `GET /api/task/:id/project/:projectId/workspace/:workspaceId` - Get task details
- `PUT /api/task/:id/project/:projectId/workspace/:workspaceId/update` - Update task
- `DELETE /api/task/:id/workspace/:workspaceId/delete` - Delete task

### **Members**
- `POST /api/member/join` - Join workspace via invite
- `PUT /api/workspace/change/member/role/:id` - Change member role

---


### **Development Guidelines**

- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style


---

## 👨‍💻 Author

**Micheal Essuman**

For questions, suggestions, or support, please reach out to michealessuman08@gmail.com.

---

<div align="center">
  <p>Built with ❤️ using modern web technologies</p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>
