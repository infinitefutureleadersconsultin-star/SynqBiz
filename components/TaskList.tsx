"use client";

import { useState, useEffect } from "react";
import type { Task, CoFounder } from "@/types";
import { getCurrentWeekTasks, completeTask, deleteTask } from "@/lib/firestore";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckCircle, Trash2, Clock, AlertCircle } from "lucide-react";

interface TaskListProps {
  userId: string;
  owner?: CoFounder; // Filter by owner, or show all if undefined
  title?: string;
  onTaskCompleted?: () => void;
}

export default function TaskList({ userId, owner, title = "This Week's Tasks", onTaskCompleted }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingTask, setCompletingTask] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, [owner]);

  const loadTasks = async () => {
    setLoading(true);
    const { data, error } = await getCurrentWeekTasks(owner);

    if (error) {
      console.error("Error loading tasks:", error);
    } else if (data) {
      setTasks(data);
    }

    setLoading(false);
  };

  const handleCompleteTask = async (taskId: string) => {
    setCompletingTask(taskId);

    const { success, error } = await completeTask(taskId, userId);

    if (success) {
      // Reload tasks to reflect completion
      await loadTasks();
      if (onTaskCompleted) {
        onTaskCompleted();
      }
    } else {
      console.error("Error completing task:", error);
      alert(`Failed to complete task: ${error}`);
    }

    setCompletingTask(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) {
      return;
    }

    const { success, error } = await deleteTask(taskId);

    if (success) {
      await loadTasks();
    } else {
      console.error("Error deleting task:", error);
      alert(`Failed to delete task: ${error}`);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  // Group tasks by status
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">Loading tasks...</p>
        </CardContent>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">
            No tasks for this week. Use the AI assistant to create tasks!
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Try: "Add task: Contact 5 sponsors by Friday"
          </p>
        </CardContent>
      </Card>
    );
  }

  const TaskItem = ({ task }: { task: Task }) => (
    <div
      className={`border rounded-lg p-3 ${
        task.status === 'completed' ? 'bg-gray-50 opacity-75' : 'bg-white'
      } ${isOverdue(task.due_date) && task.status !== 'completed' ? 'border-red-300' : 'border-gray-200'}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Header Row */}
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon(task.status)}
            <h4 className={`font-medium text-sm ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h4>
          </div>

          {/* Details Row */}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>

            {task.category && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded border border-purple-300">
                {task.category}
              </span>
            )}

            <span className={`text-xs px-2 py-0.5 rounded ${
              isOverdue(task.due_date) && task.status !== 'completed'
                ? 'bg-red-50 text-red-600 font-semibold'
                : 'bg-gray-100 text-gray-600'
            }`}>
              Due: {new Date(task.due_date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
              {isOverdue(task.due_date) && task.status !== 'completed' && ' (Overdue)'}
            </span>
          </div>

          {/* Metrics Impact */}
          {task.metrics_impact && task.metrics_impact.metric_type && (
            <p className="text-xs text-purple-600 mb-2">
              ⚡ Completes: {task.metrics_impact.metric_type.replace(/_/g, ' ')} +{task.metrics_impact.metric_value}
            </p>
          )}

          {/* Completion Info */}
          {task.status === 'completed' && task.completed_at && (
            <p className="text-xs text-green-600 mt-1">
              ✓ Completed {new Date(task.completed_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {task.status !== 'completed' && (
            <Button
              size="sm"
              onClick={() => handleCompleteTask(task.id)}
              isLoading={completingTask === task.id}
              disabled={completingTask !== null}
              className="text-xs px-3 py-1"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Complete
            </Button>
          )}

          <button
            onClick={() => handleDeleteTask(task.id)}
            className="text-xs text-red-600 hover:text-red-800 flex items-center justify-center p-1"
            disabled={completingTask !== null}
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <span className="text-sm font-normal text-gray-600">
            {completedTasks.length} / {tasks.length} completed
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Pending Tasks */}
          {pendingTasks.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Pending ({pendingTasks.length})
              </h3>
              <div className="space-y-2">
                {pendingTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* In Progress Tasks */}
          {inProgressTasks.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                In Progress ({inProgressTasks.length})
              </h3>
              <div className="space-y-2">
                {inProgressTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Completed ({completedTasks.length})
              </h3>
              <div className="space-y-2">
                {completedTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
