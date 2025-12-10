import React, { useState, useEffect } from 'react';
import './NoteForm.css';

const NoteForm = ({ editingNote, onCreateNote, onUpdateNote, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '');
      setContent(editingNote.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() && !content.trim()) {
      alert('Please enter a title or content for your note.');
      return;
    }

    setIsSubmitting(true);
    const noteData = { title: title.trim(), content: content.trim() };

    let success = false;
    if (editingNote) {
      success = await onUpdateNote(editingNote._id, noteData);
    } else {
      success = await onCreateNote(noteData);
    }

    setIsSubmitting(false);

    if (success) {
      setTitle('');
      setContent('');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    onCancelEdit();
  };

  return (
    <div className="note-form-container">
      <form className="note-form" onSubmit={handleSubmit}>
        <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
        
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="form-input"
            maxLength={200}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter note content..."
            className="form-textarea"
            rows={5}
          />
        </div>

        <div className="form-actions">
          {editingNote && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn-cancel"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Saving...'
              : editingNote
              ? 'Update Note'
              : 'Create Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;

