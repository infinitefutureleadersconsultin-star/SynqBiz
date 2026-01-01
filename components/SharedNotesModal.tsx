"use client";

import { useState, useEffect } from "react";
import { X, MessageSquare, Check } from "lucide-react";
import SharedNotes from "./SharedNotes";

interface SharedNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: 'issiah' | 'soya';
}

export default function SharedNotesModal({ isOpen, onClose, currentUser }: SharedNotesModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Shared Notes & Ideas</h2>
                <p className="text-sm text-gray-600">Collaborate and share insights</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-smooth">
            <SharedNotes currentUser={currentUser} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-smooth {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        .scrollbar-smooth::-webkit-scrollbar {
          width: 8px;
        }

        .scrollbar-smooth::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .scrollbar-smooth::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .scrollbar-smooth::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </>
  );
}
