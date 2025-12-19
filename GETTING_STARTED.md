# Getting Started with SynqBiz

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in project details (name, password, region)
4. Wait for the project to be created (~2 minutes)

#### Get Your API Credentials
1. In your Supabase project, go to **Settings → API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **Anon Key** (under "Project API keys" → "anon public")

#### Set Up the Database
1. In Supabase, go to **SQL Editor**
2. Copy the entire contents of `SUPABASE_SETUP.sql` from this repository
3. Paste it into the SQL Editor
4. Click **Run** to execute the script
5. You should see "Success" messages confirming tables were created

### 3. Configure Environment Variables

1. Copy the example env file:
```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Create Your Accounts

1. Click "Sign Up" on the homepage
2. **Isaiah**: Create an account and select the "Isaiah" role
3. **Soya**: Create another account and select the "Soya" role

**Note**: Check your email to verify your account (if email confirmation is enabled in Supabase)

### 6. Start Logging Metrics!

1. Log in to your dashboard
2. Click "+ Log Today's Metrics"
3. Fill in your daily numbers
4. Click "Save Metrics"

That's it! You're now tracking your progress.

---

## What's Next?

- Check out the **Overview Dashboard** to see combined progress
- Visit your **Personal Dashboard** to log metrics specific to your role
- Read the full [README.md](./README.md) for more details

## Need Help?

- **Supabase Issues**: Check [supabase.com/docs](https://supabase.com/docs)
- **Deployment**: See the "Deployment" section in README.md
- **Questions**: Review the full documentation in README.md

---

Built with ❤️ for the SponsorSynq team
