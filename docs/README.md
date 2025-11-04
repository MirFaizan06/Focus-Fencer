# FocusFencer 🎯

A premium distraction-blocking productivity app built with React Native and TypeScript. Combines the Pomodoro technique with intelligent app blocking to help users achieve deep focus states.

## ✨ Features

- **Pomodoro Focus Timer** - Customizable focus sessions with beautiful circular animations
- **App Blocking** - Block distracting apps during focus sessions
- **Session Tracking** - Comprehensive statistics and progress tracking
- **Motivational Quotes** - 100+ inspiring quotes to keep you motivated
- **Multiple Themes** - Light, Dark, and exclusive Neon Focus themes
- **Offline First** - All data stored locally for privacy
- **Ad Monetization** - Strategic AdMob placement to drive premium conversions
- **Auto-Updater** - Automatic update checks via GitHub releases

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**
- **Android Studio** (for Android development)
- **JDK 11** or higher
- **Android SDK** with Android 13 (API 33) or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MirFaizan06/Focus-Fencer.git
   cd Focus-Fencer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install CocoaPods (iOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

## 📱 Running the App

### Android

#### Option 1: Using Android Emulator (Recommended for VS Code)

1. **Open Android Studio**
   - Go to Tools → Device Manager
   - Create a new Virtual Device (recommended: Pixel 5, Android 13)
   - Start the emulator

2. **Run the app**
   ```bash
   npm run android
   # or
   yarn android
   ```

#### Option 2: Using Physical Device

1. **Enable Developer Mode on your Android device**
   - Go to Settings → About Phone → Tap "Build Number" 7 times
   - Enable "USB Debugging" in Developer Options

2. **Connect device via USB**
   ```bash
   adb devices  # Verify device is connected
   npm run android
   ```

### iOS (macOS only)

```bash
npm run ios
# or
yarn ios
```

## 🛠️ VS Code Configuration

### Recommended Extensions

Install these VS Code extensions for the best development experience:

- **React Native Tools** - Microsoft's official React Native extension
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **React-Native/React/Redux snippets**

### Launch Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Android",
      "cwd": "${workspaceFolder}",
      "type": "reactnative",
      "request": "launch",
      "platform": "android"
    },
    {
      "name": "Debug iOS",
      "cwd": "${workspaceFolder}",
      "type": "reactnative",
      "request": "launch",
      "platform": "ios"
    },
    {
      "name": "Attach to packager",
      "cwd": "${workspaceFolder}",
      "type": "reactnative",
      "request": "attach"
    }
  ]
}
```

### Settings Configuration

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 🧪 Testing

### Run Metro Bundler

```bash
npm start
# or
yarn start
```

### Clear Cache (if you encounter issues)

```bash
npm start -- --reset-cache
```

### Debug Menu

- **Android**: Press `Ctrl+M` (Windows/Linux) or `Cmd+M` (Mac)
- **iOS**: Press `Cmd+D`

## 📦 Building for Production

### Android APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be located at:
`android/app/build/outputs/apk/release/app-release.apk`

### Android App Bundle (AAB) for Play Store

```bash
cd android
./gradlew bundleRelease
```

The AAB will be located at:
`android/app/build/outputs/bundle/release/app-release.aab`

### Signing Configuration

Before building for release, generate a keystore:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore android/app/release.keystore -alias focusfencer-key -keyalg RSA -keysize 2048 -validity 10000
```

Then set environment variables or update `android/app/build.gradle`:
- `KEYSTORE_PASSWORD`
- `KEY_ALIAS`
- `KEY_PASSWORD`

## 🎨 Project Structure

```
FocusFencer/
├── assets/
│   └── quotes.json              # 100+ motivational quotes
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Timer.tsx           # Animated circular timer
│   │   ├── QuoteBox.tsx        # Motivational quote display
│   │   ├── ThemeSwitcher.tsx   # Theme selection component
│   │   └── AdBanner.tsx        # AdMob banner component
│   ├── screens/                # App screens
│   │   ├── HomeScreen.tsx      # Main focus timer screen
│   │   ├── StatsScreen.tsx     # Progress tracking
│   │   ├── SettingsScreen.tsx  # App settings
│   │   └── SelectAppsScreen.tsx # App blocking selection
│   ├── context/                # React Context providers
│   │   ├── ThemeContext.tsx    # Theme state management
│   │   └── FocusContext.tsx    # Focus session management
│   ├── hooks/                  # Custom React hooks
│   ├── navigation/             # Navigation configuration
│   ├── theme/                  # Design tokens
│   │   ├── colors.ts          # Color palette
│   │   └── typography.ts      # Typography system
│   ├── utils/                  # Utility functions
│   │   ├── storage.ts         # AsyncStorage wrapper
│   │   ├── quotes.ts          # Quote management
│   │   ├── ads.ts             # AdMob integration
│   │   └── updater.ts         # Auto-update system
│   └── App.tsx                # Main app component
├── android/                    # Android native code
└── ios/                       # iOS native code
```

## 🔧 Configuration

### AdMob Setup

Replace test ad unit IDs in `src/utils/ads.ts` with your actual AdMob IDs:

```typescript
const AD_UNIT_IDS = {
  BANNER_HOME: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  BANNER_STATS: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  REWARDED_THEME: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  INTERSTITIAL_SESSION_END: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
};
```

### GitHub Updates

The app checks for updates from GitHub releases. Ensure your releases include:
- Version tag (e.g., `v1.0.1`)
- Release notes
- APK file attached as an asset

## 🎯 Emulator Recommendations

### Best Android Emulators for VS Code Development

1. **Android Studio Emulator** (Recommended)
   - Best performance and compatibility
   - Integrated with Android SDK
   - Supports all Android features

2. **Genymotion**
   - Fast and lightweight
   - Easy setup
   - Free for personal use

3. **Physical Device** (Best for testing)
   - Real-world performance
   - Actual user experience
   - No emulation overhead

### Android Studio Emulator Setup

1. Open Android Studio
2. Go to Tools → Device Manager
3. Click "Create Device"
4. Select: Pixel 5 (recommended)
5. System Image: Android 13 (API 33) or higher
6. AVD Name: FocusFencer_Test
7. Click "Finish"

## 🐛 Troubleshooting

### Metro Bundler Issues

```bash
# Reset cache
npm start -- --reset-cache

# Clear watchman (macOS/Linux)
watchman watch-del-all

# Remove node_modules
rm -rf node_modules && npm install
```

### Android Build Issues

```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

### Common Errors

#### "Unable to load script"
- Ensure Metro bundler is running (`npm start`)
- Check that the device/emulator can reach the development server

#### "Execution failed for task ':app:installDebug'"
- Check ADB connection: `adb devices`
- Restart ADB: `adb kill-server && adb start-server`

#### "SDK location not found"
- Create `android/local.properties`:
  ```
  sdk.dir=C:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
  ```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

For issues and questions, please use the GitHub Issues page or contact the developer.

## 🌟 Features Roadmap

- [ ] Cloud sync for multi-device support
- [ ] Custom focus sounds
- [ ] Productivity reports and insights
- [ ] Integration with calendar apps
- [ ] Widget support
- [ ] iOS version

---

Built with ❤️ using React Native and TypeScript
