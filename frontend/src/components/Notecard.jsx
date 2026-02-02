import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/NoteContext'

function Notecard({ note }) {
  const { deleteNote, updateNote, pinNote } = useContext(NoteContext)

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content
  })

  // 🏷️ tags state for edit mode
  const [editTags, setEditTags] = useState(
    note.tags ? note.tags.join(" ") : ""
  )

  const handleUpdate = () => {
    updateNote(note._id, {
      ...editData,
      tags: editTags
        .split(" ")
        .map(tag => tag.trim())
        .filter(tag => tag !== "")
    })
    setIsEditing(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col">

      {isEditing ? (
        <>
          {/* EDIT MODE */}

          {/* Title */}
          <input
            type="text"
            className="border rounded-lg p-2 w-full mb-3
                       focus:ring-2 focus:ring-blue-500 outline-none
                       bg-white dark:bg-gray-700
                       text-gray-900 dark:text-white"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />

          {/* Content */}
          <textarea
            className="border rounded-lg p-2 w-full mb-3
                       focus:ring-2 focus:ring-blue-500 outline-none
                       bg-white dark:bg-gray-700
                       text-gray-900 dark:text-white"
            rows="3"
            value={editData.content}
            onChange={(e) =>
              setEditData({ ...editData, content: e.target.value })
            }
          />

          {/* 🏷️ Tags */}
          <input
            type="text"
            placeholder="Tags (e.g. dsa react project)"
            className="border rounded-lg p-2 w-full mb-3
                       bg-white dark:bg-gray-700
                       text-gray-900 dark:text-white"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
          />

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* VIEW MODE */}

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {note.title}
          </h2>

          {/* Content */}
          <p className="text-gray-600 dark:text-gray-300 mt-2 flex-1">
            {note.content}
          </p>

          {/* 🏷️ Tags Display */}
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-600
                             text-blue-800 dark:text-white
                             px-2 py-0.5 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>
              {new Date(note.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            <div className="flex gap-2">
              {/* 📌 Pin */}
              <button
                onClick={() => pinNote(note._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition"
              >
                {note.isPinned ? "Unpin 📌" : "Pin 📌"}
              </button>

              {/* Edit */}
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
              >
                Edit
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Notecard