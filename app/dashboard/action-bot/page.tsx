"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/firebase";
import { createActionItem } from "@/lib/firestore";
import { parseActionItems, hasValidActionItems } from "@/lib/actionBotParser";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Sparkles, CheckCircle, AlertCircle, Zap } from "lucide-react";

export default function ActionBotPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  const handleParse = () => {
    if (!text.trim()) {
      alert("Please enter action items to parse");
      return;
    }

    if (!hasValidActionItems(text)) {
      alert("No valid action items detected. Make sure you follow the format:\n\n1. Title\nPriority: HIGH\nTask: description\nContext: why\nImpact: outcome");
      return;
    }

    const items = parseActionItems(text);
    setPreview(items);
    setShowPreview(true);
  };

  const handleCreate = async () => {
    if (preview.length === 0) return;

    setLoading(true);

    try {
      const user = await getCurrentUser();
      if (!user) {
        alert("You must be logged in to create action items");
        return;
      }

      const promises = preview.map(item =>
        createActionItem({
          area: item.area,
          priority: item.priority,
          task: item.task,
          context: item.context,
          impact: item.impact,
          created_by: user.uid,
        })
      );

      const results = await Promise.all(promises);
      const successfulItems = results.filter(r => r.success).length;

      setSuccessCount(successfulItems);

      if (successfulItems === preview.length) {
        alert(`✅ Successfully created ${successfulItems} action items!`);
        setText("");
        setPreview([]);
        setShowPreview(false);

        // Navigate to overview to see the items
        setTimeout(() => {
          router.push('/dashboard/overview');
        }, 1000);
      } else {
        alert(`⚠️ Created ${successfulItems} out of ${preview.length} action items. Some failed.`);
      }
    } catch (error) {
      console.error("Error creating action items:", error);
      alert("Failed to create action items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const exampleFormat = `1. Landing Page Optimization & User Psychology
Priority: HIGH
Task: Evaluate current landing page effectiveness and streamline if needed. Remove unnecessary paragraphs and replace with strong one-liners.
Context: Visitors are already interested through outreach. We don't need to sell them — we need to guide them into the app efficiently.
Impact: Higher click-through to app. Lower bounce rate. Shorter time-on-page means users are moving forward faster.

2. Split Landing Page Implementation (Event Host vs Sponsor)
Priority: HIGH
Task: Redesign landing page with two personalized entry points — LEFT side for Event Hosts, RIGHT side for Sponsors.
Context: Generic landing pages create confusion. Personalized entry points make each user feel like the platform was built specifically for them.
Impact: Clear separation = better conversion and user experience.`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Action Bot</h1>
        <p className="text-gray-600 mt-1">
          Create strategic action items that will appear on the overview page
        </p>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <CardTitle>Create Action Items</CardTitle>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Paste your action items below in the specified format
          </p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {/* Text Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action Items (Follow Format Below)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your action items here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[300px] resize-y font-mono text-sm"
                disabled={loading}
              />
            </div>

            {/* Preview */}
            {showPreview && preview.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-medium text-green-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Detected {preview.length} Action Items:
                </p>
                <div className="space-y-2">
                  {preview.map((item, idx) => (
                    <div key={idx} className="bg-white px-3 py-2 rounded border border-green-200">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-800">{item.area}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          item.priority === 'high' ? 'bg-red-100 text-red-700' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!showPreview ? (
                <Button
                  onClick={handleParse}
                  disabled={!text.trim() || loading}
                  className="flex-1"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Parse Action Items
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleCreate}
                    isLoading={loading}
                    className="flex-1"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Create {preview.length} Action Items
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowPreview(false);
                      setPreview([]);
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

      {/* Example Format */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="text-lg">Required Format</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">
            Each action item must follow this exact format:
          </p>
          <pre className="bg-white border border-gray-200 rounded-lg p-4 text-xs overflow-x-auto">
            {exampleFormat}
          </pre>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p><strong>Format Rules:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Start each item with a number: <code className="bg-gray-200 px-1 rounded">1.</code> <code className="bg-gray-200 px-1 rounded">2.</code> etc.</li>
              <li>Include <code className="bg-gray-200 px-1 rounded">Priority: HIGH|MEDIUM|LOW</code></li>
              <li>Include <code className="bg-gray-200 px-1 rounded">Task:</code> description</li>
              <li>Include <code className="bg-gray-200 px-1 rounded">Context:</code> why this matters</li>
              <li>Include <code className="bg-gray-200 px-1 rounded">Impact:</code> expected outcome</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
