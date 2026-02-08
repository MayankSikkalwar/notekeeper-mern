import React, { useContext, useMemo, useState } from "react";
import { Pin } from "lucide-react";
import { NoteContext } from "../context/NoteContext";

function Notecard({ note }) {
  const { deleteNote, updateNote, pinNote, pendingNoteIds } =
    useContext(NoteContext);

  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
  });

  // 🏷️ tags state for edit mode
  const [editTags, setEditTags] = useState(
    note.tags ? note.tags.join(" ") : ""
  );

  const isPending = useMemo(
    () => pendingNoteIds?.has(note._id),
    [pendingNoteIds, note._id],
  );

  const shouldClamp = note.content.length > 240;

  const handleUpdate = () => {
    updateNote(note._id, {
      ...editData,
      tags: editTags
        .split(" ")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    });
    setIsEditing(false);
  };

  return (
    <div className="glass-card relative flex flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]">
      <div className="absolute right-4 top-4">
        <Pin
          className={`h-4 w-4 ${
            note.isPinned ? "text-amber-300" : "text-slate-600"
          }`}
        />
      </div>

      {isEditing ? (
        <>
          {/* EDIT MODE */}

          {/* Title */}
          <input
            type="text"
            className="input-field mb-3"
            value={editData.title}
            onChange={(e) =>
              setEditData({ ...editData, title: e.target.value })
            }
          />

          {/* Content */}
          <textarea
            className="input-field mb-3 min-h-[140px] resize-none"
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
            className="input-field mb-4"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
          />

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={isPending}
              className="action-btn bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={isPending}
              className="action-btn"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* VIEW MODE */}

          {/* Title */}
          <h2 className="font-display text-lg font-semibold text-slate-100">
            {note.title}
          </h2>

          {/* Content */}
          <p
            className={`mt-2 text-sm leading-relaxed text-slate-300 ${
              !isExpanded && shouldClamp ? "note-clamp" : ""
            }`}
          >
            {note.content}
          </p>
          {shouldClamp && (
            <button
              type="button"
              className="mt-2 text-xs font-semibold text-sky-300 hover:text-sky-200"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}

          {/* 🏷️ Tags Display */}
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="pill"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span className="uppercase tracking-wide">
              {new Date(note.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>

            <div className="flex flex-wrap gap-2">
              {/* 📌 Pin */}
              <button
                onClick={() => pinNote(note._id)}
                disabled={isPending}
                className="action-btn"
              >
                {note.isPinned ? "Unpin" : "Pin"}
              </button>

              {/* Edit */}
              <button
                onClick={() => setIsEditing(true)}
                disabled={isPending}
                className="action-btn"
              >
                Edit
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteNote(note._id)}
                disabled={isPending}
                className="action-btn text-rose-200 hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Notecard;
