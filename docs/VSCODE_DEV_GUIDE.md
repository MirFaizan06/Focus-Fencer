# Complete VS Code Development Guide

## 🎯 Full-Fledged Development Using Only VS Code

This guide shows you how to develop FocusFencer entirely within VS Code - no Android Studio required!

## 📋 Prerequisites

### Required Software

1. **Node.js 18+** - [Download](https://nodejs.org/)
2. **VS Code** - [Download](https://code.visualstudio.com/)
3. **JDK 11 or 17** - [Download](https://adoptium.net/)
4. **Android Command Line Tools** (NOT Android Studio!)

### Installing Android Command Line Tools (Without Android Studio)

#### Windows

```bash
# 1. Download SDK Command Line Tools
# Go to: https://developer.android.com/studio#command-tools
# Download "Command line tools only" for Windows

# 2. Create Android SDK directory
mkdir C:\Android\sdk

# 3. Extract downloaded zip to:
# C:\Android\sdk\cmdline-tools\latest\

# 4. Set Environment Variables
# Add these to System Environment Variables:
ANDROID_HOME=C:\Android\sdk
JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.x

# Add to PATH:
%ANDROID_HOME%\cmdline-tools\latest\bin
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
%JAVA_HOME%\bin

# 5. Install required packages
cd C:\Android\sdk\cmdline-tools\latest\bin
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
sdkmanager --licenses
```

#### macOS/Linux

```bash
# 1. Download SDK Command Line Tools
# https://developer.android.com/studio#command-tools

# 2. Create SDK directory
mkdir -p ~/Android/sdk
cd ~/Android/sdk

# 3. Extract downloaded tools
unzip ~/Downloads/commandlinetools-*.zip
mkdir -p cmdline-tools/latest
mv cmdline-tools/* cmdline-tools/latest/

# 4. Add to ~/.zshrc or ~/.bashrc
export ANDROID_HOME=$HOME/Android/sdk
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator

# 5. Install packages
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"
sdkmanager --licenses
```

## 🔌 VS Code Extensions

### Required Extensions

Install these in VS Code (Ctrl+Shift+X):

1. **React Native Tools** (by Microsoft)
   - Debugging
   - IntelliSense
   - Command palette actions

2. **ESLint** (by Microsoft)
   - Code quality checking
   - Auto-fix on save

3. **Prettier - Code formatter** (by Prettier)
   - Consistent code formatting
   - Auto-format on save

4. **TypeScript React code snippets**
   - Quick component creation
   - Common patterns

5. **Path Intellisense**
   - Auto-complete import paths

6. **GitLens** (optional but recommended)
   - Git integration
   - Blame annotations

7. **Error Lens** (optional)
   - Inline error display
   - Better error visibility

### Extension Configuration

Your project already has `.vscode/settings.json` configured with:
- Auto-format on save
- ESLint auto-fix
- TypeScript support
- File exclusions for better performance

## 📱 VS Code Development Workflow

### Method 1: Using VS Code Terminal (Recommended)

1. **Open Integrated Terminal** (Ctrl+`)

2. **Split Terminal** (Click the split icon or Ctrl+Shift+5)

3. **Terminal 1 - Metro Bundler:**
   ```bash
   npm start
   ```

4. **Terminal 2 - Run on Device:**
   ```bash
   npm run android
   ```

### Method 2: Using VS Code Debugger (Advanced)

1. **Connect your phone** via USB

2. **Press F5** or click Run → Start Debugging

3. **Select "Debug Android"** from the dropdown

4. **Set breakpoints** by clicking next to line numbers

5. **Debug features available:**
   - Step through code (F10, F11)
   - Inspect variables
   - Watch expressions
   - Call stack
   - Console output

### Method 3: Using Tasks (Automated)

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Metro",
      "type": "shell",
      "command": "npm start",
      "isBackground": true,
      "problemMatcher": []
    },
    {
      "label": "Run Android",
      "type": "shell",
      "command": "npm run android",
      "dependsOn": ["Start Metro"],
      "problemMatcher": []
    }
  ]
}
```

Then: `Ctrl+Shift+P` → "Tasks: Run Task" → "Run Android"

## 🔧 VS Code Keyboard Shortcuts

### Essential Shortcuts

```
Ctrl+`          - Toggle terminal
Ctrl+Shift+5    - Split terminal
Ctrl+P          - Quick file open
Ctrl+Shift+F    - Search across files
Ctrl+D          - Select next occurrence
Ctrl+/          - Toggle comment
Alt+↑/↓         - Move line up/down
Shift+Alt+↓     - Copy line down
F2              - Rename symbol
F5              - Start debugging
Shift+F5        - Stop debugging
F9              - Toggle breakpoint
F10             - Step over
F11             - Step into
```

### React Native Specific (via Command Palette)

```
Ctrl+Shift+P then type:
- "React Native: Run Android"
- "React Native: Run iOS"
- "React Native: Reload App"
- "React Native: Open Dev Menu"
- "React Native: Run Element Inspector"
```

## 📂 Workspace Organization

### Recommended Folder Structure in VS Code

```
Explorer View (Ctrl+Shift+E):
├── 📁 src/                    ← Main working directory
│   ├── components/
│   ├── screens/
│   ├── context/
│   └── utils/
├── 📁 android/                ← Rarely need to touch
├── 📁 docs/                   ← Documentation
└── 📄 package.json            ← Dependencies
```

### Using VS Code Search Efficiently

**Search for Text:**
- `Ctrl+Shift+F` - Search in all files
- Add file filters: `*.tsx` or `*.ts`

**Search for Files:**
- `Ctrl+P` - Quick open file
- Type partial name: `home` finds `HomeScreen.tsx`

**Search for Symbols:**
- `Ctrl+Shift+O` - Search in current file
- `Ctrl+T` - Search symbols across workspace

## 🐛 Debugging in VS Code

### Setting Up Debugging

Your `.vscode/launch.json` is already configured with:

1. **Debug Android** - Standard debugging
2. **Debug Android (Hermes)** - Direct debugging with Hermes
3. **Attach to packager** - Attach to running Metro
4. **Run Android on Device** - Specific to USB device
5. **Run Android on Emulator** - For emulator use

### How to Debug

1. **Set Breakpoints:**
   - Click left of line number (red dot appears)
   - Or press F9 on the line

2. **Start Debugging:**
   - Press F5
   - Or Run → Start Debugging
   - Or click the green play button

3. **Debug Features:**
   - **Variables Panel** - Inspect current values
   - **Watch Panel** - Track specific expressions
   - **Call Stack** - See function call hierarchy
   - **Debug Console** - Run code in current context

4. **Step Through Code:**
   - F10 - Step over (execute line)
   - F11 - Step into (enter function)
   - Shift+F11 - Step out (exit function)
   - F5 - Continue to next breakpoint

### Debugging Tips

**Console Logging:**
```typescript
console.log('Debug value:', someVariable);
console.error('Error occurred:', error);
console.warn('Warning:', message);
```

**React DevTools:**
```bash
# In Metro terminal, press:
# 'd' - Open developer menu
# 'i' - Toggle inspector
# 'r' - Reload app
```

**Debugging Network Requests:**
- Press 'D' in Metro → Enable "Debug JS Remotely"
- Open Chrome DevTools → Network tab

## 🔄 Hot Reload & Fast Refresh

### Understanding Reload Modes

**Fast Refresh** (Default - Recommended)
- Automatic on file save
- Preserves component state
- Only reloads changed components
- Works with most code changes

**Hot Reload** (Legacy)
- Reloads entire app
- Loses component state
- Enable: Shake device → Enable Hot Reloading

**Live Reload** (Full Reload)
- Completely restarts app
- Use for major changes
- Enable: Shake device → Enable Live Reload

### When to Use Manual Reload

Press 'R' twice in Metro terminal when:
- Adding new native dependencies
- Changing navigation structure
- Modifying Context providers
- Major state management changes

## 📝 Code Snippets in VS Code

### Create Custom Snippets

File → Preferences → User Snippets → typescriptreact.json

```json
{
  "React Native Screen": {
    "prefix": "rnscreen",
    "body": [
      "import React from 'react';",
      "import {View, Text, StyleSheet} from 'react-native';",
      "import {SafeAreaView} from 'react-native-safe-area-context';",
      "import {useTheme} from '../context/ThemeContext';",
      "",
      "export const ${1:ScreenName}: React.FC = () => {",
      "  const {colorScheme} = useTheme();",
      "",
      "  return (",
      "    <SafeAreaView style={[styles.container, {backgroundColor: colorScheme.background}]}>",
      "      <Text style={[styles.text, {color: colorScheme.text}]}>${1:ScreenName}</Text>",
      "    </SafeAreaView>",
      "  );",
      "};",
      "",
      "const styles = StyleSheet.create({",
      "  container: {",
      "    flex: 1,",
      "  },",
      "  text: {",
      "    fontSize: 20,",
      "  },",
      "});",
      ""
    ]
  }
}
```

## 🚀 Performance Optimization in VS Code

### TypeScript Performance

If VS Code becomes slow:

1. **Increase Memory Limit:**
   Settings → `typescript.tsserver.maxTsServerMemory` → 4096

2. **Exclude node_modules:**
   Already configured in `.vscode/settings.json`

3. **Restart TS Server:**
   `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

### File Watching

If file changes aren't detected:

```bash
# Increase file watch limit (Linux/macOS)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## 🧪 Testing in VS Code

### Running Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Run specific test file
npm test -- HomeScreen.test
```

### Test Coverage

```bash
npm test -- --coverage
```

View coverage report in VS Code:
- Install "Coverage Gutters" extension
- Shows coverage inline in editor

## 📊 Git Integration in VS Code

### Using Source Control Panel

1. **View Changes:** Click Source Control icon (Ctrl+Shift+G)
2. **Stage Files:** Click '+' next to file
3. **Commit:** Enter message, click ✓
4. **Push:** Click '...' → Push

### Useful Git Commands in Terminal

```bash
# Check status
git status

# Create branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "Add feature"

# Push to GitHub
git push origin main

# Pull latest
git pull
```

## 🎨 Customizing VS Code for React Native

### Color Theme Recommendations

- **Dark+** (Default) - Good contrast
- **One Dark Pro** - Popular choice
- **Dracula Official** - Easy on eyes
- **Night Owl** - Optimized for React

### File Icon Themes

- **Material Icon Theme** - Recognizable icons
- **vscode-icons** - Comprehensive

### Productivity Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.minimap.enabled": true,
  "editor.suggestSelection": "first",
  "editor.tabSize": 2,
  "files.autoSave": "onFocusChange",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.updateImportsOnFileMove.enabled": "always"
}
```

## 🔍 Troubleshooting in VS Code

### Common Issues

**"Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start -- --reset-cache
```

**"Metro bundler not starting"**
```bash
# Kill existing Metro processes
# Windows:
taskkill /F /IM node.exe

# macOS/Linux:
killall -9 node

# Restart
npm start
```

**"TypeScript errors but code works"**
```bash
# Restart TypeScript server
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

**"VS Code using too much CPU"**
- Disable extensions you don't use
- Exclude large folders in settings
- Restart VS Code

## 📚 Recommended Learning Resources

### VS Code Mastery
- [VS Code Tips & Tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [VS Code Debugging Guide](https://code.visualstudio.com/docs/editor/debugging)

### React Native Development
- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ✅ VS Code Development Checklist

- [ ] All required extensions installed
- [ ] Android SDK command line tools installed
- [ ] Environment variables configured
- [ ] Phone connected and recognized (`adb devices`)
- [ ] Metro bundler starts successfully (`npm start`)
- [ ] App runs on phone (`npm run android`)
- [ ] Hot reload works on file save
- [ ] Debugger attaches successfully (F5)
- [ ] Can set breakpoints and inspect variables
- [ ] Git integration working

## 🎯 Next Steps

Now that VS Code is set up, move to:
- **[PHYSICAL_DEVICE_TESTING.md](PHYSICAL_DEVICE_TESTING.md)** - Complete testing guide
- **[ADS_AND_BUILD_GUIDE.md](ADS_AND_BUILD_GUIDE.md)** - Production build guide

---

**You're now ready for full-fledged VS Code development! 🚀**
