import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/url";
import { useAuth } from "./AuthContext";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { currentUser } = useAuth(); // ✅ FIX 1
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingNoteIds, setPendingNoteIds] = useState(new Set());

  const addPendingNote = (id) => {
    setPendingNoteIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const removePendingNote = (id) => {
    setPendingNoteIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // ✅ FETCH NOTES FOR LOGGED-IN USER ONLY
  const getNotes = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const res = await BACKEND_URL.get("/get-notes", {
        params: { userId: currentUser.uid },
      });
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getNotes();
    } else {
      setNotes([]); // logout → clear notes
      setLoading(false);
    }
  }, [currentUser]);

  // ✅ CREATE NOTE WITH USER ID
  const createNote = async (note) => {
    if (!currentUser) return;
    setIsCreating(true);
    try {
      const res = await BACKEND_URL.post("/create-note", {
        ...note,
        userId: currentUser.uid,
      });
      setNotes((prev) => [res.data, ...prev]);
    } finally {
      setIsCreating(false);
    }
  };

  const updateNote = async (id, updatedNote) => {
    addPendingNote(id);
    try {
      const res = await BACKEND_URL.put(`/update-note/${id}`, updatedNote);
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
    } finally {
      removePendingNote(id);
    }
  };

  const deleteNote = async (id) => {
    if (!currentUser) return;
    addPendingNote(id);
    try {
      await BACKEND_URL.delete(`/delete-note/${id}`, {
        data: { userId: currentUser.uid },
      });
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } finally {
      removePendingNote(id);
    }
  };

  const pinNote = async (id) => {
    if (!currentUser) return;
    addPendingNote(id);
    try {
      const res = await BACKEND_URL.patch(`/pin-note/${id}`, {
        userId: currentUser.uid,
      });
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
    } finally {
      removePendingNote(id);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        isCreating,
        pendingNoteIds,
        createNote,
        updateNote,
        deleteNote,
        pinNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
