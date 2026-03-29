function NoteForm({ addNote, form, setForm   }) {
   return (
    <>
        <form className="add-note-form" onSubmit={(e) => {
          e.preventDefault();
          addNote(form.title, form.content);
          setForm({title: "", content: ""});
        }}>
          <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
          <textarea placeholder="Take a note..." value={form.content} onChange={(e) => setForm({...form, content: e.target.value})}></textarea>
          <button type="submit">Add Note</button>
        </form>
    </>

   )

}

export default NoteForm;