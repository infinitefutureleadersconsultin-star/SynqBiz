import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  Firestore
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Initialize Firebase (singleton pattern)
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (typeof window !== 'undefined') {
  // Client-side initialization
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
}

// Extended user type that matches Supabase user structure
export interface User extends FirebaseUser {
  user_metadata?: {
    name?: string;
    role?: 'isaiah' | 'soya';
  };
}

/**
 * Sign in with email and password
 * Returns Supabase-style { data, error } format
 */
export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Fetch user metadata from Firestore
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    const userData = userDoc.data();

    // Extend user object with metadata to match Supabase structure
    const user: User = {
      ...userCredential.user,
      user_metadata: {
        name: userData?.name || '',
        role: userData?.role || 'isaiah',
      }
    };

    return { data: { user }, error: null };
  } catch (error: any) {
    return { data: { user: null }, error };
  }
}

/**
 * Sign up with email and password
 * Stores name and role in Firestore
 * Returns Supabase-style { data, error } format
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  name: string,
  role: 'isaiah' | 'soya'
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Store user metadata in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      role,
      email,
      created_at: new Date().toISOString(),
    });

    // Extend user object with metadata
    const user: User = {
      ...userCredential.user,
      user_metadata: {
        name,
        role,
      }
    };

    return { data: { user }, error: null };
  } catch (error: any) {
    return { data: { user: null }, error };
  }
}

/**
 * Get current authenticated user
 * Fetches metadata from Firestore
 * Returns User object or null (matches Supabase pattern)
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(null);
        return;
      }

      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribe();

        if (!firebaseUser) {
          resolve(null);
          return;
        }

        try {
          // Fetch user metadata from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data();

          // Extend user object with metadata
          const user: User = {
            ...firebaseUser,
            user_metadata: {
              name: userData?.name || '',
              role: userData?.role || 'isaiah',
            }
          };

          resolve(user);
        } catch (error) {
          console.error('Error fetching user metadata:', error);
          resolve(null);
        }
      });
    });
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Sign out current user
 * Returns { error } format (matches Supabase pattern)
 */
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error };
  }
}

// Export auth and db instances
export { auth, db };
