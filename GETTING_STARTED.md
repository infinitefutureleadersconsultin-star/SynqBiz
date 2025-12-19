# Getting Started with SynqBiz

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Firebase

For detailed Firebase setup, see **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**.

#### Quick Firebase Setup
1. Go to [console.firebase.google.com](https://console.firebase.google.com) and create an account
2. Click "Add project" and follow the wizard
3. Enable **Authentication** → **Email/Password** sign-in method
4. Create a **Firestore Database** in production mode
5. Set up **Firestore security rules** (see FIREBASE_SETUP.md)
6. Get your Firebase config from **Project Settings** → **Your apps** → Web app

### 3. Configure Environment Variables

1. Copy the example env file:
```bash
cp .env.local.example .env.local
```

2. Open `.env.local` and add your Firebase credentials:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
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

**Note**: Firebase automatically handles email verification if enabled

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

- **Firebase Issues**: Check [firebase.google.com/docs](https://firebase.google.com/docs)
- **Deployment**: See the "Deployment" section in README.md
- **Questions**: Review the full documentation in README.md

---

Built with ❤️ for the SponsorSynq team
