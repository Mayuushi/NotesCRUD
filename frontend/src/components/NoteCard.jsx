import React from 'react';
import './NoteCard.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title">{note.title || 'Untitled'}</h3>
        <div className="note-actions">
          <button
            className="btn-edit"
            onClick={() => onEdit(note)}
            aria-label="Edit note"
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => onDelete(note._id)}
            aria-label="Delete note"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="note-content">
        {note.content ? (
          <p>{note.content}</p>
        ) : (
          <p className="no-content">No content</p>
        )}
      </div>
      <div className="note-footer">
        <span className="note-date">{formatDate(note.createdAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;

