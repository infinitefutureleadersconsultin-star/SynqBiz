export type CoFounder = "issiah" | "soya";

export interface User {
  id: string;
  email: string;
  name: string;
  role: CoFounder;
  created_at: string;
}

export interface IsaiahMetrics {
  id: string;
  user_id: string;
  date: string;
  outreach_contacts: number;
  meetings_scheduled: number;
  partnership_emails: number;
  business_concepts: number;
  college_outreach: number;
  personal_brand_posts: number;
  event_host_outreach: number;
  enterprise_outreach: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface SoyaMetrics {
  id: string;
  user_id: string;
  date: string;
  revenue_milestone: number;
  ui_improvements: number;
  user_signups: number;
  support_tickets_resolved: number;
  app_uptime_percentage: number;
  onboarding_completion_rate: number;
  feedback_collected: number;
  retention_rate: number;
  facebook_ads_spent: number;
  features_shipped: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface MetricsInput {
  date: string;
  [key: string]: string | number;
}

export interface DashboardStats {
  total: number;
  thisWeek: number;
  thisMonth: number;
  trend: "up" | "down" | "neutral";
  change: number;
}

// Phase 4: Think Tank / Ideas Board
export interface Idea {
  id: string;
  author_id: string;
  author_name: string;
  author_role: CoFounder;
  title: string;
  description: string;
  category: "feature" | "improvement" | "marketing" | "operations" | "other";
  priority: "low" | "medium" | "high";
  status: "proposed" | "under_review" | "approved" | "rejected" | "implemented";
  votes: {
    issiah: "upvote" | "downvote" | null;
    soya: "upvote" | "downvote" | null;
  };
  comments: IdeaComment[];
  created_at: string;
  updated_at: string;
}

export interface IdeaComment {
  id: string;
  idea_id: string;
  author_id: string;
  author_name: string;
  author_role: CoFounder;
  content: string;
  created_at: string;
}

// Phase 4: Partnership Agreement
export interface PartnershipAgreement {
  id: string;
  version: string;
  content: string;
  signatures: {
    issiah: {
      signed: boolean;
      signature_data?: string;
      signed_at?: string;
      ip_address?: string;
    };
    soya: {
      signed: boolean;
      signature_data?: string;
      signed_at?: string;
      ip_address?: string;
    };
  };
  status: "draft" | "pending" | "fully_signed" | "archived";
  created_at: string;
  updated_at: string;
}

// Phase 4: Productivity Milestones
export interface Milestone {
  id: string;
  title: string;
  description: string;
  owner: CoFounder | "both";
  category: "outreach" | "development" | "revenue" | "product" | "operations";
  target_value: number;
  current_value: number;
  unit: string; // "contacts", "features", "hours", etc.
  deadline: string;
  status: "not_started" | "in_progress" | "completed" | "missed";
  completion_percentage: number;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

// Phase 4: Calendar Events
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  event_type: "meeting" | "deadline" | "milestone" | "reminder" | "other";
  start_time: string;
  end_time: string;
  all_day: boolean;
  attendees: CoFounder[];
  location?: string;
  meeting_link?: string;
  related_to?: {
    type: "milestone" | "idea" | "metric";
    id: string;
  };
  reminder_minutes: number; // minutes before event
  status: "scheduled" | "completed" | "cancelled";
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Weekly Tasks
export interface Task {
  id: string;
  owner: CoFounder;
  title: string;
  description?: string;
  due_date: string; // YYYY-MM-DD
  week_of: string; // YYYY-MM-DD (Monday of that week)
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  category?: string; // e.g., "outreach", "development", "marketing"
  metrics_impact?: {
    // When completed, which metrics to increment
    metric_type?: string;
    metric_value?: number;
  };
  completed_at?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}
