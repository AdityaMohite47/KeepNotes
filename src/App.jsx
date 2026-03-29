import NoteCard from "./components/NoteCard";
import NoteForm from "./components/NoteForm";
import NoteSearch from "./components/NoteSearch";
import useNotes from "./hooks/useNotes";
import { useState } from "react";

function App() {  
  const name = "KeepNotes"
  const { notes, deleteNote, addNote, editNote, pinNote} = useNotes()
  const [form , setForm] = useState({title: "", content: ""})
  const[searchQuery , setSearchQuery] = useState("")
  const sortedNotes = [...notes].sort((a, b) => b.pinned - a.pinned).filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase()))
    return (                                                                                                                                                                                
        <>
        <header className="app-header">
          <h1 className="app-title">{name}</h1>
        </header>

        <NoteSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <NoteForm addNote={addNote} form={form} setForm={setForm} />

        <div className="notes-grid">
          {sortedNotes.map(note => (
            <NoteCard key={note.id} 
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
  
    )
  }
                                                                                                                                                                                              
  export default App