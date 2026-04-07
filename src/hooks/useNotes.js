import { useState, useEffect } from 'react';
import api from '../services/api';

function useNotes() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes/');
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (title, content) => {
    try {
      await api.post('/notes/', { title, content });
      fetchNotes();
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}/`);
      fetchNotes();
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  const editNote = async (id, title, content) => {
    try {
      const note = notes.find((n) => n.id === id);
      await api.put(`/notes/${id}/`, { title, content, pinned: note.pinned });
      fetchNotes();
    } catch (err) {
      console.error('Failed to edit note:', err);
    }
  };

  const pinNote = async (id) => {
    try {
      await api.post(`/notes/${id}/pin/`);
      fetchNotes();
    } catch (err) {
      console.error('Failed to pin note:', err);
    }
  };

  return { notes, addNote, deleteNote, editNote, pinNote };
}

export default useNotes;
