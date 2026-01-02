import React, { useState, useEffect } from 'react';
import './App.css';
import './components/Sidebar.css';
import Sidebar from './components/Sidebar';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import Login from './components/Login';
import Register from './components/Register';
import { getAllNotes, createNote, updateNote, deleteNote, setAuthToken } from './services/noteService';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      setIsLoggedIn(true);
      fetchNotes();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllNotes();
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes. Please make sure the backend is running.');
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchNotes();
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setIsLoggedIn(false);
    setNotes([]);
    setEditingNote(null);
  };

  const handleCreateNote = async (noteData) => {
    try {
      setError(null);
      const newNote = await createNote(noteData);
      setNotes([newNote, ...notes]);
      return true;
    } catch (err) {
      setError('Failed to create note.');
      console.error('Error creating note:', err);
      return false;
    }
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      setError(null);
      await updateNote(id, noteData);
      const updatedNotes = notes.map((note) =>
        note._id === id
          ? { ...note, ...noteData }
          : note
      );
      setNotes(updatedNotes);
      setEditingNote(null);
      return true;
    } catch (err) {
      setError('Failed to update note.');
      console.error('Error updating note:', err);
      return false;
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    try {
      setError(null);
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      setError('Failed to delete note.');
      console.error('Error deleting note:', err);
    }
  };

  const handleEditClick = (note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <div className="container">
          <header className="app-header">
            <h1>My Notes</h1>
            <p>Keep your thoughts organized</p>
          </header>
          <div className="auth-toggle">
            <button onClick={() => setShowRegister(false)} className={!showRegister ? 'active' : ''}>Login</button>
            <button onClick={() => setShowRegister(true)} className={showRegister ? 'active' : ''}>Register</button>
          </div>
          {showRegister ? <Register onRegister={handleRegister} /> : <Login onLogin={handleLogin} />}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Sidebar onLogout={handleLogout} />
      <div className="main-content">
        <div className="container">
          <header className="app-header">
            <h1>📝 My Notes</h1>
            <p>Keep your thoughts organized</p>
          </header>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <NoteForm
            editingNote={editingNote}
            onCreateNote={handleCreateNote}
            onUpdateNote={handleUpdateNote}
            onCancelEdit={handleCancelEdit}
          />

          {loading ? (
            <div className="loading">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first note above!</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

