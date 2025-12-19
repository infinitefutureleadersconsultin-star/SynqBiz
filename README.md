# SynqBiz - Co-Founder Accountability Dashboard

A modern accountability dashboard built for SponsorSynq co-founders Issiah McLean and Soya Diaoune to track progress, metrics, and stay aligned on their journey.

## 🚀 Features (Phase 1)

- ✅ **Dual Authentication**: Separate login for Issiah (Business) and Soya (Technical)
- ✅ **Personal Dashboards**: Individual metric tracking for each co-founder
- ✅ **Shared Overview**: Combined progress view to stay aligned
- ✅ **Manual Metrics Input**: Clean forms to log daily/weekly progress
- ✅ **Modern UI**: Clean, polished Google Workspace-style design

### Issiah's Metrics
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
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
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

3. **Set up Firebase** (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed guide)

4. **Create environment variables**:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Firebase credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. **Run the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔥 Firebase Setup

For detailed Firebase setup instructions, see **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**.

Quick overview:
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Email/Password** authentication
3. Create a **Firestore database** in production mode
4. Set up **Firestore security rules** (see FIREBASE_SETUP.md)
5. Copy your Firebase config to `.env.local`

## 🎯 Usage

### First Time Setup

1. **Create Accounts**:
   - Go to `/signup`
   - Issiah creates an account and selects "Issiah" role
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
│   │   ├── isaiah/          # Issiah's personal dashboard
│   │   ├── soya/            # Soya's personal dashboard
│   │   ├── overview/        # Shared overview dashboard
│   │   └── layout.tsx       # Dashboard layout with navigation
│   ├── login/               # Login page
│   ├── signup/              # Signup page
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
│   └── firebase.ts          # Firebase client & helpers
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
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
5. Deploy!

## 🤝 Contributing

This is a private project for Issiah McLean and Soya Diaoune.

## 📄 License

Private - All Rights Reserved

---

Built with ❤️ for the SponsorSynq team
