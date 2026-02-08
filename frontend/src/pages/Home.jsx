import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import Notecard from "../components/Notecard";

function Home() {
  const { notes, loading } = useContext(NoteContext);
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedSearch = searchTerm.trim().toLowerCase();

  // 🔍 Filter notes based on search
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(normalizedSearch) ||
      note.content.toLowerCase().includes(normalizedSearch),
  );

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const otherNotes = filteredNotes.filter((note) => !note.isPinned);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="glass-panel rounded-2xl p-4">
          <div className="h-12 w-full animate-pulse rounded-xl bg-white/5" />
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 [column-gap:1.5rem]">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
              <div className="mt-3 h-20 w-full animate-pulse rounded bg-white/10" />
              <div className="mt-4 flex gap-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
                <div className="h-6 w-12 animate-pulse rounded-full bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="glass-panel flex min-h-[60vh] flex-col items-center justify-center rounded-3xl p-10 text-center">
        <p className="font-display text-2xl text-white">
          Your ideas deserve a home.
        </p>
        <p className="mt-3 max-w-md text-sm text-slate-400">
          Start by creating your first note. Pin the important ones, tag them,
          and keep everything searchable.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="glass-panel rounded-2xl p-4">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="glass-panel rounded-3xl p-10 text-center">
          <p className="font-display text-xl text-white">No matching notes</p>
          <p className="mt-2 text-sm text-slate-400">
            Try a different keyword or clear the search to see everything.
          </p>
        </div>
      ) : (
        <>
          {pinnedNotes.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Pinned
                  </p>
                  <h2 className="font-display text-xl text-white">
                    Priority Notes
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  {pinnedNotes.length} pinned
                </span>
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 [column-gap:1.5rem]">
                {pinnedNotes.map((note) => (
                  <div
                    key={note._id}
                    className="mb-6 break-inside-avoid animate-fade-in"
                  >
                    <Notecard note={note} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {otherNotes.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    All Notes
                  </p>
                  <h2 className="font-display text-xl text-white">
                    Everything Else
                  </h2>
                </div>
                <span className="text-xs text-slate-500">
                  {otherNotes.length} notes
                </span>
              </div>
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 [column-gap:1.5rem]">
                {otherNotes.map((note) => (
                  <div
                    key={note._id}
                    className="mb-6 break-inside-avoid animate-fade-in"
                  >
                    <Notecard note={note} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
