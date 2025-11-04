# FocusFencer — Full Project Specification (React Native + TypeScript)

## 🔰 Overview
**FocusFencer** is a premium distraction-blocking productivity app built with React Native and TypeScript. It combines the power of Pomodoro technique with intelligent app blocking to help users achieve deep focus states. With beautiful animations, motivational quotes, and comprehensive session tracking, FocusFencer transforms productivity into an engaging experience.

**Core Philosophy:** Privacy-first, offline-capable, and delightfully smooth.

**Monetization:** Strategic AdMob placement designed to drive conversions to ₹49/month ad-free premium subscription.

---

## 🧩 Core Features
1. **Pomodoro Focus Timer**
   - Custom focus duration (default 25 minutes).
   - Pause/Resume support.
   - Completion sound + vibration alert.

2. **App Blocker (Soft Blocker)**
   - Uses `UsageStatsManager` and `IntentLauncher` to detect & block usage of selected distracting apps during focus mode.
   - Displays “Stay Focused” overlay when blocked apps are opened.

3. **Session Tracker**
   - Logs number of focus sessions, total minutes, and best streak.
   - Local storage via `AsyncStorage`.

4. **Themes & UI**
   - Modern, smooth animations using **Reanimated 3** and **React Native Skia**.
   - 3 themes: Light, Dark, and Neon Focus.
   - Lottie animations and vector icons from Lucide and HeroIcons.

5. **Motivational Quotes**
   - Random quote shown every time a new session starts.
   - JSON file with 100+ local quotes bundled offline.

6. **Ad Integration**
   - Google AdMob: Banner & Rewarded Ads.
   - Rewarded Ad unlocks additional theme.

7. **Offline First**
   - All data saved locally, no backend.

8. **App Protection**
   - Use **ProGuard** + **Hermes engine** for obfuscation.
   - Sign APK with secure debug keystore (Claude handles signing automatically).
   - APK guard instructions for mod-resistance.

---

## 🧱 Tech Stack
- **React Native** (TypeScript)
- **React Navigation v6**
- **React Native Reanimated 3**
- **React Native Skia**
- **React Native AdMob**
- **AsyncStorage**
- **Expo or EAS Build (free bundler)**
- **Lottie React Native** for animations

---

## 📁 Folder Structure
```
FocusFencer/
├── assets/
│   ├── icons/
│   ├── illustrations/
│   ├── lottie/
│   ├── quotes.json
│
├── src/
│   ├── components/
│   │   ├── Timer.tsx
│   │   ├── QuoteBox.tsx
│   │   ├── ThemeSwitcher.tsx
│   │   ├── FocusOverlay.tsx
│   │   └── AdBanner.tsx
│   │
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── StatsScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   ├── SelectAppsScreen.tsx
│   │
│   ├── hooks/
│   │   ├── useTimer.ts
│   │   ├── useFocusBlocker.ts
│   │   └── useTheme.ts
│   │
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── FocusContext.tsx
│   │
│   ├── utils/
│   │   ├── storage.ts
│   │   ├── ads.ts
│   │   ├── quotes.ts
│   │
│   ├── App.tsx
│
├── app.json
├── package.json
├── README.md
└── tsconfig.json
```

---

## 🎨 Design & Style
- **Typography:** Poppins & Inter
- **Color Palette:**
  - Light: `#FFFFFF`, `#F6F6F6`, `#1A1A1A`
  - Dark: `#0E0E0E`, `#1F1F1F`, `#38BDF8`
  - Neon Focus: gradient from `#14B8A6` → `#3B82F6`
- Rounded cards, blur background overlays, soft drop shadows.

---

## 🧠 Features Summary
| Feature | Type | Local/Online | Ad Support |
|----------|------|--------------|-------------|
| Focus Timer | Core | Local | - |
| App Blocker | Core | Local | - |
| Stats Tracking | Add-on | Local | - |
| Themes | UI | Local | Reward Unlock |
| Quotes | Add-on | Local | Banner |
| Ads | Monetization | Online | Yes |

---

## 🛡️ APK Signing & Protection
- Enable **Hermes Engine** for JS performance.
- Add **ProGuard** rules to obfuscate code.
- Set `"android.enableR8=true"` in `gradle.properties`.
- Sign APK automatically with keystore Claude generates.
- Claude should ensure APK cannot be repackaged easily.
- Use obfuscated variable names and minimize assets exposure.

---

## 💰 Monetization Plan
1. **AdMob Banner Ads** – show on Home & Stats screen.
2. **Rewarded Ad** – unlock “Neon Theme” after ad view.
3. **Future Add-on (optional)** – premium unlock (₹49) for ad-free experience.

---

## 🚀 Deployment
- Build with **Expo EAS Build (Free Tier)** or **React Native CLI + Gradle**.
- Package as **Android App Bundle (AAB)** for Play Store upload.
- Follow Play Store policy (no intrusive app blocking).
- Store screenshots & promo illustrations in `/assets/store/`.

---

## 🧭 Claude Instructions
1. Generate **entire project structure** automatically.
2. Download **all icons/illustrations/Lottie files** directly from the internet.
3. If any resource cannot be downloaded automatically, **ask user** before proceeding.
4. Sign, obfuscate, and build production-ready APK/AAB.
5. Integrate free AdMob test ads placeholders (user will replace IDs).
6. Ensure build is lightweight, optimized, smooth, and fully client-based.