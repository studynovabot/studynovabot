# 🧠 StudyNovaBot – AI Assistant for Smarter Learning

Welcome to **StudyNovaBot**, your all-in-one AI-powered study assistant.
Built with **Next.js**, **GROQ**, **Firebase**, and **Replicate**, it's a real-time chatbot that helps with:
- 🧠 Fast Chat (LLaMA3/Mixtral via Groq)
- 🖼️ Image Generation (Stable Diffusion via Replicate)
- 📷 Image OCR + Q&A (Tesseract.js + Gemini Vision)
- 🔐 Login, XP, Leaderboard (Firebase Auth + Firestore)
- ⚡ Deployed on Vercel (Free tier)

---

## 📦 Tech Stack

| Layer           | Tool                             | Purpose                                |
|----------------|----------------------------------|----------------------------------------|
| Text AI Chat   | Groq API (LLaMA3 / Mixtral)      | Ultra-fast natural language chat ⚡     |
| Image Generation | Replicate + Stable Diffusion    | Turn prompts into visuals 🎨           |
| OCR Input      | Tesseract.js + Gemini Vision     | Understands uploaded images 🧠         |
| User Auth/Data | Firebase (Auth + Firestore)      | XP, login, streaks, notes 🔐            |
| Hosting        | Vercel (Free)                    | Deploys your app to the web 🚀          |

---

## ✅ Features

- 💬 Chatbot powered by ultra-fast Groq API
- 🧾 Image input with OCR + Q&A from Gemini/Tesseract
- 🎨 AI image generation from user prompts
- 🧠 Firebase XP system with leaderboard
- 📈 Tracks login, streaks, notes
- 📱 Responsive layout for web/mobile
- 🔓 Publicly hosted on Vercel

---

## 🔧 Setup Guide

1. **Install dependencies**

```bash
npm install
```

2. **Create `.env.local` file**

```env
# Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Groq
GROQ_API_KEY=your-groq-api-key
```

3. **Run the app locally**

```bash
npm run dev
```

4. **Deploy on Vercel** (connect GitHub repo, use `.env.local` values)

---

## 🔥 Shark Tank Pitch Highlights

- **"The fastest schoolbot on earth."**
- Demo live chat and OCR+image use case.
- Show leaderboard tracking XP, notes, and streaks.
- Make AI your co-pilot for smarter study.

---

## 📁 Folder Structure

```
studynovabot/
├── app/
│   ├── dashboard/
│   ├── leaderboard/
│   ├── login/
│   ├── api/
│   │   ├── chat/route.ts
│   │   ├── genImage/route.ts
│   │   └── ocr/route.ts
├── components/
│   ├── chatBox.tsx
│   └── Navbar.tsx
├── lib/ (firebase.ts, groq.ts)
├── public/
├── styles/
├── .env.local
└── README.md
```

---

## 💡 Next Features (optional)

- Voice input
- Calendar sync (e.g. with Google Calendar)
- Notifications or XP rewards
- AI-generated flashcards

---

## 🧪 Tests

Coming soon – test cases for `/api/chat`, OCR input, and image prompt.

---

> Made for 💥 School Shark Tank 💥 with love & LLaMA.