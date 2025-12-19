"use client";

import { useState, useRef, useEffect } from "react";
import { parseMessage, getSuggestions, hasValidMetrics } from "@/lib/chatParser";
import type { ParsedMetrics } from "@/lib/chatParser";
import { saveIssiahMetrics, saveSoyaMetrics } from "@/lib/firestore";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Send, Sparkles, CheckCircle, AlertCircle } from "lucide-react";

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

        alert("Metrics saved successfully! 🎉");
      } else {
        throw new Error("Failed to save some metrics");
      }
    } catch (error) {
      console.error("Error saving metrics:", error);
      setChatHistory(prev => [{
        message,
        timestamp: new Date().toLocaleTimeString(),
        success: false
      }, ...prev.slice(0, 4)]);
      alert("Failed to save metrics. Please try again.");
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

            {/* Preview Parsed Metrics */}
            {showPreview && parsedResult && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-medium text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Detected Metrics:
                </p>

                {Object.keys(parsedResult.issiahMetrics).length > 0 && (
                  <div className="mb-3">
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
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• "Contacted 10 event hosts and scheduled 3 meetings today"</li>
            <li>• "Posted 5 times on LinkedIn this week"</li>
            <li>• "Revenue hit $5000 milestone"</li>
            <li>• "Shipped 2 features and resolved 15 support tickets"</li>
            <li>• "Got 25 new user signups and collected 10 feedback items"</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
