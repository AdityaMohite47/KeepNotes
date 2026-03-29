import { useState } from "react";

function NoteCard({title, content, onDelete , onEdit , onPin, pinned}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({title, content});

    return (
        <div className="note-card">
            {isEditing ? (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onEdit(editForm.title, editForm.content);
                    setIsEditing(false);
                }}>
                    <input type="text" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} />
                    <textarea value={editForm.content} onChange={(e) => setEditForm({...editForm, content: e.target.value})}></textarea>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
             <>
             <h2>{pinned ? `${title} 📌` : title}</h2>
            <p>{content}</p>
            <div className="note-card-actions">
                {pinned ? <button className="note-card-button" onClick={onPin}>Unpin</button> : <button className="note-card-button" onClick={onPin}>Pin</button>}
                <button className="note-card-button" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="note-card-button" onClick={onDelete}>Delete</button>
            </div>
            </>   
            
            )}
        </div>
    );
}
export default NoteCard;