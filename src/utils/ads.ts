/**
 * AdMob Utility - Manages ad initialization and display
 * Strategic placement to encourage premium subscription conversion
 */

import mobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

// Replace these with your actual AdMob IDs
const AD_UNIT_IDS = {
  BANNER_HOME: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  BANNER_STATS: __DEV__ ? TestIds.BANNER : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  REWARDED_THEME: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  INTERSTITIAL_SESSION_END: __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
};

export const adManager = {
  initialized: false,

  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await mobileAds().initialize();
      this.initialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  },

  getAdUnitId(type: keyof typeof AD_UNIT_IDS): string {
    return AD_UNIT_IDS[type];
  },

  /**
   * Strategic Ad Timing:
   * - Show banner ads on Home and Stats screens (non-intrusive)
   * - Show interstitial after every 3 completed sessions (slightly annoying to drive premium)
   * - Offer rewarded ad to unlock Neon theme (value proposition)
   * - Display premium upgrade prompt after session completion with stats
   */
  shouldShowInterstitial(completedSessions: number): boolean {
    // Show interstitial every 3 sessions to encourage premium upgrade
    return completedSessions > 0 && completedSessions % 3 === 0;
  },

  createRewardedAd(): RewardedAd {
    return RewardedAd.createForAdRequest(AD_UNIT_IDS.REWARDED_THEME);
  },

  async showRewardedAdForTheme(
    onRewarded: () => void,
    onError: (error: Error) => void
  ): Promise<void> {
    const rewarded = this.createRewardedAd();

    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });

    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      console.log('User earned reward:', reward);
      onRewarded();
    });

    rewarded.addAdEventListener(RewardedAdEventType.FAILED_TO_LOAD, error => {
      console.error('Rewarded ad failed to load:', error);
      onError(error);
    });

    rewarded.load();
  },
};

/**
 * Premium Upgrade Messaging Strategy:
 *
 * 1. After 3 sessions: "You're on a roll! 🔥 Upgrade to Premium for an ad-free experience - just ₹49/month"
 * 2. After 7 days: "You've been crushing it for a week! 💪 Remove ads and unlock exclusive features for ₹49/month"
 * 3. On theme selection: "Love this theme? Unlock Neon Focus and go ad-free for just ₹49/month"
 * 4. During interstitial: "Tired of ads? Get Premium for only ₹49/month and focus without interruptions"
 */

export const premiumMessages = [
  {
    title: 'You\'re on a roll! 🔥',
    message: 'Upgrade to Premium for an ad-free experience',
    cta: 'Go Premium - ₹49/month',
  },
  {
    title: 'Focus like a pro 💪',
    message: 'Remove all ads and unlock exclusive themes',
    cta: 'Upgrade Now - ₹49/month',
  },
  {
    title: 'Love FocusFencer? ❤️',
    message: 'Support the app and get an ad-free experience',
    cta: 'Premium - ₹49/month',
  },
  {
    title: 'Unlock Full Potential 🚀',
    message: 'Get all themes, no ads, and exclusive features',
    cta: 'Try Premium - ₹49/month',
  },
];

export const getRandomPremiumMessage = () => {
  return premiumMessages[Math.floor(Math.random() * premiumMessages.length)];
};
