import { createContext, useEffect, useState } from "react";
import BACKEND_URL from "../api/url";
import { useAuth } from "./AuthContext";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const { currentUser } = useAuth(); // ✅ FIX 1
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const res = await BACKEND_URL.post("/create-note", {
      ...note,
      userId: currentUser.uid,
    });
    setNotes((prev) => [res.data, ...prev]);
  };

  const updateNote = async (id, updatedNote) => {
    const res = await BACKEND_URL.put(`/update-note/${id}`, updatedNote);
    setNotes(notes.map((n) => (n._id === id ? res.data : n)));
  };

  const deleteNote = async (id) => {
    await BACKEND_URL.delete(`/delete-note/${id}`, {
      data: { userId: currentUser.uid },
    });
    setNotes(notes.filter((n) => n._id !== id));
  };

  const pinNote = async (id) => {
    const res = await BACKEND_URL.patch(`/pin-note/${id}`, {
      userId: currentUser.uid,
    });
    setNotes(notes.map((n) => (n._id === id ? res.data : n)));
  };

  return (
    <NoteContext.Provider
      value={{ notes, loading, createNote, updateNote, deleteNote, pinNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};
