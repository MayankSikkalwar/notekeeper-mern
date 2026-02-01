import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import Notecard from "../components/Notecard";

function Home() {
  const { notes, loading } = useContext(NoteContext);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-700">No notes available.</p>
      </div>
    );
  }
  // 📌 Sort notes so pinned notes appear first
  const sortedNotes = [...notes].sort(
    (a, b) => b.isPinned - a.isPinned);

  // 🔍 Filter notes based on search
  const filteredNotes = sortedNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
        />
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-500">No matching notes found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNotes.map((note) => (
            <Notecard key={note._id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
