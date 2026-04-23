import { useState, useEffect } from "react";

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("hn_notes") || "{}");
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("hn_notes", JSON.stringify(notes));
  }, [notes]);

  function setNote(storyId, text) {
    setNotes((prev) => {
      if (!text.trim()) {
        const next = { ...prev };
        delete next[storyId];
        return next;
      }
      return { ...prev, [storyId]: { text, updatedAt: Date.now() } };
    });
  }

  function getNote(storyId) {
    return notes[storyId] || null;
  }

  function deleteNote(storyId) {
    setNotes((prev) => {
      const next = { ...prev };
      delete next[storyId];
      return next;
    });
  }

  function hasNote(storyId) {
    return !!notes[storyId]?.text?.trim();
  }

  const count = Object.keys(notes).length;

  return { notes, setNote, getNote, deleteNote, hasNote, count };
}
