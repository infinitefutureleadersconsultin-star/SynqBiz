-- =====================================================
-- SYNQBIZ DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Create users profile table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT CHECK (role IN ('isaiah', 'soya')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- =====================================================
-- ISAIAH'S METRICS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS isaiah_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  date DATE NOT NULL,
  outreach_contacts INTEGER DEFAULT 0,
  meetings_scheduled INTEGER DEFAULT 0,
  partnership_emails INTEGER DEFAULT 0,
  business_concepts INTEGER DEFAULT 0,
  college_outreach INTEGER DEFAULT 0,
  personal_brand_posts INTEGER DEFAULT 0,
  event_host_outreach INTEGER DEFAULT 0,
  enterprise_outreach INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Enable RLS for Isaiah's metrics
ALTER TABLE isaiah_metrics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own metrics" ON isaiah_metrics;
DROP POLICY IF EXISTS "Users can insert own metrics" ON isaiah_metrics;
DROP POLICY IF EXISTS "Users can update own metrics" ON isaiah_metrics;

-- Create policies for Isaiah's metrics
CREATE POLICY "Users can read own metrics"
  ON isaiah_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics"
  ON isaiah_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON isaiah_metrics FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- SOYA'S METRICS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS soya_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  date DATE NOT NULL,
  revenue_milestone NUMERIC DEFAULT 0,
  ui_improvements INTEGER DEFAULT 0,
  user_signups INTEGER DEFAULT 0,
  support_tickets_resolved INTEGER DEFAULT 0,
  app_uptime_percentage NUMERIC(5,2) DEFAULT 0,
  onboarding_completion_rate NUMERIC(5,2) DEFAULT 0,
  feedback_collected INTEGER DEFAULT 0,
  retention_rate NUMERIC(5,2) DEFAULT 0,
  facebook_ads_spent NUMERIC DEFAULT 0,
  features_shipped INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Enable RLS for Soya's metrics
ALTER TABLE soya_metrics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own metrics" ON soya_metrics;
DROP POLICY IF EXISTS "Users can insert own metrics" ON soya_metrics;
DROP POLICY IF EXISTS "Users can update own metrics" ON soya_metrics;

-- Create policies for Soya's metrics
CREATE POLICY "Users can read own metrics"
  ON soya_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics"
  ON soya_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON soya_metrics FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- AUTO-CREATE PROFILE ON USER SIGNUP
-- =====================================================

-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'role'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE 'SynqBiz database setup complete!';
  RAISE NOTICE 'Tables created: profiles, isaiah_metrics, soya_metrics';
  RAISE NOTICE 'Row Level Security enabled on all tables';
  RAISE NOTICE 'Auto-profile creation trigger enabled';
END $$;
