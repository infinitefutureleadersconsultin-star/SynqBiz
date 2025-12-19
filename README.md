# SynqBiz - Co-Founder Accountability Dashboard

A modern accountability dashboard built for SponsorSynq co-founders Isaiah McLean and Soya Diaoune to track progress, metrics, and stay aligned on their journey.

## 🚀 Features (Phase 1)

- ✅ **Dual Authentication**: Separate login for Isaiah (Business) and Soya (Technical)
- ✅ **Personal Dashboards**: Individual metric tracking for each co-founder
- ✅ **Shared Overview**: Combined progress view to stay aligned
- ✅ **Manual Metrics Input**: Clean forms to log daily/weekly progress
- ✅ **Modern UI**: Clean, polished Google Workspace-style design

### Isaiah's Metrics
- Outreach contacts made
- Meetings scheduled
- Partnership emails sent
- Business concepts explored
- College outreach activities
- Personal brand posts
- Event host outreach
- Enterprise outreach

### Soya's Metrics
- Revenue milestones
- User signups
- Features shipped
- Support tickets resolved
- App uptime percentage
- Onboarding completion rate
- Feedback collected
- Retention rate
- Facebook ads spend

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Hosting**: Vercel

## 📦 Installation

1. **Clone the repository**:
```bash
git clone <your-repo-url>
cd SynqBiz
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up Supabase** (see Supabase Setup section below)

4. **Create environment variables**:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Run the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details and wait for setup to complete
4. Go to Project Settings → API to get your credentials

### 2. Create Database Tables

Run these SQL commands in the Supabase SQL Editor (Dashboard → SQL Editor):

```sql
-- Create users profile table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  role TEXT CHECK (role IN ('isaiah', 'soya')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own profile
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create Isaiah's metrics table
CREATE TABLE isaiah_metrics (
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

CREATE POLICY "Users can read own metrics"
  ON isaiah_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics"
  ON isaiah_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON isaiah_metrics FOR UPDATE
  USING (auth.uid() = user_id);

-- Create Soya's metrics table
CREATE TABLE soya_metrics (
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

CREATE POLICY "Users can read own metrics"
  ON soya_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own metrics"
  ON soya_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own metrics"
  ON soya_metrics FOR UPDATE
  USING (auth.uid() = user_id);

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
```

### 3. Configure Authentication

1. In Supabase Dashboard, go to Authentication → Providers
2. Ensure "Email" is enabled
3. Disable email confirmation for testing (optional):
   - Go to Authentication → Email Templates
   - Or set `Confirm email` to OFF in Settings

## 🎯 Usage

### First Time Setup

1. **Create Accounts**:
   - Go to `/signup`
   - Isaiah creates an account and selects "Isaiah" role
   - Soya creates an account and selects "Soya" role

2. **Log Daily Metrics**:
   - Log in to your dashboard
   - Click "+ Log Today's Metrics"
   - Fill in your daily numbers
   - Save!

3. **View Progress**:
   - Personal dashboard shows your individual metrics
   - Overview dashboard shows both co-founders' progress

## 📁 Project Structure

```
SynqBiz/
├── app/
│   ├── dashboard/
│   │   ├── isaiah/          # Isaiah's personal dashboard
│   │   ├── soya/            # Soya's personal dashboard
│   │   ├── overview/        # Shared overview dashboard
│   │   └── layout.tsx       # Dashboard layout with navigation
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── api/
│   │   └── auth/callback/   # Auth callback handler
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   └── dashboard/           # Dashboard-specific components
├── lib/
│   └── supabase.ts          # Supabase client & helpers
├── types/
│   └── index.ts             # TypeScript type definitions
└── middleware.ts            # Route protection middleware
```

## 🔜 Upcoming Features (Phase 2 & 3)

### Phase 2: AI Chat Interface
- Natural language metrics input
- AI-powered calendar scheduling
- Automatic metric updates via chat

### Phase 3: Advanced Features
- Document signing for partnership agreements
- Calendar integration
- Analytics & trend visualization
- Export reports

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

## 🤝 Contributing

This is a private project for Isaiah McLean and Soya Diaoune.

## 📄 License

Private - All Rights Reserved

---

Built with ❤️ for the SponsorSynq team
