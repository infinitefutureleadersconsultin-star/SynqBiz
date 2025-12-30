"use client";

import { useState, useEffect } from "react";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle, Circle, Users, Trash2 } from "lucide-react";
import { getAllActionItems, getAllActionItemApprovals, toggleActionItemApproval, deleteActionItem } from "@/lib/firestore";
import { getCurrentUser } from "@/lib/firebase";
import type { ActionItem, ActionItemApproval, CoFounder } from "@/types";

interface ActionItemsProps {
  currentUser?: CoFounder;
}

export default function ActionItems({ currentUser }: ActionItemsProps) {
  const [items, setItems] = useState<ActionItem[]>([]);
  const [approvals, setApprovals] = useState<ActionItemApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCoFounder, setUserCoFounder] = useState<CoFounder | null>(null);

  useEffect(() => {
    loadUserAndData();
  }, []);

  async function loadUserAndData() {
    setLoading(true);
    const user = await getCurrentUser();
    if (user) {
      const coFounder = currentUser || (user.email?.includes('issiah') ? 'issiah' : 'soya');
      setUserCoFounder(coFounder);
    }
    await loadItems();
    await loadApprovals();
    setLoading(false);
  }

  async function loadItems() {
    const { data, error } = await getAllActionItems();
    if (error) {
      console.error("Error loading action items:", error);
    } else if (data) {
      setItems(data);
    }
  }

  async function loadApprovals() {
    const { data, error } = await getAllActionItemApprovals();
    if (error) {
      console.error("Error loading approvals:", error);
    } else if (data) {
      setApprovals(data);
    }
  }

  async function handleToggleApproval(area: string) {
    if (!userCoFounder) return;

    // Create a unique ID from the area (sanitized)
    const itemId = area.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const { success, data } = await toggleActionItemApproval(itemId, area, userCoFounder);
    if (success && data) {
      // Update local state
      setApprovals(prev => {
        const existing = prev.find(a => a.id === itemId);
        if (existing) {
          return prev.map(a => a.id === itemId ? data : a);
        } else {
          return [...prev, data];
        }
      });
    }
  }

  async function handleDelete(itemId: string) {
    if (!confirm("Are you sure you want to delete this action item?")) return;

    const { success } = await deleteActionItem(itemId);
    if (success) {
      setItems(prev => prev.filter(i => i.id !== itemId));
    }
  }

  function getApprovalStatus(area: string) {
    const itemId = area.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const approval = approvals.find(a => a.id === itemId);
    return {
      issiahApproved: approval?.approvals.issiah?.approved || false,
      soyaApproved: approval?.approvals.soya?.approved || false,
      completed: approval?.completed || false,
      currentUserApproved: approval?.approvals[userCoFounder as CoFounder]?.approved || false
    };
  }

  // Group items by priority
  const highPriority = items.filter(item => item.priority === 'high' && !getApprovalStatus(item.area).completed);
  const mediumPriority = items.filter(item => item.priority === 'medium' && !getApprovalStatus(item.area).completed);
  const lowPriority = items.filter(item => item.priority === 'low' && !getApprovalStatus(item.area).completed);
  const completedItems = items.filter(item => getApprovalStatus(item.area).completed);

  function renderActionItem(item: ActionItem, priorityColor: string, priorityLabel: string) {
    const status = getApprovalStatus(item.area);

    return (
      <div key={item.id} className={`bg-${priorityColor}-50 border border-${priorityColor}-200 rounded-lg p-4`}>
        <div className="flex justify-between items-start mb-2">
          <h4 className={`font-semibold text-${priorityColor}-900 flex-1`}>{item.area}</h4>
          <div className="flex items-center gap-2 ml-4">
            <span className={`px-2 py-1 bg-${priorityColor}-200 text-${priorityColor}-800 text-xs font-bold rounded`}>
              {priorityLabel}
            </span>
            <button
              onClick={() => handleDelete(item.id)}
              className="p-1 hover:bg-red-100 rounded transition-colors"
              title="Delete item"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-900 mb-2 whitespace-pre-line"><strong>Task:</strong> {item.task}</p>
        <p className="text-sm text-gray-700 whitespace-pre-line mb-2"><strong>Context:</strong> {item.context}</p>
        <p className="text-sm text-gray-700 whitespace-pre-line mb-3"><strong>Impact:</strong> {item.impact}</p>

        {/* Approval Section */}
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {status.issiahApproved ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm text-gray-600">Issiah</span>
              </div>
              <div className="flex items-center gap-2">
                {status.soyaApproved ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm text-gray-600">Soya</span>
              </div>
            </div>
            {userCoFounder && (
              <button
                onClick={() => handleToggleApproval(item.area)}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  status.currentUserApproved
                    ? 'bg-green-200 text-green-800 hover:bg-green-300'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status.currentUserApproved ? 'Approved' : 'Approve'}
              </button>
            )}
          </div>
          {status.completed && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Completed - Both co-founders approved
            </p>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="py-12 text-center">
          <p className="text-gray-600 mb-2">No action items yet</p>
          <p className="text-sm text-gray-500">
            Go to the Action Bot page to create strategic action items
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* High Priority */}
      {highPriority.length > 0 && (
        <Card className="border-2 border-red-600">
          <CardHeader className="bg-red-600">
            <CardTitle className="text-white">HIGH PRIORITY ({highPriority.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {highPriority.map(item => renderActionItem(item, 'red', 'HIGH'))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Medium Priority */}
      {mediumPriority.length > 0 && (
        <Card className="border-2 border-yellow-600">
          <CardHeader className="bg-yellow-600">
            <CardTitle className="text-white">MEDIUM PRIORITY ({mediumPriority.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {mediumPriority.map(item => renderActionItem(item, 'yellow', 'MEDIUM'))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Low Priority */}
      {lowPriority.length > 0 && (
        <Card className="border-2 border-green-600">
          <CardHeader className="bg-green-600">
            <CardTitle className="text-white">LOW PRIORITY ({lowPriority.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {lowPriority.map(item => renderActionItem(item, 'green', 'LOW'))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Items */}
      {completedItems.length > 0 && (
        <Card className="border-2 border-gray-400">
          <CardHeader className="bg-gray-400">
            <CardTitle className="text-white">COMPLETED ({completedItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {completedItems.map(item => renderActionItem(item, 'gray', 'COMPLETED'))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
