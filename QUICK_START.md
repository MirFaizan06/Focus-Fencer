# FocusFencer - Quick Start Guide ⚡

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies (2 min)

```bash
npm install
```

### Step 2: Connect Your Phone (1 min)

1. Enable Developer Mode: Settings → About Phone → Tap "Build Number" 7 times
2. Enable USB Debugging: Settings → Developer Options → USB Debugging
3. Connect phone via USB
4. Allow USB debugging when prompted

### Step 3: Verify Connection (30 sec)

```bash
adb devices
```

Should show your device.

### Step 4: Run the App (2 min)

**Open 2 terminals in VS Code:**

**Terminal 1:**
```bash
npm start
```

**Terminal 2:**
```bash
npm run android
```

**Done!** App installs and launches on your phone.

---

## 🎯 Using VS Code Tasks (Even Easier!)

Press **Ctrl+Shift+P** → Type "Run Task" → Select:
- **"Run on Android Device"** - Builds and runs
- **"Build Debug APK"** - Creates debug APK
- **"Build Release APK"** - Creates release APK
- **"Check Connected Devices"** - Shows connected devices

---

## 📚 Full Guides

For complete instructions, see `docs/` folder:

- **[VSCODE_DEV_GUIDE.md](docs/VSCODE_DEV_GUIDE.md)** - Complete VS Code setup
- **[PHYSICAL_DEVICE_TESTING.md](docs/PHYSICAL_DEVICE_TESTING.md)** - Full testing guide
- **[ADS_AND_BUILD_GUIDE.md](docs/ADS_AND_BUILD_GUIDE.md)** - AdMob & Play Store

---

## 🐛 Quick Troubleshooting

**Device not showing?**
```bash
adb kill-server && adb start-server
adb devices
```

**Build failed?**
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

**App won't connect?**
```bash
npm start -- --reset-cache
```

**Need to reload app?**
- Shake phone → Reload
- Or press 'R' twice in Metro terminal

---

## ✅ Quick Test Checklist

- [ ] App launches on phone
- [ ] Set timer to 1 minute
- [ ] Start session - timer counts down
- [ ] Pause works
- [ ] Stop works
- [ ] Stats update after completion
- [ ] Switch themes (Light/Dark)
- [ ] Navigation works

---

**Everything working?** You're ready to develop! 🎉

**Issues?** Check the full guides in `docs/` folder.
