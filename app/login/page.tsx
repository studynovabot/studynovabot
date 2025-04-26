"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../lib/firebaseConfig";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const auth = getAuth(app);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: 24, background: "#222", borderRadius: 12 }}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={handleGoogleLogin} style={{ marginTop: 12, background: '#fff', color: '#222', border: '1px solid #ccc', borderRadius: 4, padding: 8, cursor: 'pointer', fontWeight: 500 }}>
        <span style={{ marginRight: 8, fontSize: 20 }}>🔵</span> Sign in with Google
      </button>
      <button onClick={()=>setIsRegister(r=>!r)} style={{ marginTop: 8, background: "none", color: "#1cc592", border: "none", cursor: "pointer" }}>
        {isRegister ? "Already have an account? Login" : "No account? Register"}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </div>
  );
}
