import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import NoteSearch from './components/NoteSearch';
import useNotes from './hooks/useNotes';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function NotesPage() {
  const { user, logout } = useAuth();
  const { notes, deleteNote, addNote, editNote, pinNote } = useNotes();
  const [form, setForm] = useState({ title: '', content: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const sortedNotes = [...notes]
    .sort((a, b) => b.pinned - a.pinned)
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <header className="app-header">
        <h1 className="app-title">KeepNotes</h1>
        <div className="header-user">
          <span className="header-username">👤 {user?.username}</span>
          <button className="logout-btn" onClick={logout}>
            Sign Out
          </button>
        </div>
      </header>

      <NoteSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NoteForm addNote={addNote} form={form} setForm={setForm} />

      <div className="notes-grid">
        {sortedNotes.length === 0 && (
          <p className="empty-state">No notes yet. Add your first note above! ✨</p>
        )}
        {sortedNotes.map((note) => (
          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            onDelete={() => deleteNote(note.id)}
            onEdit={(newTitle, newContent) => editNote(note.id, newTitle, newContent)}
            onPin={() => pinNote(note.id)}
            pinned={note.pinned}
          />
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;