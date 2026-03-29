import { useState, useEffect } from "react";

const API = 'http://localhost:3001';

function useNotes() {

  const [notes, setNotes] = useState([]);

  // Fetch all notes from the database
  const fetchNotes = async () => {
    const res = await fetch(`${API}/notes`);
    const data = await res.json();
    setNotes(data);
  };

  // Run once on mount — load notes from DB
  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (title, content) => {
    await fetch(`${API}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API}/notes/${id}`, {
      method: 'DELETE'
    });
    fetchNotes();
  };

  const editNote = async (id, title, content) => {
    const note = notes.find(n => n.id === id);
    await fetch(`${API}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, pinned: note.pinned })
    });
    fetchNotes();
  };

  const pinNote = async (id) => {
    const note = notes.find(n => n.id === id);
    await fetch(`${API}/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: note.title, content: note.content, pinned: !note.pinned })
    });
    fetchNotes();
  };

  return { notes, addNote, deleteNote, editNote, pinNote };
}

export default useNotes;
