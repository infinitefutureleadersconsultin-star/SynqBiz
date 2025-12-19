# Firebase Setup Guide for SynqBiz

This guide walks you through setting up Firebase Authentication and Firestore for the SynqBiz accountability dashboard.

---

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `synqbiz` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**
6. Wait for project creation (~30 seconds)

---

## 2. Enable Firebase Authentication

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click **"Email/Password"**
5. **Enable** the toggle
6. Click **"Save"**

---

## 3. Create Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. **Start in production mode** (we'll add security rules)
4. Choose your preferred location (e.g., `us-central1`)
5. Click **"Enable"**

---

## 4. Set Up Firestore Security Rules

1. In Firestore, go to the **"Rules"** tab
2. Replace the default rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Isaiah's metrics - only authenticated users can read/write their own
    match /isaiah_metrics/{metricId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.user_id;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.user_id;
    }

    // Soya's metrics - only authenticated users can read/write their own
    match /soya_metrics/{metricId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.user_id;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.user_id;
    }
  }
}
```

3. Click **"Publish"**

---

## 5. Get Your Firebase Configuration

1. Click the **⚙️ gear icon** next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"**
4. Click the **web icon (</>) ** to add a web app
5. Register app nickname: `synqbiz-web`
6. **Do NOT** enable Firebase Hosting
7. Click **"Register app"**
8. Copy the `firebaseConfig` object values:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## 6. Add Configuration to Your App

1. Create `.env.local` file in your project root:

```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and add your Firebase config values:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

---

## 7. Firestore Data Structure

Your Firestore database will automatically create these collections when users sign up and log metrics:

### **`users` Collection**
Stores user profile data with custom metadata.

```
users/{userId}
  ├── name: string
  ├── role: "isaiah" | "soya"
  ├── email: string
  └── created_at: timestamp
```

### **`isaiah_metrics` Collection** (Future - Phase 2)
Stores Isaiah's business metrics.

```
isaiah_metrics/{metricId}
  ├── user_id: string
  ├── date: string (YYYY-MM-DD)
  ├── outreach_contacts: number
  ├── meetings_scheduled: number
  ├── partnership_emails: number
  ├── business_concepts: number
  ├── college_outreach: number
  ├── personal_brand_posts: number
  ├── event_host_outreach: number
  ├── enterprise_outreach: number
  ├── notes: string
  ├── created_at: timestamp
  └── updated_at: timestamp
```

### **`soya_metrics` Collection** (Future - Phase 2)
Stores Soya's technical metrics.

```
soya_metrics/{metricId}
  ├── user_id: string
  ├── date: string (YYYY-MM-DD)
  ├── revenue_milestone: number
  ├── ui_improvements: number
  ├── user_signups: number
  ├── support_tickets_resolved: number
  ├── app_uptime_percentage: number
  ├── onboarding_completion_rate: number
  ├── feedback_collected: number
  ├── retention_rate: number
  ├── facebook_ads_spent: number
  ├── features_shipped: number
  ├── notes: string
  ├── created_at: timestamp
  └── updated_at: timestamp
```

---

## 8. Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Go to [http://localhost:3000](http://localhost:3000)
3. Click **"Sign Up"**
4. Create a test account:
   - Name: Isaiah McLean
   - Email: isaiah@test.com
   - Password: test123
   - Role: Isaiah
5. Check Firebase Console:
   - **Authentication** → Users tab → You should see 1 user
   - **Firestore** → Data tab → `users` collection should have 1 document

---

## 9. Production Deployment (Vercel)

When deploying to Vercel, add your Firebase environment variables:

1. Go to Vercel project settings
2. Navigate to **Environment Variables**
3. Add all `NEXT_PUBLIC_FIREBASE_*` variables
4. Redeploy your app

---

## ✅ You're All Set!

Your Firebase setup is complete. Users can now:
- Sign up with email/password
- Log in securely
- Access their personal dashboards
- (Phase 2) Log and view metrics stored in Firestore

---

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Check that you've added all environment variables to `.env.local`
- Restart your dev server: `npm run dev`

### "Missing or insufficient permissions"
- Verify your Firestore security rules are published
- Make sure users are authenticated before accessing Firestore

### "Cannot find module 'firebase/app'"
- Run `npm install firebase`
- Clear Next.js cache: `rm -rf .next`

---

**Need more help?** Check the [Firebase Documentation](https://firebase.google.com/docs/web/setup)
