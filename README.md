# 💧 AquaTrack — Frontend

AquaTrack is a modern and responsive **water intake tracking application** built with React.js. It helps users monitor their daily hydration, maintain personalized hydration goals, review their intake history, and manage their account.

The application also includes a dedicated **Admin Panel** for managing registered users, viewing user hydration history, updating daily hydration goals, and deleting user accounts.


---

## 🚀 Live Application

**Frontend:** Add your deployed frontend URL here

**Backend API:** Add your deployed backend URL here

---

## ✨ Features

### 👤 User Features

* User registration and login
* JWT-based authentication
* Protected application routes
* Personalized dashboard
* Daily hydration goal
* Visual hydration progress indicator
* Quick-add water intake

  * 250 ml
  * 500 ml
  * 750 ml
  * 1000 ml
* View today's water intake entries
* Delete individual intake records
* View historical daily water intake
* View total and average hydration data
* Update daily hydration goal
* View account information
* Delete personal account
* Responsive mobile navigation
* Toast notifications for user actions
* Loading and empty states

### 👑 Admin Features

* Dedicated admin dashboard
* Role-based route protection
* View registered users
* Search users by name or email
* View individual user details
* View user's hydration history
* Update user's daily hydration goal
* Delete user accounts
* Protection against admin self-deletion
* Responsive admin interface

### 🎨 UI/UX

* Modern hydration-focused design
* Fully responsive layout
* Tailwind CSS styling
* Interactive buttons and cards
* Animated hydration progress ring
* Hover effects and transitions
* Mobile-friendly navigation
* Loading indicators
* Empty states
* Error handling
* Toast notifications
* Confirmation prompts for destructive actions

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **React Router DOM**
* **Tailwind CSS**
* **Axios**
* **Lucide React**
* **React Hot Toast**
* **Vite**

### Backend Integration

* REST API
* JWT Authentication
* Role-Based Access Control
* MongoDB
* Node.js
* Express.js

---

## 📁 Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminNavbar.jsx
│   │   │   └── AdminSidebar.jsx
│   │   │
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   └── dashboard/
│   │       ├── ProgressRing.jsx
│   │       ├── QuickAdd.jsx
│   │       └── RecentIntake.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   └── UserLayout.jsx
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Users.jsx
│   │   │   └── UserDetails.jsx
│   │   │
│   │   └── user/
│   │       ├── Dashboard.jsx
│   │       ├── History.jsx
│   │       └── Profile.jsx
│   │
│   ├── routes/
│   │   ├── AdminRoute.jsx
│   │   ├── HomeRedirect.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AppRoutes.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── intakeService.js
│   │   └── userService.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🔐 Authentication

AquaTrack uses JWT-based authentication.

The authentication flow is:

```text
User
 │
 ▼
Login / Register
 │
 ▼
Backend Authentication API
 │
 ▼
JWT Token
 │
 ▼
Frontend AuthContext
 │
 ▼
Protected Routes
```

The frontend maintains authentication state using `AuthContext`.

Protected pages cannot be accessed without authentication.

---

## 🛡️ Role-Based Access Control

The application supports two primary roles:

```text
user
admin
```

### User

Users can access:

```text
/dashboard
/history
/profile
```

### Admin

Administrators can access:

```text
/admin
/admin/users
/admin/users/:id
```

The frontend uses `AdminRoute` to prevent normal users from accessing admin pages.

Backend authorization is also required, so frontend route protection is not treated as the only security layer.

---

## 📊 User Dashboard

The dashboard provides a quick overview of the user's hydration progress.

It displays:

* Today's total intake
* Daily hydration goal
* Remaining water
* Percentage of goal completed
* Goal completion status
* Number of intake entries

Example:

```text
Today's Goal

        60%

     1500 ml
    of 2500 ml

1000 ml remaining
```

The dashboard also provides quick-add buttons:

```text
┌─────────┐ ┌─────────┐
│ 250 ml  │ │ 500 ml  │
└─────────┘ └─────────┘

┌─────────┐ ┌─────────┐
│ 750 ml  │ │1000 ml  │
└─────────┘ └─────────┘
```

---

## 💧 Intake Management

Users can quickly log water intake from the dashboard.

When an intake is added:

```text
Quick Add
    ↓
POST /api/intake
    ↓
Database
    ↓
Refresh today's data
    ↓
Update dashboard
```

Users can also delete individual intake records.

---

## 📅 Hydration History

The History page displays daily aggregated hydration information.

Each record contains:

* Date
* Total intake
* Number of intake entries

Example:

```text
August 8, 2026

2000 ml
4 entries

████████████████
```

The page also displays:

* Number of tracked days
* Total water consumed
* Average daily intake

---

## ⚙️ Profile & Settings

Users can manage their hydration preferences from the Profile page.

### Daily Goal

Users can update their daily water goal.

Example:

```text
Daily hydration goal

[ 2500 ] ml

[ Save goal ]
```

Validation prevents invalid values.

The current implementation limits the goal to:

```text
1 ml — 10000 ml
```

### Account Deletion

Users can permanently delete their account.

The application asks for confirmation before performing the destructive action.

Deleting an account also removes the associated intake history through the backend.

---

## 👑 Admin Panel

The Admin Panel provides administrative user-management functionality.

### Admin Dashboard

The dashboard provides quick access to user management.

The Admin Stats/Analytics section is intentionally excluded from this implementation.

### User Management

Administrators can:

* View all registered users
* Search users
* View user details
* View hydration history
* Update daily hydration goals
* Delete user accounts

Example:

```text
Users

🔍 Search users...

Rohit Kumar
rohit@example.com
Daily goal: 2500 ml

[ View details ] [ Delete ]
```

---

## 👤 Admin User Details

The User Details page provides:

```text
User Information
       │
       ├── Name
       ├── Email
       └── Role
       
Daily Hydration Goal
       │
       └── Update goal

Water Intake History
       │
       ├── Date
       ├── Total intake
       └── Number of entries
```

---

## 🔒 Security Considerations

The frontend implements several security-related measures:

* Protected routes
* Admin-only routes
* JWT authentication
* Role-based access control
* User-specific application views
* Confirmation before destructive operations
* Backend authorization for sensitive operations

The frontend does not rely solely on client-side authorization. Backend APIs must independently validate authentication, roles, and ownership.

---

## 🌐 API Integration

Axios is used for communication with the backend.

The API layer is centralized through:

```text
src/services/api.js
```

Services are separated by responsibility:

```text
authService.js
    ↓
Authentication APIs

intakeService.js
    ↓
Water intake APIs

userService.js
    ↓
User and admin APIs
```

### Main API Operations

#### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

#### Intake

```text
POST   /api/intake
GET    /api/intake/today
GET    /api/intake/history
DELETE /api/intake/:id
```

#### User

```text
GET    /api/users/me
PUT    /api/users/me/goal
DELETE /api/users/me
```

#### Admin

```text
GET    /api/users
GET    /api/users/:id/intake
PUT    /api/users/:id/goal
DELETE /api/users/:id
```

---

## ⚙️ Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, replace the local backend URL with the deployed API URL.

> Do not commit `.env` files containing sensitive credentials or secrets.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-frontend-repository-url>
```

### 2. Navigate to the project

```bash
cd frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env
```

and add:

```env
VITE_API_URL=http://localhost:5000/api
```

Make sure the backend server is running.

### 5. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📱 Responsive Design

The application is designed to work across:

```text
Desktop
Tablet
Mobile
```

Tailwind CSS responsive utilities are used throughout the application.

The interface includes:

* Responsive navigation
* Mobile menu
* Responsive dashboard cards
* Responsive admin panel
* Mobile-friendly forms
* Adaptive grids
* Flexible history layouts

---

## 🧩 Reusable Components

The application uses reusable components to maintain consistency.

Examples:

```text
Button
Card
Input
LoadingSpinner
Navbar
ProgressRing
QuickAdd
RecentIntake
```

This reduces duplicated UI logic and makes the application easier to maintain.

---

## 🔄 Application Flow

### Normal User

```text
Register
   ↓
Login
   ↓
JWT Authentication
   ↓
Dashboard
   │
   ├── Add water
   ├── Delete intake
   │
   ├── History
   │
   └── Profile
        │
        ├── Update goal
        └── Delete account
```

### Administrator

```text
Admin Login
     ↓
Admin Dashboard
     ↓
User Management
     │
     ├── Search users
     │
     ├── View user
     │      ├── User details
     │      ├── Intake history
     │      └── Update goal
     │
     └── Delete user
```

---

## 🧪 Important Edge Cases

The application handles several common edge cases:

### Authentication

* Invalid credentials
* Unauthorized access
* Expired/invalid authentication
* Protected route access

### Intake

* Empty intake history
* Failed intake creation
* Failed deletion
* Loading states

### Hydration Goal

* Goal cannot be zero
* Goal cannot be negative
* Goal cannot exceed 10000 ml
* Backend validation remains authoritative

### User Management

* User not found
* Invalid user ID
* Unauthorized admin access
* Admin self-deletion protection
* Failed user deletion

### UI

* Empty states
* Loading states
* API errors
* Mobile navigation
* Search with no results

---

## 🎯 Design Philosophy

AquaTrack focuses on making hydration tracking simple and visually engaging.

The UI uses:

* Clean cards
* Soft backgrounds
* Hydration-themed visual elements
* Clear typography
* Consistent spacing
* Subtle animations
* Interactive hover states
* Accessible visual hierarchy

The goal is to make the application feel like a polished product rather than a basic CRUD interface.

---

## 📌 Current Scope

### Implemented

* [x] React.js frontend
* [x] Tailwind CSS
* [x] Authentication
* [x] JWT integration
* [x] Protected routes
* [x] Role-based access
* [x] User dashboard
* [x] Water intake logging
* [x] Intake deletion
* [x] Daily hydration goal
* [x] Hydration history
* [x] Profile settings
* [x] Account deletion
* [x] Admin dashboard
* [x] Admin user management
* [x] Admin user search
* [x] Admin user details
* [x] Admin intake history
* [x] Admin goal management
* [x] Admin user deletion
* [x] Responsive UI
* [x] Loading states
* [x] Empty states
* [x] Error handling
* [x] Toast notifications

### Intentionally Not Implemented

* [ ] Admin statistics/analytics
* [ ] Charts and analytics dashboard
* [ ] Advanced reporting

---

## 🤝 Backend Repository

The frontend communicates with the AquaTrack backend API.

Backend repository:

```text
<add-your-backend-github-repository-url>
```

---

## 👨‍💻 Author

**Rohit Kumar**

Computer Science Graduate
GLA University

---
