# KeepNotes — Frontend (React + Vite)

The frontend for [KeepNotes](https://github.com/AdityaMohite47/KeepNotes-BE), a Google Keep-style notes app. Built with React 19 and Vite, featuring JWT authentication and a clean, responsive UI.

> 🔗 **Backend Repository:** [KeepNotes-BE](https://github.com/AdityaMohite47/KeepNotes-BE)

## Features

- 🔐 Login & Registration with JWT authentication
- 📝 Create, edit, and delete notes
- 📌 Pin/Unpin notes to the top
- 🔍 Real-time search and filter
- 🔄 Automatic token refresh (no silent logouts)
- 🛡️ Protected routes — unauthenticated users redirected to login
- 💾 Persistent login across page refreshes (localStorage)

## Tech Stack

| Component | Technology |
|-----------|-----------|
| UI Library | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router 7 |
| HTTP Client | Axios 1.14 |
| Styling | Vanilla CSS with Inter font |

## Project Structure

```
KeepNotes-FE/
├── index.html              # SPA entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies & scripts
└── src/
    ├── main.jsx            # React DOM mount point
    ├── App.jsx             # Root component — routing, layout, NotesPage
    ├── index.css           # Global styles
    ├── services/
    │   └── api.js          # Axios instance + request/response interceptors
    ├── context/
    │   └── AuthContext.jsx  # Auth state (user, login, register, logout)
    ├── hooks/
    │   └── useNotes.js     # Custom hook — notes CRUD operations
    ├── components/
    │   ├── NoteCard.jsx    # Note display with edit/delete/pin actions
    │   ├── NoteForm.jsx    # Add new note form
    │   └── NoteSearch.jsx  # Search input filter
    └── pages/
        ├── LoginPage.jsx   # Login form
        └── RegisterPage.jsx # Registration form
```

## Getting Started

### Prerequisites

- Node.js 18+
- [KeepNotes-BE](https://github.com/AdityaMohite47/KeepNotes-BE) running on `http://localhost:8000`

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/KeepNotes-FE.git
cd KeepNotes-FE
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the dev server

```bash
npm run dev
```

App runs on `http://localhost:5173`

### 4. Open in browser

1. Navigate to `http://localhost:5173`
2. Register a new account
3. Sign in and start adding notes!

## Key Architecture Decisions

### Axios Interceptors (`services/api.js`)

- **Request interceptor** — Automatically attaches the JWT access token to every outgoing API request
- **Response interceptor** — On a 401 response, silently refreshes the token using the refresh token and retries the original request. If refresh fails, clears storage and redirects to login

### Auth Context (`context/AuthContext.jsx`)

- Uses React Context API to share auth state (`user`, `login`, `register`, `logout`) across all components without prop drilling
- Rehydrates user from localStorage on page refresh for persistent sessions

### Custom Hook (`hooks/useNotes.js`)

- Encapsulates all note CRUD logic and API calls in a single reusable hook
- Components just call `addNote()`, `deleteNote()`, etc. — the hook handles the API + state sync

### Protected Routes (`App.jsx`)

- `<ProtectedRoute>` wrapper checks `useAuth().user`
- If no user → redirects to `/login`
- If user exists → renders the child component

## Connecting to the Backend

This frontend expects the [KeepNotes-BE](https://github.com/AdityaMohite47/KeepNotes-BE) Django API to be running. The API base URL is configured in `src/services/api.js`:

```js
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});
```

Make sure the backend's `CORS_ALLOWED_ORIGINS` includes `http://localhost:5173`.

## Available Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
