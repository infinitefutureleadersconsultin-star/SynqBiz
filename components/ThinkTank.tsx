"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/firebase";
import { createIdea, getAllIdeas, updateIdea, addIdeaComment, getIdeaComments } from "@/lib/firestore";
import type { Idea, IdeaComment } from "@/types";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Lightbulb, ThumbsUp, ThumbsDown, MessageSquare, Plus, X, Send } from "lucide-react";

export default function ThinkTank() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);
  const [comments, setComments] = useState<IdeaComment[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<'issiah' | 'soya'>('issiah');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'feature' as Idea['category'],
    priority: 'medium' as Idea['priority'],
  });

  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    loadUserAndIdeas();
  }, []);

  useEffect(() => {
    if (selectedIdea) {
      loadComments(selectedIdea.id);
    }
  }, [selectedIdea]);

  async function loadUserAndIdeas() {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.uid);
        setUserName(user.user_metadata?.name || user.email || 'User');
        setUserRole((user.user_metadata?.role || 'issiah') as 'issiah' | 'soya');
      }

      const { data } = await getAllIdeas();
      if (data) {
        setIdeas(data);
      }
    } catch (error) {
      console.error('Error loading ideas:', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadComments(ideaId: string) {
    const { data } = await getIdeaComments(ideaId);
    if (data) {
      setComments(data);
    }
  }

  const handleCreateIdea = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const newIdea = {
      author_id: userId,
      author_name: userName,
      author_role: userRole,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      status: 'proposed' as const,
      votes: {
        issiah: null,
        soya: null,
      },
      comments: [],
    };

    const result = await createIdea(newIdea);

    if (result.success) {
      alert('Idea created! 💡');
      setShowCreateForm(false);
      setFormData({
        title: '',
        description: '',
        category: 'feature',
        priority: 'medium',
      });
      await loadUserAndIdeas();
    } else {
      alert(`Failed to create idea: ${result.error}`);
    }
  };

  const handleVote = async (idea: Idea, voteType: 'upvote' | 'downvote') => {
    const currentVote = idea.votes[userRole];
    const newVote = currentVote === voteType ? null : voteType;

    const updatedVotes = {
      ...idea.votes,
      [userRole]: newVote,
    };

    await updateIdea(idea.id, { votes: updatedVotes });
    await loadUserAndIdeas();
  };

  const handleStatusChange = async (idea: Idea, newStatus: Idea['status']) => {
    await updateIdea(idea.id, { status: newStatus });
    await loadUserAndIdeas();
    if (selectedIdea?.id === idea.id) {
      setSelectedIdea({ ...idea, status: newStatus });
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedIdea || !commentText.trim()) return;

    const newComment = {
      idea_id: selectedIdea.id,
      author_id: userId,
      author_name: userName,
      author_role: userRole,
      content: commentText,
    };

    const result = await addIdeaComment(newComment);

    if (result.success) {
      setCommentText('');
      await loadComments(selectedIdea.id);
    } else {
      alert(`Failed to add comment: ${result.error}`);
    }
  };

  const getCategoryColor = (category: Idea['category']) => {
    const colors = {
      feature: 'bg-blue-100 text-blue-700',
      improvement: 'bg-green-100 text-green-700',
      marketing: 'bg-purple-100 text-purple-700',
      operations: 'bg-amber-100 text-amber-700',
      other: 'bg-gray-100 text-gray-700',
    };
    return colors[category];
  };

  const getPriorityColor = (priority: Idea['priority']) => {
    const colors = {
      low: 'text-gray-600',
      medium: 'text-amber-600',
      high: 'text-red-600',
    };
    return colors[priority];
  };

  const getStatusColor = (status: Idea['status']) => {
    const colors = {
      proposed: 'bg-gray-100 text-gray-700',
      under_review: 'bg-blue-100 text-blue-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      implemented: 'bg-purple-100 text-purple-700',
    };
    return colors[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-primary-200">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-amber-600" />
              <div>
                <CardTitle>Think Tank</CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Share ideas and collaborate on what to build next
                </p>
              </div>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)}>
              {showCreateForm ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  New Idea
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        {showCreateForm && (
          <CardContent className="pt-4 bg-amber-50 border-t border-amber-200">
            <form onSubmit={handleCreateIdea} className="space-y-4">
              <Input
                label="Idea Title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Add calendar integration for meetings"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your idea in detail..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Idea['category'] }))}
                  >
                    <option value="feature">Feature</option>
                    <option value="improvement">Improvement</option>
                    <option value="marketing">Marketing</option>
                    <option value="operations">Operations</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Priority
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Idea['priority'] }))}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <Button type="submit" className="w-full">
                <Lightbulb className="w-4 h-4 mr-2" />
                Submit Idea
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Ideas List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center text-gray-600 py-8">Loading ideas...</p>
        ) : ideas.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-gray-600">No ideas yet. Be the first to share one!</p>
            </CardContent>
          </Card>
        ) : (
          ideas.map((idea) => {
            const upvotes = [idea.votes.issiah, idea.votes.soya].filter(v => v === 'upvote').length;
            const downvotes = [idea.votes.issiah, idea.votes.soya].filter(v => v === 'downvote').length;
            const userVote = idea.votes[userRole];

            return (
              <Card key={idea.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    {/* Voting */}
                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => handleVote(idea, 'upvote')}
                        className={`p-2 rounded-lg transition-colors ${
                          userVote === 'upvote'
                            ? 'bg-green-100 text-green-700'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ThumbsUp className="w-5 h-5" />
                      </button>
                      <span className="text-sm font-semibold text-gray-700">
                        {upvotes - downvotes}
                      </span>
                      <button
                        onClick={() => handleVote(idea, 'downvote')}
                        className={`p-2 rounded-lg transition-colors ${
                          userVote === 'downvote'
                            ? 'bg-red-100 text-red-700'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                      >
                        <ThumbsDown className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{idea.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            by {idea.author_name} ({idea.author_role === 'issiah' ? 'Business' : 'Technical'})
                            • {new Date(idea.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(idea.category)}`}>
                            {idea.category}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                            {idea.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{idea.description}</p>

                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${getPriorityColor(idea.priority)}`}>
                          Priority: {idea.priority.toUpperCase()}
                        </span>
                        <button
                          onClick={() => setSelectedIdea(idea)}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Comments ({comments.filter(c => c.idea_id === idea.id).length})
                        </button>

                        {/* Status Actions */}
                        {idea.status === 'proposed' && (
                          <div className="ml-auto flex gap-2">
                            <button
                              onClick={() => handleStatusChange(idea, 'under_review')}
                              className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                            >
                              Review
                            </button>
                            <button
                              onClick={() => handleStatusChange(idea, 'approved')}
                              className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                            >
                              Approve
                            </button>
                          </div>
                        )}
                        {idea.status === 'approved' && (
                          <button
                            onClick={() => handleStatusChange(idea, 'implemented')}
                            className="ml-auto text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                          >
                            Mark Implemented
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Comments Modal */}
      {selectedIdea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] flex flex-col">
            <CardHeader className="bg-primary-50">
              <div className="flex items-center justify-between">
                <CardTitle>{selectedIdea.title}</CardTitle>
                <button onClick={() => setSelectedIdea(null)}>
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-4 flex-1 overflow-y-auto">
              <div className="space-y-4 mb-4">
                {comments.length === 0 ? (
                  <p className="text-center text-gray-600 py-8">No comments yet. Be the first!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-900">{comment.author_name}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button type="submit">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
