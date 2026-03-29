function NoteSearch({ searchQuery, setSearchQuery }) {
    return (
        <>
     <input type="text" placeholder="Search notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />

        </>
    )
}

export default NoteSearch;