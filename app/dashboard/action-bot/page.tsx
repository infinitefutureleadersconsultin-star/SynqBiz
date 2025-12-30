"use client";

import { useState } from "react";
import { getCurrentUser } from "@/lib/firebase";
import { createActionItem } from "@/lib/firestore";
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Bot, Sparkles, CheckCircle, AlertCircle, Copy } from "lucide-react";
import type { CoFounder } from "@/types";

interface ParsedActionItem {
  title: string;
  task: string;
  context: string;
  impact: string;
  priority: "high" | "medium" | "low";
}

export default function ActionBotPage() {
  const [input, setInput] = useState("");
  const [parsing, setParsing] = useState(false);
  const [creating, setCreating] = useState(false);
  const [parsedItems, setParsedItems] = useState<ParsedActionItem[]>([]);
  const [results, setResults] = useState<{success: number; failed: number; errors: string[]}>({ success: 0, failed: 0, errors: [] });
  const [showResults, setShowResults] = useState(false);

  /**
   * Sophisticated AI parser that can handle:
   * - Multiple items in one paste
   * - Various formats (numbered lists, bullets, paragraphs)
   * - Extraction of title, task, context, impact, priority
   */
  const parseActionItems = (text: string): ParsedActionItem[] => {
    const items: ParsedActionItem[] = [];

    // Split by numbered headers (### 1., ### 2., etc)
    // Use lookahead to keep the header with each section
    const sections = text.split(/(?=###\s+\d+\.)/g).filter(s => s.trim().length > 20);

    console.log('📊 Parser: Found', sections.length, 'sections to parse');

    for (const section of sections) {
      if (section.trim().length < 20) continue; // Skip tiny sections

      console.log('📝 Parsing section (first 100 chars):', section.substring(0, 100));

      // Extract title (first line or header)
      let title = "";
      const titleMatch = section.match(/^###\s+\d+\.\s+(.+?)(?:\n|$)/m) ||
                        section.match(/^(.+?)(?:\n|$)/);
      if (titleMatch) {
        title = titleMatch[1].replace(/\*\*Priority:\*\*\s+(HIGH|MEDIUM|LOW)/i, "").trim();
      }
      console.log('  📌 Title:', title || '(none found)');

      // Extract priority
      let priority: "high" | "medium" | "low" = "medium";
      const priorityMatch = section.match(/\*\*Priority:\*\*\s+(HIGH|MEDIUM|LOW)/i);
      if (priorityMatch) {
        priority = priorityMatch[1].toLowerCase() as "high" | "medium" | "low";
      }

      // Extract task
      let task = "";
      const taskMatch = section.match(/\*\*Task:\*\*\s*([\s\S]+?)(?=\*\*Context:|$)/i);
      if (taskMatch) {
        task = taskMatch[1].trim();
      }

      // Extract context
      let context = "";
      const contextMatch = section.match(/\*\*Context:\*\*\s*([\s\S]+?)(?=\*\*Impact:|$)/i) ||
                          section.match(/\*\*Strategic Context:\*\*\s*([\s\S]+?)(?=\*\*Impact:|$)/i);
      if (contextMatch) {
        context = contextMatch[1].trim();
      }

      // Extract impact
      let impact = "";
      const impactMatch = section.match(/\*\*Impact:\*\*\s*([\s\S]+?)$/i) ||
                         section.match(/\*\*Business Impact:\*\*\s*([\s\S]+?)$/i);
      if (impactMatch) {
        impact = impactMatch[1].trim();
      }

      // If we have at least a title and one other field, consider it valid
      if (title && (task || context || impact)) {
        // If task is missing but we have content, use first paragraph as task
        if (!task && section.length > 50) {
          const lines = section.split('\n').filter(l => l.trim());
          task = lines.slice(1, 5).join('\n').trim();
        }

        // Set defaults for missing fields
        if (!context) context = "Parsed from bulk input";
        if (!impact) impact = "To be defined";

        console.log('  ✅ Item valid, adding to list');
        items.push({ title, task, context, impact, priority });
      } else {
        console.log('  ❌ Item invalid - missing required fields');
      }
    }

    console.log('✅ Parser: Successfully parsed', items.length, 'action items');
    return items;
  };

  const handleParse = () => {
    setParsing(true);
    setShowResults(false);
    setParsedItems([]); // Clear previous results

    try {
      console.log('🔍 Starting parse with input length:', input.length);
      const parsed = parseActionItems(input);
      setParsedItems(parsed);

      if (parsed.length === 0) {
        alert('⚠️ No action items found!\n\nMake sure your input uses this format:\n\n### 1. Title\n**Priority:** HIGH\n**Task:** Your task\n**Context:** Your context\n**Impact:** Your impact\n\nOr click "Load Example" to see a working example.');
      }
    } catch (error) {
      alert('❌ Error parsing input. Please check the format and try again.');
      console.error('Parser error:', error);
    } finally {
      setParsing(false);
    }
  };

  const handleCreateAll = async () => {
    if (parsedItems.length === 0) {
      alert('No items to create. Please parse your input first.');
      return;
    }

    setCreating(true);
    setResults({ success: 0, failed: 0, errors: [] });

    try {
      const user = await getCurrentUser();
      if (!user) {
        alert('Please log in first');
        setCreating(false);
        return;
      }

      const coFounder: CoFounder = user.email?.includes('issiah') ? 'issiah' : 'soya';

      let successCount = 0;
      let failedCount = 0;
      const errors: string[] = [];

      for (const item of parsedItems) {
        try {
          const result = await createActionItem({
            title: item.title,
            task: item.task,
            context: item.context,
            impact: item.impact,
            priority: item.priority,
            created_by: user.uid,
            created_by_name: coFounder,
          });

          if (result.success) {
            successCount++;
          } else {
            failedCount++;
            errors.push(`${item.title}: ${result.error}`);
          }
        } catch (error: any) {
          failedCount++;
          errors.push(`${item.title}: ${error.message}`);
        }
      }

      setResults({ success: successCount, failed: failedCount, errors });
      setShowResults(true);

      if (successCount === parsedItems.length) {
        // Clear form if all succeeded
        setInput('');
        setParsedItems([]);
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setCreating(false);
    }
  };

  const exampleText = `### 1. Landing Page Optimization & User Psychology
**Priority:** HIGH

**Task:**
Evaluate current landing page effectiveness and streamline if needed:

QUESTIONS TO ADDRESS:
• Is the landing page too busy or just right?
• Should we streamline the amount of copy?
• Are we overwhelming visitors with too much information?

**Context:** User Psychology and Conversion Optimization

**Impact:** At this stage, visitors are already interested through outreach. We don't need to sell them - we need to guide them into the app efficiently.

### 2. SMS Marketing (CRITICAL - Posh Has This)
**Priority:** HIGH

**Task:**
SMS broadcast capabilities matching Posh:
• Send SMS blasts to past attendees about new events
• Segment by event category, location, purchase history
• Track conversion rates (Posh claims 32% of inventory sold via SMS)

**Context:** CRITICAL FEATURE GAP vs Posh - Revenue Driver

**Impact:** CRITICAL GAP vs Posh. They sell 32% of tickets through SMS blasts. This is a proven, high-ROI re-engagement channel.`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bot className="w-10 h-10 text-purple-600" />
            Action Item AI Bot
          </h1>
          <p className="text-gray-600 mt-1">Parse and create multiple action items from natural language</p>
        </div>
      </div>

      {/* Instructions Card */}
      <Card className="border-2 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            How to Use
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="font-semibold text-purple-900">✨ Paste all 17 action items at once (or any number)!</p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Format:</strong> Use numbered headers (### 1., ### 2.) or separate items with blank lines</li>
              <li>• <strong>Required fields:</strong> Title, Task, Context, Impact, Priority</li>
              <li>• <strong>Priority:</strong> Specify **Priority:** HIGH, MEDIUM, or LOW</li>
              <li>• <strong>Bulk paste:</strong> Copy all items from the list above and paste below</li>
            </ul>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInput(exampleText)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Load Example (2 items)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <Card>
        <CardHeader>
          <CardTitle>Paste Action Items</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your action items here... (supports multiple items at once)"
            rows={20}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-mono text-sm"
          />
          <div className="flex gap-3 mt-4">
            <Button onClick={handleParse} disabled={!input.trim() || parsing}>
              {parsing ? 'Parsing...' : 'Parse Items'}
            </Button>
            <Button variant="outline" onClick={() => { setInput(''); setParsedItems([]); setShowResults(false); }}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Parsed Items Preview */}
      {parsedItems.length > 0 && (
        <Card className="border-2 border-green-300">
          <CardHeader className="bg-green-50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-green-900">
                ✓ Parsed {parsedItems.length} Action Item{parsedItems.length !== 1 ? 's' : ''}
              </CardTitle>
              <Button onClick={handleCreateAll} disabled={creating}>
                {creating ? 'Creating...' : `Create All ${parsedItems.length} Items`}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {parsedItems.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      item.priority === 'high' ? 'bg-red-600 text-white' :
                      item.priority === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Task:</span>
                      <p className="text-gray-600 whitespace-pre-line line-clamp-3">{item.task}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Context:</span>
                      <p className="text-gray-600 italic line-clamp-1">{item.context}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Impact:</span>
                      <p className="text-gray-600 line-clamp-2">{item.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {showResults && (
        <Card className={`border-2 ${results.failed === 0 ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {results.failed === 0 ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-green-900">Success!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                  <span className="text-yellow-900">Partial Success</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-lg">
                <strong className="text-green-600">{results.success}</strong> items created successfully
              </p>
              {results.failed > 0 && (
                <>
                  <p className="text-lg">
                    <strong className="text-red-600">{results.failed}</strong> items failed
                  </p>
                  {results.errors.length > 0 && (
                    <div className="mt-4">
                      <p className="font-semibold text-gray-900 mb-2">Errors:</p>
                      <ul className="space-y-1 text-sm text-red-600">
                        {results.errors.map((error, i) => (
                          <li key={i}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
              <div className="mt-4">
                <a href="/dashboard/overview" className="text-purple-600 hover:text-purple-800 font-medium">
                  → View action items on Overview page
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
