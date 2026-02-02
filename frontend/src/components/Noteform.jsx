import React, { useContext, useState } from "react";
import { NoteContext } from "../context/NoteContext";
import { useNavigate } from "react-router-dom";

function Noteform() {
  const { createNote } = useContext(NoteContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState(""); // 🏷️ NEW

  const handleSubmit = (e) => {
    e.preventDefault();

    createNote({
      title,
      content,
      tags: tags
        .split(" ")
        .map(tag => tag.trim())
        .filter(tag => tag !== "")
    });

    setTitle("");
    setContent("");
    setTags("");
    navigate("/");
  };

  return (
    <form className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg" onSubmit={handleSubmit}>
      <h2 className="text-xl text-white mb-4">Create Note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        required
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        rows="4"
        required
      />

      {/* 🏷️ TAG INPUT */}
      <input
        type="text"
        placeholder="Tags (e.g. dsa react project)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
      />

      <button className="bg-blue-600 w-full py-2 text-white rounded hover:bg-blue-700">
        Add Note
      </button>
    </form>
  );
}

export default Noteform;
