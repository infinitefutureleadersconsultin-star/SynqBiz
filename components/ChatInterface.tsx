"use client";

import { useState, useRef, useEffect } from "react";
import { parseMessage, getSuggestions, hasValidMetrics } from "@/lib/chatParser";
import type { ParsedMetrics } from "@/lib/chatParser";
import { saveIssiahMetrics, saveSoyaMetrics, createCalendarEvent, createTask } from "@/lib/firestore";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Send, Sparkles, CheckCircle, AlertCircle, Calendar, CheckSquare } from "lucide-react";

interface ChatInterfaceProps {
  userId: string;
  onMetricsSaved?: () => void;
}

export default function ChatInterface({ userId, onMetricsSaved }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [parsedResult, setParsedResult] = useState<ParsedMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ message: string; timestamp: string; success: boolean }>>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Update suggestions as user types
  useEffect(() => {
    if (message.length > 3) {
      const newSuggestions = getSuggestions(message);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [message]);

  const handleParse = () => {
    if (!message.trim()) return;

    const result = parseMessage(message);
    setParsedResult(result);

    if (hasValidMetrics(result)) {
      setShowPreview(true);
    } else {
      alert("No metrics detected in your message. Try something like:\n- 'Contacted 10 event hosts today'\n- 'Shipped 2 features and fixed 5 bugs'");
    }
  };

  const handleSave = async () => {
    if (!parsedResult || !userId) return;

    setLoading(true);

    try {
      const promises = [];

      // Save Issiah's metrics if present
      if (Object.keys(parsedResult.issiahMetrics).length > 0) {
        promises.push(
          saveIssiahMetrics(userId, parsedResult.date || new Date().toISOString().split('T')[0], {
            ...parsedResult.issiahMetrics,
            notes: parsedResult.notes,
          })
        );
      }

      // Save Soya's metrics if present
      if (Object.keys(parsedResult.soyaMetrics).length > 0) {
        promises.push(
          saveSoyaMetrics(userId, parsedResult.date || new Date().toISOString().split('T')[0], {
            ...parsedResult.soyaMetrics,
            notes: parsedResult.notes,
          })
        );
      }

      // Save calendar events if present
      if (parsedResult.calendarEvents && parsedResult.calendarEvents.length > 0) {
        for (const event of parsedResult.calendarEvents) {
          promises.push(
            createCalendarEvent({
              title: event.title,
              description: event.description,
              event_type: event.event_type,
              start_time: event.start_time,
              end_time: event.end_time || event.start_time,
              all_day: event.all_day,
              attendees: event.attendees,
              location: event.location,
              meeting_link: event.meeting_link,
              reminder_minutes: event.reminder_minutes,
              status: 'scheduled',
              created_by: userId,
            })
          );
        }
      }

      // Save tasks if present
      if (parsedResult.tasks && parsedResult.tasks.length > 0) {
        for (const task of parsedResult.tasks) {
          promises.push(
            createTask({
              owner: task.owner,
              title: task.title,
              description: task.description,
              due_date: task.due_date,
              priority: task.priority,
              status: 'pending',
              category: task.category,
              metrics_impact: task.metrics_impact,
              created_by: userId,
            })
          );
        }
      }

      const results = await Promise.all(promises);
      const allSuccess = results.every(r => r.success);

      if (allSuccess) {
        setChatHistory(prev => [{
          message,
          timestamp: new Date().toLocaleTimeString(),
          success: true
        }, ...prev.slice(0, 4)]); // Keep last 5 entries

        setMessage("");
        setParsedResult(null);
        setShowPreview(false);
        setSuggestions([]);

        if (onMetricsSaved) {
          onMetricsSaved();
        }

        const hasMetrics = Object.keys(parsedResult.issiahMetrics).length > 0 || Object.keys(parsedResult.soyaMetrics).length > 0;
        const hasEvents = parsedResult.calendarEvents && parsedResult.calendarEvents.length > 0;
        const hasTasks = parsedResult.tasks && parsedResult.tasks.length > 0;

        const messages = [];
        if (hasMetrics) messages.push('✅ Metrics');
        if (hasEvents) messages.push(`📅 ${parsedResult.calendarEvents.length} event(s)`);
        if (hasTasks) messages.push(`✔️ ${parsedResult.tasks.length} task(s)`);

        alert(`${messages.join(', ')} saved successfully!`);
      } else {
        throw new Error("Failed to save some data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setChatHistory(prev => [{
        message,
        timestamp: new Date().toLocaleTimeString(),
        success: false
      }, ...prev.slice(0, 4)]);
      alert("Failed to save data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleParse();
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="bg-gradient-to-r from-primary-50 to-purple-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <CardTitle>AI Metrics Assistant</CardTitle>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Type naturally - I'll understand and update your metrics
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {/* Chat Input */}
            <div className="relative">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type something like: 'Contacted 10 event hosts and scheduled 3 meetings today' or 'Shipped 2 features and resolved 15 support tickets'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px] resize-none"
                disabled={loading}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                Cmd/Ctrl + Enter to parse
              </div>
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-medium text-blue-900 mb-2">Suggestions:</p>
                <div className="space-y-1">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-3 py-2 text-sm text-blue-700 hover:bg-blue-100 rounded transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Preview Parsed Metrics and Events */}
            {showPreview && parsedResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                <p className="font-medium text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Detected Data:
                </p>

                {Object.keys(parsedResult.issiahMetrics).length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Issiah's Metrics:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(parsedResult.issiahMetrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between bg-white px-2 py-1 rounded">
                          <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className="font-semibold text-green-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {Object.keys(parsedResult.soyaMetrics).length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">Soya's Metrics:</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(parsedResult.soyaMetrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between bg-white px-2 py-1 rounded">
                          <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                          <span className="font-semibold text-green-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {parsedResult.calendarEvents && parsedResult.calendarEvents.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Calendar Events ({parsedResult.calendarEvents.length}):
                    </p>
                    <div className="space-y-2">
                      {parsedResult.calendarEvents.map((event, idx) => (
                        <div key={idx} className="bg-white px-3 py-2 rounded border border-blue-200">
                          <p className="text-sm font-semibold text-gray-800">{event.title}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {new Date(event.start_time).toLocaleString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: event.all_day ? undefined : 'numeric',
                              minute: event.all_day ? undefined : '2-digit',
                            })}
                            {event.all_day && ' (All Day)'}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                              {event.event_type}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              {event.attendees.join(', ')}
                            </span>
                          </div>
                          {event.location && (
                            <p className="text-xs text-gray-500 mt-1">📍 {event.location}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {parsedResult.tasks && parsedResult.tasks.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <CheckSquare className="w-3 h-3" />
                      Tasks ({parsedResult.tasks.length}):
                    </p>
                    <div className="space-y-2">
                      {parsedResult.tasks.map((task, idx) => (
                        <div key={idx} className="bg-white px-3 py-2 rounded border border-purple-200">
                          <p className="text-sm font-semibold text-gray-800">{task.title}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Due: {new Date(task.due_date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <div className="flex gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              task.priority === 'high' ? 'bg-red-100 text-red-700' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {task.priority}
                            </span>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                              {task.owner}
                            </span>
                            {task.category && (
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                {task.category}
                              </span>
                            )}
                          </div>
                          {task.metrics_impact && (
                            <p className="text-xs text-purple-600 mt-1">
                              ⚡ Completes: {task.metrics_impact.metric_type?.replace(/_/g, ' ')} +{task.metrics_impact.metric_value}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!showPreview ? (
                <Button
                  onClick={handleParse}
                  disabled={!message.trim() || loading}
                  className="flex-1"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Parse Message
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    isLoading={loading}
                    className="flex-1"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Save Metrics
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPreview(false);
                      setParsedResult(null);
                    }}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat History */}
      {chatHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {chatHistory.map((entry, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2 p-3 rounded-lg ${
                    entry.success ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  {entry.success ? (
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 break-words">{entry.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{entry.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Examples */}
      <Card className="bg-gray-50">
        <CardContent className="pt-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Example phrases you can try:</p>

          <div className="mb-3">
            <p className="text-xs font-semibold text-blue-700 mb-1">📊 Metrics:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• "Contacted 10 event hosts and scheduled 3 meetings today"</li>
              <li>• "Posted 5 times on LinkedIn this week"</li>
              <li>• "Revenue hit $5000 milestone"</li>
              <li>• "Shipped 2 features and resolved 15 support tickets"</li>
            </ul>
          </div>

          <div className="mb-3">
            <p className="text-xs font-semibold text-purple-700 mb-1">📅 Calendar Events:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• "Scheduled meeting with sponsor tomorrow at 2pm"</li>
              <li>• "Call with event host on Friday at 10am"</li>
              <li>• "Deadline for proposal next Monday"</li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-green-700 mb-1">✔️ Tasks:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• "Add task: Contact 5 sponsors by Friday"</li>
              <li>• "Task for Issiah: Send partnership emails by Monday"</li>
              <li>• "Todo: Fix login bug (high priority)"</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
