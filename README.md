# KeepNotes

A full-stack Google Keep-style notes app built with React, Node.js/Express, and PostgreSQL.

## Features

- Create, edit, and delete notes
- Pin notes to the top
- Search and filter notes in real time
- Data persisted in PostgreSQL database

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite |
| Backend | Node.js, Express |
| Database | PostgreSQL |

## Project Structure

```
KeepNotes/
  src/
    App.jsx                  # Root component
    hooks/useNotes.js        # Custom hook — notes logic + API calls
    components/
      NoteCard.jsx           # Single note card (view/edit/pin/delete)
      NoteForm.jsx           # Add note form
      NoteSearch.jsx         # Search input
  server/
    index.js                 # Express API server
    db.js                    # PostgreSQL connection pool
    .env                     # Environment variables (not committed)
```

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Database Setup

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE keepnotes;
CREATE USER keepnotes_user WITH PASSWORD 'keepnotes123';
GRANT ALL PRIVILEGES ON DATABASE keepnotes TO keepnotes_user;
\q
```

```bash
sudo -u postgres psql -d keepnotes
```

```sql
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
GRANT ALL PRIVILEGES ON TABLE notes TO keepnotes_user;
GRANT USAGE, SELECT ON SEQUENCE notes_id_seq TO keepnotes_user;
\q
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```
DB_USER=keepnotes_user
DB_PASSWORD=keepnotes123
DB_HOST=localhost
DB_PORT=5432
DB_NAME=keepnotes
PORT=3001
```

Start the server:

```bash
node index.js
```

Server runs on `http://localhost:3001`

### Frontend Setup

```bash
# from root directory
npm install
npm run dev
```

App runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /notes | Get all notes |
| POST | /notes | Create a note |
| PUT | /notes/:id | Update a note |
| DELETE | /notes/:id | Delete a note |
