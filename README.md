# Institution Management Portal

A full-stack web application for managing students, staff, courses, and departments in an educational institution. Built with a React frontend and a Flask REST API backend.

---

## Tech Stack

**Frontend**
- React 19
- React Router DOM v7
- Axios
- Vite

**Backend**
- Python / Flask
- Flask-JWT-Extended
- Flask-SQLAlchemy
- SQLite
- Werkzeug (password hashing)

---

## Project Structure

```
instituition-management/
├── backend/
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── course_routes.py
│   │   ├── department_routes.py
│   │   ├── staff_routes.py
│   │   └── student_routes.py
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── Sidebar.jsx
    │   │   └── Table.jsx
    │   ├── pages/
    │   │   ├── Courses.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Departments.jsx
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Staff.jsx
    │   │   └── Students.jsx
    │   ├── services/
    │   │   ├── api.jsx
    │   │   └── authApi.js
    │   ├── utils/
    │   │   └── auth.js
    │   └── App.jsx
    └── package.json
```

---

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm

---

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The API will run at `http://localhost:5000`.

On first run, the database is created automatically and the following departments are seeded:
Languages, Sciences, ICT, Business, Technical Studies, Humanities, Music, French.

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173`.

---

## User Roles & Access

| Role  | Access                                          |
|-------|-------------------------------------------------|
| staff | Dashboard, Courses, Students                    |
| admin | Dashboard, Courses, Students, Staff, Departments|

Role-based access is enforced on both the frontend (ProtectedRoute + Sidebar) and via JWT claims on the backend.

---

## API Endpoints

### Auth
| Method | Endpoint        | Description         | Auth Required |
|--------|-----------------|---------------------|---------------|
| POST   | /api/register   | Register a new user | No            |
| POST   | /api/login      | Login and get token | No            |

### Students
| Method | Endpoint            | Description        | Auth Required |
|--------|---------------------|--------------------|---------------|
| GET    | /api/students       | List all students  | No            |
| POST   | /api/students       | Add a student      | No            |
| PUT    | /api/students/\<id\>| Update a student   | No            |
| DELETE | /api/students/\<id\>| Delete a student   | No            |

### Courses
| Method | Endpoint           | Description        | Auth Required |
|--------|--------------------|---------------------|---------------|
| GET    | /api/courses       | List all courses    | No            |
| GET    | /api/courses/\<id\>| Get a single course | No            |
| POST   | /api/courses       | Add a course        | No            |
| PUT    | /api/courses/\<id\>| Update a course     | No            |
| DELETE | /api/courses/\<id\>| Delete a course     | No            |

### Staff
| Method | Endpoint         | Description     | Auth Required |
|--------|------------------|-----------------|---------------|
| GET    | /api/staff       | List all staff  | Yes (JWT)     |
| POST   | /api/staff       | Add staff       | Yes (JWT)     |
| PUT    | /api/staff/\<id\>| Update staff    | Yes (JWT)     |
| DELETE | /api/staff/\<id\>| Delete staff    | Yes (JWT)     |

### Departments
| Method | Endpoint               | Description          | Auth Required |
|--------|------------------------|----------------------|---------------|
| GET    | /api/departments       | List all departments | No            |
| POST   | /api/departments       | Add a department     | No            |
| PUT    | /api/departments/\<id\>| Update a department  | No            |
| DELETE | /api/departments/\<id\>| Delete a department  | No            |

---

## Authentication Flow

1. User registers or logs in via `/api/register` or `/api/login`
2. On success, a JWT token and user object are returned
3. The token and user are stored in `localStorage`
4. All protected API requests include the token in the `Authorization: Bearer <token>` header
5. The frontend `ProtectedRoute` component checks the token and role before rendering any protected page
6. Logout clears `localStorage` and redirects to the home page

---

## Available Scripts

**Frontend**

| Command         | Description                  |
|-----------------|------------------------------|
| `npm run dev`   | Start development server     |
| `npm run build` | Build for production         |
| `npm run lint`  | Run ESLint                   |
| `npm run preview` | Preview production build   |

**Backend**

| Command           | Description              |
|-------------------|--------------------------|
| `python app.py`   | Start Flask dev server   |
