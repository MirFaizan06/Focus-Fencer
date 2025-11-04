# Complete AdMob Setup & APK Build Guide

## 🎯 From Testing to Play Store - Complete Guide

This guide covers **everything** from AdMob setup to publishing a signed, production-ready APK/AAB.

---

## 📋 Table of Contents

1. [AdMob Account Setup](#1-admob-account-setup)
2. [Getting Ad Unit IDs](#2-getting-ad-unit-ids)
3. [Updating App Configuration](#3-updating-app-configuration)
4. [Generating Release Keystore](#4-generating-release-keystore)
5. [Configuring Signing](#5-configuring-signing)
6. [Building APK/AAB](#6-building-apkaab)
7. [Play Store Submission](#7-play-store-submission)
8. [Premium Subscription Setup](#8-premium-subscription-setup-future)
9. [Monitoring & Optimization](#9-monitoring--optimization)

---

## 1. AdMob Account Setup

### Step 1.1: Create AdMob Account

1. **Go to** [AdMob](https://admob.google.com/)
2. **Sign in** with your Google account
3. **Click "Get Started"**
4. **Accept** terms and conditions
5. **Select your country**
6. **Choose timezone**

### Step 1.2: Add Your App

1. **Click "Apps"** in left sidebar
2. **Click "Add App"**
3. **Select platform:** Android
4. **Is your app published on Play Store?**
   - Select **"No"** (since you haven't published yet)
5. **Enter app name:** Focus Fencer
6. **Select category:** Productivity
7. **Click "Add"**

**Save your AdMob App ID:**
```
ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY
```

### Step 1.3: Set Up Payment Information

1. **Go to** Payments → Payments info
2. **Enter** your payment details
   - Bank account information
   - Tax information
   - Address
3. **Verify** your account

**Note:** You need to earn $100 before first payout.

---

## 2. Getting Ad Unit IDs

### Step 2.1: Create Banner Ad Unit

1. **Click "Apps"** → Select "Focus Fencer"
2. **Click "Ad units"** tab
3. **Click "Add ad unit"**
4. **Select "Banner"**
5. **Configure:**
   - Ad unit name: `Home Banner`
   - Advanced settings:
     - COPPA: No (unless targeting children)
     - Ad filtering: Enable family-safe ads only
6. **Click "Create ad unit"**
7. **Copy Ad unit ID:**
   ```
   ca-app-pub-XXXXXXXXXXXXXXXX/1111111111
   ```

### Step 2.2: Create Second Banner

Repeat for Stats screen:
- Name: `Stats Banner`
- Ad unit ID: `ca-app-pub-XXXXXXXXXXXXXXXX/2222222222`

### Step 2.3: Create Rewarded Ad Unit

1. **Click "Add ad unit"**
2. **Select "Rewarded"**
3. **Configure:**
   - Name: `Neon Theme Unlock`
   - Reward:
     - Reward amount: 1
     - Reward item: theme
4. **Click "Create ad unit"**
5. **Copy Ad unit ID:**
   ```
   ca-app-pub-XXXXXXXXXXXXXXXX/3333333333
   ```

### Step 2.4: Create Interstitial Ad Unit

1. **Click "Add ad unit"**
2. **Select "Interstitial"**
3. **Configure:**
   - Name: `Session Complete`
4. **Click "Create ad unit"**
5. **Copy Ad unit ID:**
   ```
   ca-app-pub-XXXXXXXXXXXXXXXX/4444444444
   ```

### Your Ad Unit IDs Summary

Save these in a text file:

```
AdMob App ID: ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY
Home Banner: ca-app-pub-XXXXXXXXXXXXXXXX/1111111111
Stats Banner: ca-app-pub-XXXXXXXXXXXXXXXX/2222222222
Rewarded Ad: ca-app-pub-XXXXXXXXXXXXXXXX/3333333333
Interstitial Ad: ca-app-pub-XXXXXXXXXXXXXXXX/4444444444
```

---

## 3. Updating App Configuration

### Step 3.1: Update AndroidManifest.xml

**File:** `android/app/src/main/AndroidManifest.xml`

Find this line (around line 26):

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-3940256099942544~3347511713"/>
```

**Replace with YOUR AdMob App ID:**

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"/>
```

### Step 3.2: Update Ad Unit IDs in Code

**File:** `src/utils/ads.ts`

Find this section (around line 13):

```typescript
const AD_UNIT_IDS = {
  BANNER_HOME: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  BANNER_STATS: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  REWARDED_THEME: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  INTERSTITIAL_SESSION_END: __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
};
```

**Replace with YOUR ad unit IDs:**

```typescript
const AD_UNIT_IDS = {
  BANNER_HOME: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/1111111111',
  BANNER_STATS: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/2222222222',
  REWARDED_THEME: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-XXXXXXXXXXXXXXXX/3333333333',
  INTERSTITIAL_SESSION_END: __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/4444444444',
};
```

**Important:** The `__DEV__` check means:
- **Development:** Uses test ads (always shows test ads while developing)
- **Production:** Uses real ads (only in release builds)

### Step 3.3: Test with Test Ads

```bash
# Build and install debug version (uses test ads)
npm run android
```

**You should see:**
- Test ads display
- Banner says "Test Ad" at top
- This is normal for debug builds

**Real ads only show in:**
- Release builds
- After app is published to Play Store
- May take 24-48 hours to show after first publish

---

## 4. Generating Release Keystore

### What is a Keystore?

A keystore is used to **sign your APK**. Think of it as your app's "signature" that:
- Proves you're the real developer
- Required for Play Store
- Used for all future updates
- **NEVER LOSE THIS FILE!**

### Step 4.1: Generate Keystore

**Open Terminal in VS Code:**

```bash
cd android/app

keytool -genkeypair -v -storetype PKCS12 \
  -keystore release.keystore \
  -alias focusfencer-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Windows (Command Prompt):**

```bash
cd android\app

keytool -genkeypair -v -storetype PKCS12 -keystore release.keystore -alias focusfencer-key -keyalg RSA -keysize 2048 -validity 10000
```

### Step 4.2: Enter Information

You'll be asked:

```
Enter keystore password:
Re-enter new password:
```

**Choose a STRONG password!** Example: `FocusFencer@2024!Secure`

**IMPORTANT:** Write this down somewhere safe!

Then you'll be asked:

```
What is your first and last name?
  [Unknown]:  Faizan Mir

What is the name of your organizational unit?
  [Unknown]:  Development

What is the name of your organization?
  [Unknown]:  FocusFencer

What is the name of your City or Locality?
  [Unknown]:  Your City

What is the name of your State or Province?
  [Unknown]:  Your State

What is the two-letter country code for this unit?
  [Unknown]:  IN
```

**Then confirm:**

```
Is CN=Faizan Mir, OU=Development, O=FocusFencer, L=Your City, ST=Your State, C=IN correct?
  [no]:  yes
```

**Enter key password:** (Press Enter to use same as keystore)

### Step 4.3: Verify Keystore Created

```bash
ls android/app/
# Should see: release.keystore
```

### Step 4.4: BACKUP YOUR KEYSTORE

**CRITICAL:** Copy `release.keystore` to multiple safe locations:

1. **External hard drive**
2. **Cloud storage** (Google Drive, Dropbox)
3. **USB drive**
4. **Email to yourself**

**Why?**
- If you lose this, you **CANNOT** update your app on Play Store
- You'll have to publish as a completely new app
- Users will lose all data

---

## 5. Configuring Signing

### Step 5.1: Create gradle.properties

**File:** `android/gradle.properties`

**Add these lines at the end:**

```properties
# Release keystore configuration
FOCUSFENCER_RELEASE_STORE_FILE=release.keystore
FOCUSFENCER_RELEASE_KEY_ALIAS=focusfencer-key
FOCUSFENCER_RELEASE_STORE_PASSWORD=YOUR_KEYSTORE_PASSWORD
FOCUSFENCER_RELEASE_KEY_PASSWORD=YOUR_KEY_PASSWORD
```

**Replace:**
- `YOUR_KEYSTORE_PASSWORD` with your actual keystore password
- `YOUR_KEY_PASSWORD` with your key password (usually the same)

**Example:**

```properties
FOCUSFENCER_RELEASE_STORE_FILE=release.keystore
FOCUSFENCER_RELEASE_KEY_ALIAS=focusfencer-key
FOCUSFENCER_RELEASE_STORE_PASSWORD=FocusFencer@2024!Secure
FOCUSFENCER_RELEASE_KEY_PASSWORD=FocusFencer@2024!Secure
```

### Step 5.2: Update .gitignore

**IMPORTANT:** Don't commit passwords to git!

**File:** `.gitignore`

Add:

```
# Keystore and credentials
*.keystore
!debug.keystore
android/gradle.properties
```

### Step 5.3: Verify build.gradle

**File:** `android/app/build.gradle`

This is already configured! The signing config around line 30:

```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
    release {
        storeFile file('release.keystore')
        storePassword System.getenv("KEYSTORE_PASSWORD") ?: project.findProperty("FOCUSFENCER_RELEASE_STORE_PASSWORD")
        keyAlias System.getenv("KEY_ALIAS") ?: project.findProperty("FOCUSFENCER_RELEASE_KEY_ALIAS")
        keyPassword System.getenv("KEY_PASSWORD") ?: project.findProperty("FOCUSFENCER_RELEASE_KEY_PASSWORD")
    }
}
```

This reads from:
1. Environment variables (if set)
2. gradle.properties file (fallback)

---

## 6. Building APK/AAB

### Understanding Build Types

**Debug Build:**
- For testing
- Uses test ads
- Larger file size
- Not optimized
- Quick to build

**Release Build:**
- For Play Store
- Uses real ads
- Smaller file size
- Fully optimized with ProGuard/R8
- Takes longer to build
- **Signed with your keystore**

### Step 6.1: Build Debug APK (Testing)

**For quick testing on devices:**

```bash
cd android
./gradlew assembleDebug
cd ..
```

**Output:** `android/app/build/outputs/apk/debug/app-debug.apk`

**Install on phone:**

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Step 6.2: Build Release APK (Sharing)

**For sharing with testers before Play Store:**

```bash
cd android
./gradlew assembleRelease
cd ..
```

**First time:** Takes 10-15 minutes (ProGuard optimization)

**Subsequent builds:** 3-5 minutes

**Output:** `android/app/build/outputs/apk/release/app-release.apk`

**Size:** ~15-20 MB (optimized!)

### Step 6.3: Build AAB (Play Store)

**For Play Store submission (REQUIRED):**

```bash
cd android
./gradlew bundleRelease
cd ..
```

**Output:** `android/app/build/outputs/bundle/release/app-release.aab`

**Size:** ~12-15 MB

**Why AAB?**
- Required by Play Store
- Smaller download size for users
- Optimized per-device
- Dynamic delivery support

### Step 6.4: Testing Release Build

**Install release APK on your phone:**

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

**Test that:**
- ✅ App launches
- ✅ All features work
- ✅ No crashes
- ✅ Ads show (may take 24-48 hours)
- ✅ Performance is smooth

### Step 6.5: Verify Signing

**Check APK is signed:**

```bash
jarsigner -verify -verbose -certs android/app/build/outputs/apk/release/app-release.apk
```

**Should see:**
```
jar verified.
```

---

## 7. Play Store Submission

### Step 7.1: Create Developer Account

1. **Go to** [Google Play Console](https://play.google.com/console)
2. **Sign in** with Google account
3. **Pay** $25 one-time registration fee
4. **Complete** developer profile
5. **Verify** email and identity

### Step 7.2: Prepare Store Assets

**Required Assets:**

**1. App Icon** (512x512 PNG)
- Use [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)
- Upload icon
- Download generated assets
- Replace in `android/app/src/main/res/mipmap-*/`

**2. Feature Graphic** (1024x500 PNG)
- Create in Canva/Photoshop
- Show app name and key feature
- Example: "FocusFencer - Beat Distractions, Boost Productivity"

**3. Screenshots** (at least 2, max 8)
- Phone screenshots (min 320px, max 3840px)
- Recommended: 1080x1920 or 1440x2560
- Show:
  - Home screen with timer
  - Stats screen
  - Settings screen
  - Dark theme
  - Light theme

**Tool to capture screenshots:**

```bash
# Connect phone and run app
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png

# Or use Android Studio: View → Tool Windows → Logcat → Camera icon
```

**4. Short Description** (80 characters max)
```
Beat distractions with Pomodoro timer and smart app blocking
```

**5. Full Description** (4000 characters max)

```
🎯 FocusFencer - Your Ultimate Productivity Companion

Take control of your time and eliminate distractions with FocusFencer, the powerful productivity app that combines the proven Pomodoro Technique with intelligent app blocking.

⏱️ SMART FOCUS TIMER
• Customizable Pomodoro sessions (15, 25, 45, or 60 minutes)
• Pause and resume functionality
• Smooth circular progress animations
• Completion notifications with sound and vibration

🚫 INTELLIGENT APP BLOCKING
• Block distracting apps during focus sessions
• Select which apps to block
• Soft blocking approach
• Stay focused without temptation

📊 PROGRESS TRACKING
• Track total focus time and sessions
• Monitor completion rates
• Build and maintain streaks
• Detailed statistics and insights

🎨 BEAUTIFUL THEMES
• Light theme for daytime productivity
• Dark theme for night sessions
• Premium Neon Focus theme
• Smooth transitions between themes

💬 MOTIVATIONAL QUOTES
• 100+ inspiring quotes
• New quote every session
• Stay motivated and inspired

🔒 PRIVACY FIRST
• All data stored locally on your device
• No account required
• No tracking or analytics
• Your data stays yours

✨ PREMIUM FEATURES
• Ad-free experience for just ₹49/month
• Unlock exclusive Neon theme
• Support development
• Priority support

Whether you're a student preparing for exams, a professional working from home, or anyone looking to boost productivity, FocusFencer helps you:

✅ Stay focused during work/study sessions
✅ Build consistent productivity habits
✅ Track your progress over time
✅ Eliminate smartphone distractions
✅ Achieve your goals faster

PERFECT FOR:
• Students studying for exams
• Remote workers
• Freelancers
• Writers and creatives
• Anyone wanting to improve focus

Download FocusFencer now and start building better productivity habits today!

---

Having issues? Contact: your.email@example.com
Privacy Policy: https://your-website.com/privacy
```

### Step 7.3: Create App in Play Console

1. **Click "Create app"**
2. **Enter details:**
   - App name: Focus Fencer
   - Default language: English
   - App or game: App
   - Free or paid: Free
3. **Declarations:**
   - Privacy policy URL: (create one - see below)
   - Check declarations
4. **Click "Create app"**

### Step 7.4: Upload AAB

1. **Go to** Production → Create new release
2. **Upload** `app-release.aab`
3. **Enter release notes:**

```
🎉 Initial Release - FocusFencer v1.0.0

Features:
• Pomodoro focus timer with beautiful animations
• Block distracting apps during sessions
• Track your productivity stats and streaks
• Three gorgeous themes (Light, Dark, Neon)
• 100+ motivational quotes
• Completely offline and privacy-focused

Start your productivity journey today!
```

4. **Click "Save"** (don't submit yet)

### Step 7.5: Complete Store Listing

**Go through each section in left sidebar:**

**Main store listing:**
- Upload icon, feature graphic, screenshots
- Enter descriptions (short and full)

**App category:**
- Category: Productivity
- Tags: focus, productivity, pomodoro, timer

**Content rating:**
- Complete questionnaire
- Should get "E - Everyone"

**Target audience:**
- Ages: 13+

**Data safety:**
- Collects data: No
- Shares data: No
- All data encrypted: Yes (locally stored)

**App content:**
- Ads: Yes
- In-app purchases: Yes (premium subscription)
- Complete other declarations

**Privacy policy:**
- URL: Create privacy policy (see template below)

### Step 7.6: Submit for Review

1. **Review all sections** (check mark next to each)
2. **Go to Production**
3. **Click "Send for review"**
4. **Review can take 1-7 days**

### Step 7.7: Privacy Policy Template

Create a simple webpage with:

```markdown
# Privacy Policy for FocusFencer

Last updated: [Date]

## Data Collection

FocusFencer does NOT collect, store, or share any personal data. All app data is stored locally on your device.

## Local Storage

The app stores the following data locally:
- Focus session history
- App preferences and settings
- Selected themes
- Blocked app list

This data never leaves your device.

## Third-Party Services

The app uses Google AdMob for advertisements. AdMob may collect anonymous usage data. See Google's privacy policy: https://policies.google.com/privacy

## Contact

For questions about privacy, contact: your.email@example.com
```

Host on:
- GitHub Pages (free)
- Your own website
- Google Sites (free)

---

## 8. Premium Subscription Setup (Future)

### Step 8.1: Google Play Billing Setup

**When ready to add ₹49/month subscription:**

1. **In Play Console** → Monetization → Subscriptions
2. **Click "Create subscription"**
3. **Configure:**
   - Product ID: `premium_monthly`
   - Name: FocusFencer Premium
   - Description: Ad-free experience with exclusive features
   - Price: ₹49/month
   - Free trial: 7 days (optional)

### Step 8.2: Install Billing Library

```bash
npm install react-native-iap
```

### Step 8.3: Implement In-App Purchase

**Create:** `src/utils/billing.ts`

```typescript
import {
  initConnection,
  purchaseUpdatedListener,
  getSubscriptions,
  requestSubscription,
  finishTransaction,
} from 'react-native-iap';

const SUBSCRIPTION_SKU = 'premium_monthly';

export const billingManager = {
  async initialize() {
    await initConnection();
    // Set up listener for purchases
  },

  async purchasePremium() {
    try {
      await requestSubscription({
        sku: SUBSCRIPTION_SKU,
      });
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  },

  async checkPremiumStatus() {
    // Check if user has active subscription
  },
};
```

**Full implementation guide:** [React Native IAP docs](https://github.com/dooboolab/react-native-iap)

---

## 9. Monitoring & Optimization

### Step 9.1: Monitor AdMob Performance

**In AdMob Console:**

1. **Dashboard** - Overview of earnings
2. **Reports** - Detailed analytics
3. **Optimize** - Improve ad performance

**Key Metrics:**
- **eCPM** - Earnings per 1000 impressions
- **Fill Rate** - How often ads show
- **CTR** - Click-through rate
- **Revenue** - Total earnings

### Step 9.2: Optimize Ad Placement

**Based on data, adjust:**

**src/utils/ads.ts:**

```typescript
shouldShowInterstitial(completedSessions: number): boolean {
  // Experiment with frequency
  // Currently every 3 sessions
  // Try: every 5 sessions if CTR is low
  return completedSessions > 0 && completedSessions % 5 === 0;
}
```

### Step 9.3: A/B Test Premium Pricing

**Test different prices:**
- ₹49/month (current)
- ₹39/month (might increase conversions)
- ₹99/month (premium positioning)
- ₹299/year (annual discount)

### Step 9.4: Monitor Play Store Metrics

**In Play Console:**

1. **Statistics** - Installs, uninstalls, ratings
2. **User feedback** - Reviews and ratings
3. **Crashes & ANRs** - App stability
4. **Performance** - Load times, battery usage

**Key Metrics:**
- **Install rate** - % of people who install after seeing listing
- **Retention** - % users who return
- **Crash rate** - Should be < 1%
- **Rating** - Aim for 4.0+

---

## 10. Monetization Strategy

### Revenue Projections

**Assumptions:**
- 10,000 downloads in first 3 months
- 20% daily active users (2,000)
- 5% convert to premium (100 users)
- eCPM: ₹50 (average for India)

**Ad Revenue:**
- 2,000 users × 3 sessions/day = 6,000 sessions
- 6,000 sessions × 3 ad impressions = 18,000 impressions/day
- 18,000 × (₹50/1000) = ₹900/day
- **Monthly: ₹27,000**

**Premium Revenue:**
- 100 users × ₹49 = **₹4,900/month**

**Total Projected: ₹31,900/month** (after 10K downloads)

### Optimization Tips

**To Increase Ad Revenue:**
1. Increase daily active users (marketing)
2. Increase sessions per user (better UX)
3. Optimize ad placement (higher eCPM)
4. Geographic targeting (higher paying regions)

**To Increase Premium Conversions:**
1. Show value clearly (stats, themes, ad-free)
2. Free trial (7 days)
3. Limited time offers
4. Social proof (user testimonials)

---

## ✅ Final Checklist

Before publishing:

**Code:**
- [ ] All test AdMob IDs replaced with real ones
- [ ] AdMob App ID in AndroidManifest.xml
- [ ] No console.log statements (or use __DEV__ check)
- [ ] All features tested on release build

**Keystore:**
- [ ] Release keystore generated
- [ ] Keystore backed up (3+ locations)
- [ ] Passwords saved securely
- [ ] gradle.properties configured

**Build:**
- [ ] AAB built successfully
- [ ] AAB signed with release keystore
- [ ] APK tested on multiple devices
- [ ] No crashes or critical bugs
- [ ] Ads showing in production

**Play Store:**
- [ ] Developer account created
- [ ] All store assets prepared
- [ ] Privacy policy published
- [ ] App listing completed
- [ ] Content rating obtained
- [ ] AAB uploaded
- [ ] Release notes written

**Post-Launch:**
- [ ] Monitor crash reports
- [ ] Respond to user reviews
- [ ] Track AdMob revenue
- [ ] Plan next features
- [ ] Market the app

---

## 🎉 Congratulations!

You now have a complete, production-ready, monetized app!

**Your journey:**
✅ Built complete React Native app
✅ Tested on physical device
✅ Set up AdMob monetization
✅ Generated signed release build
✅ Ready for Play Store

**Next steps:**
1. Submit to Play Store
2. Market your app
3. Monitor performance
4. Iterate based on feedback
5. Add premium subscription
6. Build iOS version

**Good luck with your launch! 🚀**

---

**Need help?** Check other guides:
- [VSCODE_DEV_GUIDE.md](VSCODE_DEV_GUIDE.md)
- [PHYSICAL_DEVICE_TESTING.md](PHYSICAL_DEVICE_TESTING.md)
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
