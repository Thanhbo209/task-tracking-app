# 🚀 Task Tracking — Fullstack App

A fullstack task-tracking application with a Next.js frontend and an Express + MongoDB backend. Features include task management, Pomodoro focus sessions, activity heatmap, and authentication (email/password + Google OAuth).

---

## ✨ Key Features

- ✅ Tasks
  - Create / Read / Update / Delete
  - Due dates, status, custom status
- ⏱️ Pomodoro (Focus)
  - Start / End sessions
  - Current session + history
- 📊 Dashboard & Activity
  - Focus time statistics
  - Activity heatmap (daily minutes)
- 🔐 Authentication
  - Email/password
  - Google OAuth (redirect to frontend)
- 🎨 Frontend UI
  - Next.js pages/components for Dashboard, Tasks, Focus, Deadline, Settings, Auth

---

## 🏗️ Architecture & Important Files

- Backend (Express + MongoDB)

  - Entry: `backend/server.js`
  - DB connect: `backend/config/connectDB.js`
  - Auth (Passport): `backend/config/passport.js`
  - Middleware: `backend/middleware/auth.middleware.js`
  - Routes: `backend/routes/` (tasks, pomodoros, activities, auth, dashboard, users)
  - Controllers: `backend/controllers/`
  - Models: `backend/models/` (Task.js, Pomodoro.js, ActivityDay.js, User.js)

- Frontend (Next.js app in `task-tracking/`)
  - App entry: `task-tracking/app/layout.js`, `task-tracking/app/page.js`
  - API helper: `task-tracking/lib/api.js`
  - Contexts: `task-tracking/context/ThemeContext.jsx`, `task-tracking/context/LanguageContext.jsx`
  - Pages: `task-tracking/app/dashboard/*`
  - Components: `task-tracking/components/`, `task-tracking/app/.../components/`
  - Utilities: `task-tracking/lib/formatDate.js`, `task-tracking/lib/i18n.js`

---

## 🔑 Environment Variables

- Backend (`backend/.env`)

  - MONGODB_URI — MongoDB connection string
  - JWT_SECRET — JSON Web Token secret
  - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL — Google OAuth

- Frontend (`task-tracking/.env`)
  - NEXT_PUBLIC_API_URL — e.g. `http://localhost:5000`

---

## 🛠️ Local Setup (Windows / PowerShell)

1. Clone repository

```powershell
git clone https://github.com/your-username/Task-Tracking-Fullstack-App.git
cd Task-Tracking-Fullstack-App
```

2. Backend

```powershell
cd backend
npm install

# create .env (example)
@"
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
"@ > .env

npm run start   # or npm run dev if available
```

3. Frontend

```powershell
cd ../task-tracking
npm install

# create .env
@"
NEXT_PUBLIC_API_URL=http://localhost:5000
"@ > .env

npm run dev
```

Run backend and frontend in separate terminals.

---

## 🔗 API Notes

- Authenticated endpoints require header:
  - Authorization: Bearer <token>
- Google OAuth redirects to `/oauth-success?token=...` on the frontend
- Check backend controllers for return formats (objects vs arrays)

---

## 📌 Suggestions / Next Steps

- Add README badges (build, license, npm)
- Add deployment guides (Vercel for frontend, Railway/Heroku for backend)
- Add DB seed scripts, Postman collection or OpenAPI spec
- Split READMEs: `backend/README.md` and `task-tracking/README.md`

---
