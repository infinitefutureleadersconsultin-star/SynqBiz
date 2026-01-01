/**
 * Local AI-Style Chat Parser
 * Understands natural language and extracts metrics without API calls
 *
 * Examples:
 * - "Contacted 10 event hosts and scheduled 3 meetings today"
 * - "Posted 5 times on LinkedIn this week"
 * - "Revenue hit $5000 milestone"
 * - "Shipped 2 features and resolved 15 support tickets"
 */

export interface ParsedCalendarEvent {
  title: string;
  description?: string;
  event_type: "meeting" | "deadline" | "milestone" | "reminder" | "other";
  start_time: string; // ISO datetime string
  end_time?: string; // ISO datetime string
  all_day: boolean;
  attendees: ('issiah' | 'soya')[];
  location?: string;
  meeting_link?: string;
  reminder_minutes: number;
}

export interface ParsedTask {
  title: string;
  description?: string;
  owner: 'issiah' | 'soya';
  due_date: string; // YYYY-MM-DD
  priority: 'low' | 'medium' | 'high';
  category?: string;
  metrics_impact?: {
    metric_type?: string;
    metric_value?: number;
  };
}

export interface ParsedMetrics {
  issiahMetrics: {
    outreach_contacts?: number;
    meetings_scheduled?: number;
    partnership_emails?: number;
    business_concepts?: number;
    college_outreach?: number;
    personal_brand_posts?: number;
    event_host_outreach?: number;
    enterprise_outreach?: number;
  };
  soyaMetrics: {
    revenue_milestone?: number;
    ui_improvements?: number;
    user_signups?: number;
    support_tickets_resolved?: number;
    app_uptime_percentage?: number;
    onboarding_completion_rate?: number;
    feedback_collected?: number;
    retention_rate?: number;
    facebook_ads_spent?: number;
    features_shipped?: number;
  };
  calendarEvents: ParsedCalendarEvent[];
  tasks: ParsedTask[];
  date?: string;
  notes?: string;
}

// Pattern definitions for Issiah's metrics
const ISSIAH_PATTERNS = [
  {
    key: 'outreach_contacts',
    patterns: [
      /contacted?\s+(\d+)\s+(event\s+host|contact|people|person|lead)/i,
      /(\d+)\s+(outreach|contact|lead)s?\s+(made|sent)/i,
      /reached\s+out\s+to\s+(\d+)/i,
    ],
  },
  {
    key: 'meetings_scheduled',
    patterns: [
      /scheduled?\s+(\d+)\s+meeting/i,
      /(\d+)\s+meeting.*scheduled/i,
      /set\s+up\s+(\d+)\s+meeting/i,
      /booked\s+(\d+)\s+(meeting|call)/i,
    ],
  },
  {
    key: 'partnership_emails',
    patterns: [
      /sent\s+(\d+)\s+(partnership\s+)?email/i,
      /(\d+)\s+partnership\s+email/i,
      /emailed\s+(\d+)\s+(partner|sponsor)/i,
    ],
  },
  {
    key: 'business_concepts',
    patterns: [
      /explored\s+(\d+)\s+(business\s+)?concept/i,
      /(\d+)\s+(business\s+)?concept.*explored/i,
      /researched\s+(\d+)\s+idea/i,
    ],
  },
  {
    key: 'college_outreach',
    patterns: [
      /(\d+)\s+(college|university|hbcu)\s+outreach/i,
      /reached\s+(\d+)\s+(college|university|school)/i,
      /contacted\s+(\d+)\s+hbcu/i,
    ],
  },
  {
    key: 'personal_brand_posts',
    patterns: [
      /posted\s+(\d+)\s+time/i,
      /(\d+)\s+(post|content).*\b(linkedin|twitter|instagram|social)/i,
      /shared\s+(\d+)\s+post/i,
      /published\s+(\d+)/i,
    ],
  },
  {
    key: 'event_host_outreach',
    patterns: [
      /(\d+)\s+event\s+host/i,
      /contacted\s+(\d+)\s+host/i,
      /reached\s+out\s+to\s+(\d+)\s+event/i,
    ],
  },
  {
    key: 'enterprise_outreach',
    patterns: [
      /(\d+)\s+enterprise/i,
      /(\d+)\s+(corporate|company)/i,
      /reached\s+(\d+)\s+business/i,
    ],
  },
];

// Pattern definitions for Soya's metrics
const SOYA_PATTERNS = [
  {
    key: 'revenue_milestone',
    patterns: [
      /revenue.*\$?(\d+)/i,
      /\$(\d+)\s+(revenue|milestone)/i,
      /hit\s+\$(\d+)/i,
      /made\s+\$(\d+)/i,
    ],
  },
  {
    key: 'user_signups',
    patterns: [
      /(\d+)\s+(user|signup|registration)/i,
      /(\d+)\s+new\s+user/i,
      /(\d+)\s+people\s+signed\s+up/i,
    ],
  },
  {
    key: 'support_tickets_resolved',
    patterns: [
      /resolved?\s+(\d+)\s+(ticket|issue)/i,
      /(\d+)\s+ticket.*resolved/i,
      /fixed\s+(\d+)\s+(ticket|issue)/i,
      /closed\s+(\d+)\s+ticket/i,
    ],
  },
  {
    key: 'features_shipped',
    patterns: [
      /shipped?\s+(\d+)\s+feature/i,
      /(\d+)\s+feature.*shipped/i,
      /deployed\s+(\d+)\s+feature/i,
      /launched\s+(\d+)/i,
    ],
  },
  {
    key: 'ui_improvements',
    patterns: [
      /(\d+)\s+ui\s+(improvement|update|fix)/i,
      /improved\s+(\d+)\s+(ui|interface)/i,
      /(\d+)\s+design\s+update/i,
    ],
  },
  {
    key: 'app_uptime_percentage',
    patterns: [
      /uptime.*(\d+)%/i,
      /(\d+)%\s+uptime/i,
      /availability.*(\d+)/i,
    ],
  },
  {
    key: 'onboarding_completion_rate',
    patterns: [
      /onboarding.*(\d+)%/i,
      /(\d+)%.*onboarding/i,
      /completion\s+rate.*(\d+)/i,
    ],
  },
  {
    key: 'feedback_collected',
    patterns: [
      /collected\s+(\d+)\s+feedback/i,
      /(\d+)\s+feedback/i,
      /gathered\s+(\d+)\s+(response|review)/i,
    ],
  },
  {
    key: 'retention_rate',
    patterns: [
      /retention.*(\d+)%/i,
      /(\d+)%.*retention/i,
      /retained\s+(\d+)%/i,
    ],
  },
  {
    key: 'facebook_ads_spent',
    patterns: [
      /spent\s+\$?(\d+).*\b(ad|facebook)/i,
      /\$?(\d+).*ad\s+spend/i,
      /(facebook|fb)\s+ad.*\$?(\d+)/i,
    ],
  },
];

/**
 * Extract numbers from text using patterns
 */
function extractMetrics(text: string, patterns: typeof ISSIAH_PATTERNS | typeof SOYA_PATTERNS) {
  const metrics: any = {};

  for (const { key, patterns: patternList } of patterns) {
    for (const pattern of patternList) {
      const match = text.match(pattern);
      if (match) {
        const value = parseInt(match[1] || match[2] || '0', 10);
        if (!isNaN(value) && value > 0) {
          metrics[key] = value;
          break; // Found a match, move to next metric
        }
      }
    }
  }

  return metrics;
}

/**
 * Detect which role (Issiah or Soya) the message is for
 */
function detectRole(text: string): 'issiah' | 'soya' | 'both' {
  const lowerText = text.toLowerCase();

  // Business/outreach keywords → Issiah
  const issiahKeywords = [
    'contact', 'meeting', 'partnership', 'outreach', 'email',
    'college', 'hbcu', 'event host', 'enterprise', 'posted',
    'linkedin', 'social', 'brand'
  ];

  // Technical/product keywords → Soya
  const soyaKeywords = [
    'revenue', 'user', 'signup', 'ticket', 'feature', 'ui',
    'uptime', 'onboarding', 'feedback', 'retention', 'ad',
    'shipped', 'deployed', 'fixed'
  ];

  const issiahMatches = issiahKeywords.filter(k => lowerText.includes(k)).length;
  const soyaMatches = soyaKeywords.filter(k => lowerText.includes(k)).length;

  if (issiahMatches > 0 && soyaMatches === 0) return 'issiah';
  if (soyaMatches > 0 && issiahMatches === 0) return 'soya';
  return 'both'; // Check both if unclear
}

/**
 * Extract date from message (defaults to today)
 */
function extractDate(text: string): string {
  const today = new Date().toISOString().split('T')[0];

  // Check for explicit dates
  const datePatterns = [
    /(\d{4})-(\d{2})-(\d{2})/,
    /(yesterday|today|tomorrow)/i,
    /(last|this)\s+(week|month)/i,
  ];

  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      const term = match[0].toLowerCase();

      if (term === 'yesterday') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toISOString().split('T')[0];
      }

      if (term === 'tomorrow') {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
      }

      // If YYYY-MM-DD format
      if (pattern === datePatterns[0]) {
        return match[0];
      }
    }
  }

  return today;
}

/**
 * Extract datetime for calendar events
 * Returns ISO datetime string
 */
function extractDateTime(text: string): { date: Date; hasTime: boolean } {
  const now = new Date();
  let targetDate = new Date(now);
  let hasTime = false;

  // Day of week patterns (Monday, Tuesday, etc.)
  const dayOfWeekMatch = text.match(/(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun)/i);
  if (dayOfWeekMatch) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayName = dayOfWeekMatch[0].toLowerCase();
    const targetDayIndex = days.findIndex(d => d.startsWith(dayName)) || shortDays.indexOf(dayName);

    if (targetDayIndex >= 0) {
      const currentDay = targetDate.getDay();
      let daysUntilTarget = targetDayIndex - currentDay;
      if (daysUntilTarget <= 0) daysUntilTarget += 7; // Next occurrence
      targetDate.setDate(targetDate.getDate() + daysUntilTarget);
    }
  }

  // Relative date patterns
  const relativeMatch = text.match(/(yesterday|today|tomorrow|next\s+(week|month))/i);
  if (relativeMatch) {
    const term = relativeMatch[0].toLowerCase();
    if (term === 'yesterday') {
      targetDate.setDate(targetDate.getDate() - 1);
    } else if (term === 'tomorrow') {
      targetDate.setDate(targetDate.getDate() + 1);
    } else if (term.includes('next week')) {
      targetDate.setDate(targetDate.getDate() + 7);
    } else if (term.includes('next month')) {
      targetDate.setMonth(targetDate.getMonth() + 1);
    }
  }

  // Time patterns (2pm, 14:00, 3:30pm, etc.)
  const timePatterns = [
    /(\d{1,2}):(\d{2})\s*(am|pm)?/i,
    /(\d{1,2})\s*(am|pm)/i,
  ];

  for (const pattern of timePatterns) {
    const timeMatch = text.match(pattern);
    if (timeMatch) {
      hasTime = true;
      let hours = parseInt(timeMatch[1], 10);
      let minutes = parseInt(timeMatch[2] || '0', 10);
      const meridiem = timeMatch[3] || timeMatch[2];

      if (meridiem && meridiem.toLowerCase() === 'pm' && hours < 12) {
        hours += 12;
      } else if (meridiem && meridiem.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
      }

      targetDate.setHours(hours, minutes, 0, 0);
      break;
    }
  }

  // If no time specified, default to 9am for meetings
  if (!hasTime) {
    targetDate.setHours(9, 0, 0, 0);
  }

  return { date: targetDate, hasTime };
}

/**
 * Extract event type from message
 */
function extractEventType(text: string): "meeting" | "deadline" | "milestone" | "reminder" | "other" {
  const lowerText = text.toLowerCase();

  if (lowerText.includes('meeting') || lowerText.includes('call') || lowerText.includes('scheduled')) {
    return 'meeting';
  }
  if (lowerText.includes('deadline') || lowerText.includes('due')) {
    return 'deadline';
  }
  if (lowerText.includes('milestone') || lowerText.includes('goal')) {
    return 'milestone';
  }
  if (lowerText.includes('remind') || lowerText.includes('reminder')) {
    return 'reminder';
  }

  return 'other';
}

/**
 * Extract attendees from message
 */
function extractAttendees(text: string): ('issiah' | 'soya')[] {
  const lowerText = text.toLowerCase();
  const attendees: ('issiah' | 'soya')[] = [];

  if (lowerText.includes('issiah') || lowerText.includes('isaiah')) {
    attendees.push('issiah');
  }
  if (lowerText.includes('soya')) {
    attendees.push('soya');
  }

  // If no specific attendees mentioned, include both
  if (attendees.length === 0) {
    return ['issiah', 'soya'];
  }

  return attendees;
}

/**
 * Parse calendar events from message
 * Detects patterns like:
 * - "Scheduled meeting with sponsor tomorrow at 2pm"
 * - "Call with event host on Friday at 10am"
 * - "Deadline for proposal next Monday"
 */
function parseCalendarEvents(text: string): ParsedCalendarEvent[] {
  const events: ParsedCalendarEvent[] = [];
  const lowerText = text.toLowerCase();

  // Calendar event trigger words
  const triggers = [
    'scheduled', 'schedule', 'meeting', 'call', 'deadline',
    'reminder', 'appointment', 'set up', 'booked'
  ];

  const hasTrigger = triggers.some(trigger => lowerText.includes(trigger));
  if (!hasTrigger) {
    return events;
  }

  // Extract event title/description
  let title = 'Untitled Event';

  // Pattern: "meeting/call with X"
  const withMatch = text.match(/(meeting|call|scheduled?)\s+with\s+([^,.\n]+)/i);
  if (withMatch) {
    title = `${withMatch[1]} with ${withMatch[2].trim()}`;
  }

  // Pattern: "meeting/call about X"
  const aboutMatch = text.match(/(meeting|call|scheduled?)\s+about\s+([^,.\n]+)/i);
  if (aboutMatch && !withMatch) {
    title = `${aboutMatch[1]} about ${aboutMatch[2].trim()}`;
  }

  // Pattern: "deadline for X"
  const deadlineMatch = text.match(/deadline\s+for\s+([^,.\n]+)/i);
  if (deadlineMatch) {
    title = `Deadline: ${deadlineMatch[1].trim()}`;
  }

  // Pattern: "reminder to X"
  const reminderMatch = text.match(/remind(?:er)?\s+(?:to|for)\s+([^,.\n]+)/i);
  if (reminderMatch) {
    title = `Reminder: ${reminderMatch[1].trim()}`;
  }

  // Extract datetime
  const { date, hasTime } = extractDateTime(text);
  const startTime = date.toISOString();

  // End time is 1 hour after start
  const endDate = new Date(date);
  endDate.setHours(endDate.getHours() + 1);
  const endTime = endDate.toISOString();

  // Extract event type
  const eventType = extractEventType(text);

  // Extract attendees
  const attendees = extractAttendees(text);

  // Extract location or meeting link
  let location: string | undefined;
  let meetingLink: string | undefined;

  const locationMatch = text.match(/(?:at|location:|where:)\s+([^,.\n]+)/i);
  if (locationMatch) {
    location = locationMatch[1].trim();
  }

  const linkMatch = text.match(/(https?:\/\/[^\s]+)/);
  if (linkMatch) {
    meetingLink = linkMatch[0];
  }

  events.push({
    title: title.charAt(0).toUpperCase() + title.slice(1),
    description: text,
    event_type: eventType,
    start_time: startTime,
    end_time: endTime,
    all_day: !hasTime,
    attendees,
    location,
    meeting_link: meetingLink,
    reminder_minutes: 15,
  });

  return events;
}

/**
 * Parse bulk structured tasks from formatted text
 * Handles format like:
 * 1. Task Title
 * Priority: HIGH
 * Task: Description here
 * Context: Background info
 * Impact: Expected outcome
 */
export function parseBulkStructuredTasks(text: string): ParsedTask[] {
  const tasks: ParsedTask[] = [];

  // Split by numbered sections (1., 2., 3., etc.)
  const sections = text.split(/\n(?=\d+\.\s+)/);

  for (const section of sections) {
    if (!section.trim()) continue;

    // Extract title (first line after number)
    const titleMatch = section.match(/^\d+\.\s+(.+?)(?:\n|$)/);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();

    // Extract Priority
    const priorityMatch = section.match(/Priority:\s*(HIGH|MEDIUM|LOW)/i);
    let priority: 'low' | 'medium' | 'high' = 'medium';
    if (priorityMatch) {
      priority = priorityMatch[1].toLowerCase() as 'low' | 'medium' | 'high';
    }

    // Extract Task description
    const taskMatch = section.match(/Task:\s*([\s\S]+?)(?=\n(?:Context:|Impact:|Priority:|$))/i);
    const taskDescription = taskMatch ? taskMatch[1].trim() : '';

    // Extract Context
    const contextMatch = section.match(/Context:\s*([\s\S]+?)(?=\n(?:Task:|Impact:|Priority:|$))/i);
    const context = contextMatch ? contextMatch[1].trim() : '';

    // Extract Impact
    const impactMatch = section.match(/Impact:\s*([\s\S]+?)(?=\n(?:Task:|Context:|Priority:|$))/i);
    const impact = impactMatch ? impactMatch[1].trim() : '';

    // Combine description, context, and impact
    let fullDescription = taskDescription;
    if (context) fullDescription += `\n\nContext: ${context}`;
    if (impact) fullDescription += `\n\nImpact: ${impact}`;

    // Determine owner based on keywords in task description
    const combinedText = `${title} ${taskDescription} ${context}`.toLowerCase();
    let owner: 'issiah' | 'soya' = 'issiah'; // Default

    // Issiah keywords (business, outreach, partnerships)
    const issiahKeywords = [
      'landing page', 'branding', 'marketing', 'pricing', 'customer',
      'sponsor', 'partnership', 'outreach', 'sales', 'presentation',
      'messaging', 'purple cow', 'ambassador', 'university', 'compliance',
      'enterprise', 'messaging', 'strategy', 'positioning'
    ];

    // Soya keywords (technical, development, product)
    const soyaKeywords = [
      'build', 'system', 'dashboard', 'api', 'integration', 'database',
      'feature', 'ui', 'payout', 'sms', 'promoter', 'qr code', 'tracking',
      'analytics', 'performance', 'auto-generate', 'placid', 'webhook',
      'stripe', 'twilio', 'technical', 'development', 'code', 'implement'
    ];

    const issiahScore = issiahKeywords.filter(k => combinedText.includes(k)).length;
    const soyaScore = soyaKeywords.filter(k => combinedText.includes(k)).length;

    if (soyaScore > issiahScore) {
      owner = 'soya';
    }

    // Determine category based on keywords
    let category: string | undefined;
    if (combinedText.includes('landing') || combinedText.includes('marketing') || combinedText.includes('messaging')) {
      category = 'marketing';
    } else if (combinedText.includes('pricing') || combinedText.includes('revenue') || combinedText.includes('subscription')) {
      category = 'revenue';
    } else if (combinedText.includes('build') || combinedText.includes('feature') || combinedText.includes('development')) {
      category = 'development';
    } else if (combinedText.includes('sponsor') || combinedText.includes('partnership')) {
      category = 'outreach';
    } else if (combinedText.includes('compliance') || combinedText.includes('university') || combinedText.includes('enterprise')) {
      category = 'enterprise';
    }

    // Default due date (7 days from now for HIGH, 14 days for MEDIUM, 30 days for LOW)
    const now = new Date();
    let daysToAdd = 14;
    if (priority === 'high') daysToAdd = 7;
    if (priority === 'low') daysToAdd = 30;

    const dueDate = new Date(now);
    dueDate.setDate(dueDate.getDate() + daysToAdd);

    tasks.push({
      title,
      description: fullDescription,
      owner,
      due_date: dueDate.toISOString().split('T')[0],
      priority,
      category,
    });
  }

  return tasks;
}

/**
 * Parse tasks from message
 * Detects patterns like:
 * - "Add task: Contact 5 sponsors by Friday"
 * - "Task for Issiah: Send partnership emails"
 * - "Todo: Fix login bug (high priority)"
 * - "Reminder for Soya: Deploy new feature by Monday"
 */
function parseTasks(text: string): ParsedTask[] {
  const tasks: ParsedTask[] = [];
  const lowerText = text.toLowerCase();

  // Task trigger words
  const triggers = [
    'add task', 'task:', 'todo:', 'to do:', 'reminder:',
    'create task', 'new task', 'task for', 'todo for'
  ];

  const hasTrigger = triggers.some(trigger => lowerText.includes(trigger));
  if (!hasTrigger) {
    return tasks;
  }

  // Extract task title
  let title = 'Untitled Task';

  // Pattern: "add task: TITLE" or "task: TITLE" or "todo: TITLE"
  const taskMatch = text.match(/(?:add\s+task|task|todo|to\s+do|reminder|create\s+task|new\s+task):\s*([^()\n]+)/i);
  if (taskMatch) {
    title = taskMatch[1].trim();
    // Remove "by DATE" from title if present
    title = title.replace(/\s+by\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|next\s+week|next\s+\w+|\d)/i, '').trim();
  }

  // Determine owner
  let owner: 'issiah' | 'soya' = 'issiah'; // Default
  if (lowerText.includes('for issiah') || lowerText.includes('issiah:')) {
    owner = 'issiah';
  } else if (lowerText.includes('for soya') || lowerText.includes('soya:')) {
    owner = 'soya';
  } else {
    // Detect based on content
    const role = detectRole(text);
    if (role === 'soya') {
      owner = 'soya';
    }
  }

  // Extract due date
  const { date } = extractDateTime(text);
  const dueDate = date.toISOString().split('T')[0];

  // Extract priority
  let priority: 'low' | 'medium' | 'high' = 'medium'; // Default
  if (lowerText.includes('high priority') || lowerText.includes('urgent') || lowerText.includes('asap')) {
    priority = 'high';
  } else if (lowerText.includes('low priority') || lowerText.includes('when you can')) {
    priority = 'low';
  }

  // Extract category based on keywords
  let category: string | undefined;
  if (lowerText.includes('outreach') || lowerText.includes('contact') || lowerText.includes('sponsor')) {
    category = 'outreach';
  } else if (lowerText.includes('develop') || lowerText.includes('code') || lowerText.includes('feature') || lowerText.includes('bug')) {
    category = 'development';
  } else if (lowerText.includes('marketing') || lowerText.includes('social') || lowerText.includes('post')) {
    category = 'marketing';
  } else if (lowerText.includes('revenue') || lowerText.includes('sales')) {
    category = 'revenue';
  }

  // Try to detect metrics impact
  let metricsImpact: { metric_type?: string; metric_value?: number } | undefined;

  // Check if task involves metrics (e.g., "contact 5 sponsors" -> outreach_contacts: 5)
  if (owner === 'issiah') {
    const extractedMetrics = extractMetrics(text, ISSIAH_PATTERNS);
    if (Object.keys(extractedMetrics).length > 0) {
      const [metricType, metricValue] = Object.entries(extractedMetrics)[0];
      metricsImpact = {
        metric_type: metricType,
        metric_value: metricValue as number,
      };
    }
  } else {
    const extractedMetrics = extractMetrics(text, SOYA_PATTERNS);
    if (Object.keys(extractedMetrics).length > 0) {
      const [metricType, metricValue] = Object.entries(extractedMetrics)[0];
      metricsImpact = {
        metric_type: metricType,
        metric_value: metricValue as number,
      };
    }
  }

  tasks.push({
    title: title.charAt(0).toUpperCase() + title.slice(1),
    description: text,
    owner,
    due_date: dueDate,
    priority,
    category,
    metrics_impact: metricsImpact,
  });

  return tasks;
}

/**
 * Detect if message contains bulk structured task format
 */
function isBulkStructuredFormat(text: string): boolean {
  // Check for multiple numbered sections with Priority/Task/Context/Impact
  const hasNumberedSections = /\d+\.\s+.+\n.*Priority:/i.test(text);
  const hasMultipleSections = (text.match(/\n\d+\.\s+/g) || []).length >= 2;
  return hasNumberedSections && hasMultipleSections;
}

/**
 * Main parser function - analyzes text and extracts metrics and calendar events
 */
export function parseMessage(message: string): ParsedMetrics {
  const role = detectRole(message);
  const date = extractDate(message);

  const result: ParsedMetrics = {
    issiahMetrics: {},
    soyaMetrics: {},
    calendarEvents: [],
    tasks: [],
    date,
    notes: message,
  };

  // Check if this is bulk structured format
  if (isBulkStructuredFormat(message)) {
    result.tasks = parseBulkStructuredTasks(message);
    return result;
  }

  // Extract Issiah's metrics if relevant
  if (role === 'issiah' || role === 'both') {
    result.issiahMetrics = extractMetrics(message, ISSIAH_PATTERNS);
  }

  // Extract Soya's metrics if relevant
  if (role === 'soya' || role === 'both') {
    result.soyaMetrics = extractMetrics(message, SOYA_PATTERNS);
  }

  // Extract calendar events
  result.calendarEvents = parseCalendarEvents(message);

  // Extract tasks
  result.tasks = parseTasks(message);

  return result;
}

/**
 * Generate suggestions based on partial input
 */
export function getSuggestions(partialText: string): string[] {
  const suggestions: string[] = [];

  const lowerText = partialText.toLowerCase();

  // Issiah suggestions
  if (lowerText.includes('contact') || lowerText.includes('reach')) {
    suggestions.push('Contacted 10 event hosts today');
    suggestions.push('Reached out to 5 potential sponsors');
  }

  if (lowerText.includes('meet') || lowerText.includes('schedul')) {
    suggestions.push('Scheduled 3 meetings for this week');
    suggestions.push('Set up 2 partnership calls');
  }

  if (lowerText.includes('post') || lowerText.includes('social')) {
    suggestions.push('Posted 5 times on LinkedIn this week');
    suggestions.push('Shared 3 posts about SponsorSynq');
  }

  // Soya suggestions
  if (lowerText.includes('revenue') || lowerText.includes('$')) {
    suggestions.push('Revenue hit $5000 milestone');
    suggestions.push('Made $2500 this month');
  }

  if (lowerText.includes('user') || lowerText.includes('signup')) {
    suggestions.push('Got 25 new user signups today');
    suggestions.push('15 people signed up this week');
  }

  if (lowerText.includes('feature') || lowerText.includes('ship')) {
    suggestions.push('Shipped 2 new features');
    suggestions.push('Deployed payment integration feature');
  }

  if (lowerText.includes('ticket') || lowerText.includes('support')) {
    suggestions.push('Resolved 10 support tickets');
    suggestions.push('Fixed 8 customer issues');
  }

  // Calendar event suggestions
  if (lowerText.includes('schedul') || lowerText.includes('meeting') || lowerText.includes('call')) {
    suggestions.push('Scheduled meeting with sponsor tomorrow at 2pm');
    suggestions.push('Call with event host on Friday at 10am');
  }

  if (lowerText.includes('deadline') || lowerText.includes('due')) {
    suggestions.push('Deadline for proposal next Monday');
    suggestions.push('Due date for contract review on Wednesday');
  }

  // Task suggestions
  if (lowerText.includes('task') || lowerText.includes('todo') || lowerText.includes('to do')) {
    suggestions.push('Add task: Contact 5 sponsors by Friday');
    suggestions.push('Task for Issiah: Send partnership emails by Monday');
    suggestions.push('Todo: Fix login bug (high priority)');
  }

  return suggestions.slice(0, 5); // Return top 5
}

/**
 * Validate parsed metrics and calendar events
 */
export function hasValidMetrics(parsed: ParsedMetrics): boolean {
  const hasIssiahMetrics = Object.keys(parsed.issiahMetrics).length > 0;
  const hasSoyaMetrics = Object.keys(parsed.soyaMetrics).length > 0;
  const hasCalendarEvents = parsed.calendarEvents.length > 0;
  const hasTasks = parsed.tasks.length > 0;
  return hasIssiahMetrics || hasSoyaMetrics || hasCalendarEvents || hasTasks;
}
