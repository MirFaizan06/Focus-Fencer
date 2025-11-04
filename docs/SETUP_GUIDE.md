# FocusFencer - Complete Setup Guide

This guide will walk you through setting up and running FocusFencer from scratch.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] **Node.js 18+** installed ([Download](https://nodejs.org/))
- [ ] **Android Studio** installed ([Download](https://developer.android.com/studio))
- [ ] **JDK 11+** installed
- [ ] **Git** installed
- [ ] **VS Code** installed (recommended)

## 🚀 Step-by-Step Setup

### Step 1: Install Node.js and npm

1. Download Node.js 18 or higher from [nodejs.org](https://nodejs.org/)
2. Verify installation:
   ```bash
   node --version  # Should show v18.x.x or higher
   npm --version   # Should show 9.x.x or higher
   ```

### Step 2: Install Android Studio

1. Download Android Studio from [developer.android.com](https://developer.android.com/studio)
2. During installation, make sure to install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
3. Set up environment variables:

   **Windows:**
   ```
   ANDROID_HOME = C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
   Add to PATH: %ANDROID_HOME%\platform-tools
   Add to PATH: %ANDROID_HOME%\emulator
   ```

   **macOS/Linux:**
   Add to `~/.bashrc` or `~/.zshrc`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/emulator
   ```

### Step 3: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/MirFaizan06/Focus-Fencer.git
cd Focus-Fencer

# Install dependencies
npm install

# Link assets (if needed)
npx react-native-asset
```

### Step 4: Set Up Android Emulator

#### Option A: Using Android Studio (Recommended)

1. Open Android Studio
2. Click "More Actions" → "Virtual Device Manager"
3. Click "Create Device"
4. Select **Pixel 5** or any phone with Play Store
5. Select System Image: **Android 13 (API 33)** or higher
6. Click "Next" and "Finish"
7. Start the emulator by clicking the Play button

#### Option B: Create AVD via Command Line

```bash
# List available system images
sdkmanager --list | grep system-images

# Install Android 13 system image
sdkmanager "system-images;android-33;google_apis_playstore;x86_64"

# Create AVD
avdmanager create avd -n FocusFencer_Emulator -k "system-images;android-33;google_apis_playstore;x86_64" -d "pixel_5"

# Start emulator
emulator -avd FocusFencer_Emulator
```

### Step 5: Run the App

#### Start Metro Bundler (Terminal 1)

```bash
npm start
# or
yarn start
```

#### Run on Android (Terminal 2)

```bash
# Make sure emulator is running first
npm run android
# or
yarn android
```

The app should now launch on your emulator!

## 🎯 VS Code Setup

### Install Required Extensions

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Install:
   - **React Native Tools** (by Microsoft)
   - **ESLint**
   - **Prettier - Code formatter**
   - **React-Native/React/Redux snippets**
   - **Path Intellisense**

### Enable Debugging

1. Open the Debug panel (Ctrl+Shift+D)
2. Select "Debug Android" from the dropdown
3. Press F5 to start debugging
4. Set breakpoints in your code by clicking next to line numbers

## 🔧 Common Setup Issues

### Issue: "SDK location not found"

**Solution:** Create `android/local.properties`:
```properties
sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
```

### Issue: "Unable to load script"

**Solutions:**
1. Make sure Metro bundler is running (`npm start`)
2. Reset cache: `npm start -- --reset-cache`
3. Check device/emulator is connected: `adb devices`

### Issue: "Execution failed for task ':app:installDebug'"

**Solutions:**
1. Restart ADB: `adb kill-server && adb start-server`
2. Check emulator is running: `adb devices`
3. Clean and rebuild:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

### Issue: Port 8081 already in use

**Solution:**
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8081 | xargs kill
```

## 📱 Testing on Physical Device

### Android Device Setup

1. **Enable Developer Mode:**
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings → System → Developer Options

2. **Enable USB Debugging:**
   - In Developer Options, enable "USB Debugging"

3. **Connect via USB:**
   ```bash
   # Verify device is connected
   adb devices

   # Run the app
   npm run android
   ```

4. **Connect via WiFi (Optional):**
   ```bash
   # First connect via USB, then:
   adb tcpip 5555
   adb connect <device-ip>:5555
   # Now you can disconnect USB
   ```

## 🏗️ Building Production APK

### Development Build (Unsigned)

```bash
cd android
./gradlew assembleDebug
# APK at: android/app/build/outputs/apk/debug/app-debug.apk
```

### Production Build (Signed)

1. **Generate Release Keystore:**
   ```bash
   keytool -genkeypair -v -storetype PKCS12 \
     -keystore android/app/release.keystore \
     -alias focusfencer-key \
     -keyalg RSA -keysize 2048 \
     -validity 10000
   ```

2. **Build Release APK:**
   ```bash
   cd android
   ./gradlew assembleRelease
   # APK at: android/app/build/outputs/apk/release/app-release.apk
   ```

3. **Build Release AAB (for Play Store):**
   ```bash
   cd android
   ./gradlew bundleRelease
   # AAB at: android/app/build/outputs/bundle/release/app-release.aab
   ```

## 🧪 Testing Features

### Test Focus Timer
1. Open the app
2. Set duration (e.g., 1 minute for quick testing)
3. Click "Start Focus Session"
4. Test pause/resume functionality
5. Test stop functionality

### Test App Blocking
1. Go to Settings
2. Click "Blocked Apps"
3. Select apps to block
4. Start a focus session
5. Try opening a blocked app (should show overlay)

### Test Themes
1. Go to Settings
2. Try switching between Light, Dark themes
3. Watch ad to unlock Neon theme (or test with test ads)

### Test Statistics
1. Complete a few focus sessions
2. Go to Stats tab
3. Verify session count, minutes, and streaks are tracked

## 🔄 Auto-Update Configuration

The app checks for updates from GitHub releases. To set this up:

1. Create a release on GitHub with version tag (e.g., `v1.0.1`)
2. Attach the APK file to the release
3. The app will auto-detect and prompt users to update

## 📊 AdMob Configuration

### Get AdMob IDs

1. Create account at [AdMob](https://admob.google.com/)
2. Create a new app
3. Create ad units:
   - Banner (for Home screen)
   - Banner (for Stats screen)
   - Rewarded (for Neon theme unlock)
   - Interstitial (for session end)

### Update Ad IDs

Edit `src/utils/ads.ts`:
```typescript
const AD_UNIT_IDS = {
  BANNER_HOME: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  BANNER_STATS: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  REWARDED_THEME: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  INTERSTITIAL_SESSION_END: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
};
```

## ✅ Verification Checklist

After setup, verify:

- [ ] App launches on emulator without errors
- [ ] Timer starts and counts down correctly
- [ ] Can pause and resume timer
- [ ] Can stop timer
- [ ] Stats are tracked correctly
- [ ] Theme switching works
- [ ] Quotes are displayed
- [ ] Settings can be changed
- [ ] Navigation between tabs works
- [ ] App looks good in both light and dark themes

## 🎉 You're All Set!

Your FocusFencer development environment is now ready. Happy coding!

For more information, check the main [README.md](README.md).
