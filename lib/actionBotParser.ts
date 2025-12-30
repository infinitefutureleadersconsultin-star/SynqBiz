/**
 * Parse action items from text in the format:
 * 1. Title
 * Priority: HIGH|MEDIUM|LOW
 * Task: description
 * Context: why this matters
 * Impact: expected outcome
 */

export interface ParsedActionItem {
  area: string;
  priority: 'high' | 'medium' | 'low';
  task: string;
  context: string;
  impact: string;
}

export function parseActionItems(text: string): ParsedActionItem[] {
  const items: ParsedActionItem[] = [];

  // Split by numbered items (1., 2., 3., etc.)
  const sections = text.split(/\n\d+\.\s+/).filter(s => s.trim());

  for (const section of sections) {
    const lines = section.split('\n').map(l => l.trim()).filter(l => l);

    if (lines.length < 4) continue; // Need at least: title, priority, task, context, impact

    // First line is the title/area
    const area = lines[0];

    // Extract priority
    const priorityLine = lines.find(l => l.toLowerCase().startsWith('priority:'));
    if (!priorityLine) continue;

    const priorityMatch = priorityLine.match(/priority:\s*(high|medium|low)/i);
    if (!priorityMatch) continue;

    const priority = priorityMatch[1].toLowerCase() as 'high' | 'medium' | 'low';

    // Extract task
    const taskLine = lines.find(l => l.toLowerCase().startsWith('task:'));
    if (!taskLine) continue;

    const task = taskLine.replace(/^task:\s*/i, '').trim();

    // Extract context
    const contextLine = lines.find(l => l.toLowerCase().startsWith('context:'));
    if (!contextLine) continue;

    const context = contextLine.replace(/^context:\s*/i, '').trim();

    // Extract impact
    const impactLine = lines.find(l => l.toLowerCase().startsWith('impact:'));
    if (!impactLine) continue;

    const impact = impactLine.replace(/^impact:\s*/i, '').trim();

    items.push({
      area,
      priority,
      task,
      context,
      impact,
    });
  }

  return items;
}

/**
 * Validate that text contains valid action items
 */
export function hasValidActionItems(text: string): boolean {
  const items = parseActionItems(text);
  return items.length > 0;
}
