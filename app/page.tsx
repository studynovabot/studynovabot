'use client';

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app } from "../lib/firebaseConfig";
import { useRouter } from "next/navigation";
import LoginPage from "./login/page";
import ChatUI from "./ChatUI";

export default function Home() {
  const [userChecked, setUserChecked] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setUserChecked(true);
    });
    return unsubscribe;
  }, [router]);

  if (!userChecked) {
    return <div style={{ textAlign: 'center', marginTop: '4rem', color: '#fff' }}>Checking authentication...</div>;
  }
  if (!user) {
    return <LoginPage />;
  }

  return <ChatUI user={user} />;
}