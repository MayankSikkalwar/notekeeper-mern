import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";

function Noteform() {
  const { createNote, isCreating } = useContext(NoteContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(""); // 🏷️ NEW

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isCreating) return;

    await createNote({
      title,
      content,
      tags: tags
        .split(" ")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    });

    setTitle("");
    setContent("");
    setTags("");
    navigate("/");
  };

  return (
    <form
      className="glass-card w-full max-w-2xl rounded-2xl p-8"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          New Idea
        </p>
        <h2 className="font-display text-2xl text-white">Create Note</h2>
        <p className="mt-2 text-sm text-slate-400">
          Capture thoughts, references, and quick reminders in one spot.
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field min-h-[160px] resize-none"
          rows="6"
          required
        />

        {/* 🏷️ TAG INPUT */}
        <input
          type="text"
          placeholder="Tags (e.g. dsa react project)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Tip: Use tags to organize related ideas fast.
        </p>
        <button
          disabled={isCreating}
          className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isCreating ? "Saving..." : "Add Note"}
        </button>
      </div>
    </form>
  );
}

export default Noteform;
