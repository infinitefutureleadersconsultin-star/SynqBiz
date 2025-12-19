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
 * Main parser function - analyzes text and extracts metrics
 */
export function parseMessage(message: string): ParsedMetrics {
  const role = detectRole(message);
  const date = extractDate(message);

  const result: ParsedMetrics = {
    issiahMetrics: {},
    soyaMetrics: {},
    date,
    notes: message,
  };

  // Extract Issiah's metrics if relevant
  if (role === 'issiah' || role === 'both') {
    result.issiahMetrics = extractMetrics(message, ISSIAH_PATTERNS);
  }

  // Extract Soya's metrics if relevant
  if (role === 'soya' || role === 'both') {
    result.soyaMetrics = extractMetrics(message, SOYA_PATTERNS);
  }

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

  return suggestions.slice(0, 5); // Return top 5
}

/**
 * Validate parsed metrics
 */
export function hasValidMetrics(parsed: ParsedMetrics): boolean {
  const hasIssiahMetrics = Object.keys(parsed.issiahMetrics).length > 0;
  const hasSoyaMetrics = Object.keys(parsed.soyaMetrics).length > 0;
  return hasIssiahMetrics || hasSoyaMetrics;
}
