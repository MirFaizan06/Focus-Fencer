# FocusFencer 🎯

A premium distraction-blocking productivity app built with React Native and TypeScript.

## 🚀 Quick Start (Physical Device Testing)

### Prerequisites
- Node.js 18+
- Your Android phone with USB debugging enabled
- VS Code (no Android Studio needed!)

### Setup in 5 Minutes

```bash
# 1. Install dependencies
npm install

# 2. Connect your phone via USB
# Enable Developer Mode: Settings → About Phone → Tap "Build Number" 7 times
# Enable USB Debugging: Settings → Developer Options → USB Debugging

# 3. Verify phone is connected
npx react-native doctor

# 4. Start development
npm start
# In another terminal:
npm run android
```

## 📚 Complete Documentation

All guides are in the `docs` folder:

- **[VSCODE_DEV_GUIDE.md](docs/VSCODE_DEV_GUIDE.md)** - Complete VS Code development setup
- **[PHYSICAL_DEVICE_TESTING.md](docs/PHYSICAL_DEVICE_TESTING.md)** - Testing on your phone
- **[ADS_AND_BUILD_GUIDE.md](docs/ADS_AND_BUILD_GUIDE.md)** - AdMob setup and APK building
- **[PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)** - Complete project overview
- **[FocusFencer_Project_Spec.md](docs/FocusFencer_Project_Spec.md)** - Technical specifications

## 🎯 Features

- ⏱️ Pomodoro focus timer with animations
- 🚫 App blocking during focus sessions
- 📊 Session tracking and statistics
- 🎨 Three beautiful themes (Light, Dark, Neon)
- 💬 100+ motivational quotes
- 💰 AdMob monetization (₹49/month premium)
- 🔄 Auto-updater via GitHub

## 🛠️ Tech Stack

- React Native 0.73.2 + TypeScript
- React Navigation v6
- React Native Reanimated 3
- Shopify React Native Skia
- AdMob for monetization
- AsyncStorage for local data

## 📱 Testing Workflow

1. Connect phone via USB
2. Run `npm start` in one terminal
3. Run `npm run android` in another terminal
4. App installs and runs on your phone
5. Make code changes - app hot reloads automatically
6. Debug using VS Code (F5)

## 📦 Building for Release

See [docs/ADS_AND_BUILD_GUIDE.md](docs/ADS_AND_BUILD_GUIDE.md) for:
- AdMob setup
- Generating keystore
- Building signed APK
- Publishing to Play Store

---

**Built with ❤️ using React Native + TypeScript**

**Repository:** https://github.com/MirFaizan06/Focus-Fencer
