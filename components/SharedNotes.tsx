"use client";

import { useState, useEffect } from "react";
import type { SharedNote, CoFounder } from "@/types";
import {
  createSharedNote,
  getAllSharedNotes,
  acknowledgeNote,
  deleteSharedNote,
} from "@/lib/firestore";
import { getCurrentUser } from "@/lib/firebase";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  FileText,
  CheckCircle,
  Eye,
  Trash2,
  Plus,
  Filter,
  Lightbulb,
  StickyNote,
  MessageSquare
} from "lucide-react";

interface SharedNotesProps {
  currentUser?: CoFounder; // 'issiah' or 'soya'
}

type FilterMode = "all" | "unread" | "acknowledged";

export default function SharedNotes({ currentUser }: SharedNotesProps) {
  const [notes, setNotes] = useState<SharedNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [userId, setUserId] = useState<string>("");
  const [userCoFounder, setUserCoFounder] = useState<CoFounder | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general" as "idea" | "note" | "thought" | "general",
  });

  useEffect(() => {
    loadUserAndNotes();
  }, [filterMode]);

  async function loadUserAndNotes() {
    setLoading(true);
    const user = await getCurrentUser();
    if (user) {
      setUserId(user.uid);
      // Determine co-founder based on currentUser prop or email
      const coFounder = currentUser || (user.email?.includes('issiah') ? 'issiah' : 'soya');
      setUserCoFounder(coFounder);
      await loadNotes(coFounder);
    }
    setLoading(false);
  }

  async function loadNotes(coFounder: CoFounder) {
    const filterBy = filterMode === "unread" ? { unread_by: coFounder } : undefined;
    const { data, error } = await getAllSharedNotes(filterBy);

    if (error) {
      console.error("Error loading notes:", error);
    } else if (data) {
      // Apply acknowledged filter if needed
      if (filterMode === "acknowledged") {
        const acknowledgedNotes = data.filter(
          (note) => note.acknowledgments[coFounder]?.acknowledged
        );
        setNotes(acknowledgedNotes);
      } else {
        setNotes(data);
      }
    }
  }

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !userCoFounder) {
      alert("Please log in first");
      return;
    }

    const { success, error } = await createSharedNote({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      created_by: userId,
      created_by_name: userCoFounder,
      tags: [],
    });

    if (success) {
      setFormData({ title: "", content: "", category: "general" });
      setShowCreateForm(false);
      await loadNotes(userCoFounder);
    } else {
      alert(`Failed to create note: ${error}`);
    }
  };

  const handleAcknowledge = async (noteId: string) => {
    if (!userCoFounder) return;

    const { success, error } = await acknowledgeNote(noteId, userCoFounder);

    if (success) {
      await loadNotes(userCoFounder);
    } else {
      alert(`Failed to acknowledge note: ${error}`);
    }
  };

  const handleDelete = async (noteId: string) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    const { success, error } = await deleteSharedNote(noteId);

    if (success) {
      if (userCoFounder) await loadNotes(userCoFounder);
    } else {
      alert(`Failed to delete note: ${error}`);
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "idea":
        return <Lightbulb className="w-4 h-4" />;
      case "thought":
        return <MessageSquare className="w-4 h-4" />;
      case "note":
        return <StickyNote className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "idea":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "thought":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "note":
        return "bg-blue-100 text-blue-700 border-blue-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const isAcknowledgedByUser = (note: SharedNote) => {
    if (!userCoFounder) return false;
    return note.acknowledgments[userCoFounder]?.acknowledged || false;
  };

  const getOtherCoFounder = (): CoFounder | null => {
    if (!userCoFounder) return null;
    return userCoFounder === "issiah" ? "soya" : "issiah";
  };

  const isAcknowledgedByOther = (note: SharedNote) => {
    const other = getOtherCoFounder();
    if (!other) return false;
    return note.acknowledgments[other]?.acknowledged || false;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6">
          <p className="text-gray-500 text-sm">Loading notes...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <CardTitle>Shared Notes & Ideas</CardTitle>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              <Plus className="w-4 h-4 mr-2" />
              {showCreateForm ? "Cancel" : "New Note"}
            </Button>
          </div>
        </CardHeader>

        {/* Create Note Form */}
        {showCreateForm && (
          <CardContent className="border-b bg-gray-50">
            <form onSubmit={handleCreateNote} className="space-y-4 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter note title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as "idea" | "note" | "thought" | "general",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="general">General</option>
                  <option value="idea">Idea</option>
                  <option value="note">Note</option>
                  <option value="thought">Thought</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your note here... (supports large amounts of text)"
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Tip: Upload ideas, thoughts, or notes before they become tasks
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="submit">Create Note</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* Filter Tabs */}
        <CardContent className="pt-4 pb-2 border-b">
          <div className="flex gap-2">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterMode === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Notes ({notes.length})
            </button>
            <button
              onClick={() => setFilterMode("unread")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterMode === "unread"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Eye className="w-4 h-4 inline-block mr-1" />
              Unread
            </button>
            <button
              onClick={() => setFilterMode("acknowledged")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterMode === "acknowledged"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <CheckCircle className="w-4 h-4 inline-block mr-1" />
              Acknowledged
            </button>
          </div>
        </CardContent>

        {/* Notes List */}
        <CardContent className="pt-4">
          {notes.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                {filterMode === "unread"
                  ? "No unread notes"
                  : filterMode === "acknowledged"
                  ? "No acknowledged notes yet"
                  : "No notes yet. Create one to get started!"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => {
                const acknowledgedByMe = isAcknowledgedByUser(note);
                const acknowledgedByOther = isAcknowledgedByOther(note);
                const createdByMe = note.created_by_name === userCoFounder;

                return (
                  <div
                    key={note.id}
                    className={`border rounded-lg p-4 ${
                      !acknowledgedByMe && !createdByMe
                        ? "bg-orange-50 border-orange-200"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span className={`px-2 py-1 rounded text-xs border ${getCategoryColor(note.category)}`}>
                          {getCategoryIcon(note.category)}
                          <span className="ml-1 capitalize">{note.category || "general"}</span>
                        </span>
                        <h3 className="font-semibold text-gray-900">{note.title}</h3>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!acknowledgedByMe && !createdByMe && (
                          <Button
                            size="sm"
                            onClick={() => handleAcknowledge(note.id)}
                            className="text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            I've Seen This
                          </Button>
                        )}

                        {createdByMe && (
                          <button
                            onClick={() => handleDelete(note.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete note"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-3">
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                      <div className="flex items-center gap-3">
                        <span>
                          By <span className="font-semibold capitalize">{note.created_by_name}</span>
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(note.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Acknowledgment Status */}
                      <div className="flex items-center gap-2">
                        {acknowledgedByMe && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            You acknowledged
                          </span>
                        )}
                        {acknowledgedByOther && (
                          <span className="flex items-center gap-1 text-blue-600">
                            <CheckCircle className="w-3 h-3" />
                            <span className="capitalize">{getOtherCoFounder()}</span> acknowledged
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
