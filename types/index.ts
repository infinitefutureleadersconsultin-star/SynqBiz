export type CoFounder = "isaiah" | "soya";

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
