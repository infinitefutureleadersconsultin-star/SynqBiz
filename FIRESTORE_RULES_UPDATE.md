# 🔥 URGENT: Update Firestore Security Rules

## ⚠️ Issue
Your Partnership Agreement and Phase 4 features are failing with:
```
❌ Failed to create agreement: Missing or insufficient permissions
```

**Root Cause**: Firestore security rules don't include Phase 4 collections.

---

## ✅ Fix Instructions

### Step 1: Go to Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Select your **SynqBiz** project
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab at the top

### Step 2: Replace Rules
1. **Delete all existing rules** in the editor
2. **Copy the entire content** from `firestore.rules` file in your project root
3. **Paste** into the Firebase console rules editor
4. Click **Publish** button (top right)
5. Wait for confirmation: "Rules published successfully"

### Step 3: Verify Rules Are Applied
```
✅ Check that rules show:
- partnership_agreements
- ideas
- idea_comments
- milestones
- calendar_events
```

### Step 4: Test Partnership Agreement
1. Reload your app: `https://synq-biz.vercel.app/dashboard/phase4`
2. Click **Partnership Agreement** tab
3. Click **Create Partnership Agreement** button
4. Should see: "✅ Partnership Agreement created successfully!"

---

## 📋 What Changed

### Old Rules (Only 3 collections)
- ✅ users
- ✅ isaiah_metrics
- ✅ soya_metrics

### New Rules (8 collections)
- ✅ users
- ✅ isaiah_metrics
- ✅ soya_metrics
- ✅ **partnership_agreements** ← NEW
- ✅ **ideas** ← NEW
- ✅ **idea_comments** ← NEW
- ✅ **milestones** ← NEW
- ✅ **calendar_events** ← NEW

---

## 🔐 Security Rules Summary

### Partnership Agreements
- ✅ Both co-founders can read all agreements
- ✅ Both co-founders can create agreements
- ✅ Both co-founders can update (sign) agreements

### Think Tank (Ideas)
- ✅ Both co-founders can read, create, vote
- ✅ Only author can delete their own ideas

### Milestones
- ✅ Both co-founders have full access

### Calendar
- ✅ Both co-founders can create/edit/delete events

---

## ⏱️ Estimated Time: 2 minutes

Once published, your Phase 4 features will work immediately!
