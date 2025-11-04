/**
 * Storage Utility - AsyncStorage wrapper with type safety
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FocusSession {
  id: string;
  duration: number; // in seconds
  completedAt: Date;
  wasCompleted: boolean;
  blockedApps: string[];
}

export interface UserStats {
  totalSessions: number;
  completedSessions: number;
  totalMinutes: number;
  currentStreak: number;
  bestStreak: number;
  lastSessionDate: string | null;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'neon';
  defaultDuration: number; // in minutes
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  blockedApps: string[];
  hasUnlockedNeon: boolean;
  isPremium: boolean;
  notificationsEnabled: boolean;
}

const STORAGE_KEYS = {
  SESSIONS: '@focusfencer:sessions',
  STATS: '@focusfencer:stats',
  SETTINGS: '@focusfencer:settings',
  LAST_UPDATE_CHECK: '@focusfencer:lastUpdateCheck',
} as const;

export const storage = {
  // Sessions
  async getSessions(): Promise<FocusSession[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting sessions:', error);
      return [];
    }
  },

  async addSession(session: FocusSession): Promise<void> {
    try {
      const sessions = await this.getSessions();
      sessions.push(session);
      await AsyncStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error adding session:', error);
    }
  },

  async clearSessions(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.SESSIONS);
    } catch (error) {
      console.error('Error clearing sessions:', error);
    }
  },

  // Stats
  async getStats(): Promise<UserStats> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
      return data
        ? JSON.parse(data)
        : {
            totalSessions: 0,
            completedSessions: 0,
            totalMinutes: 0,
            currentStreak: 0,
            bestStreak: 0,
            lastSessionDate: null,
          };
    } catch (error) {
      console.error('Error getting stats:', error);
      return {
        totalSessions: 0,
        completedSessions: 0,
        totalMinutes: 0,
        currentStreak: 0,
        bestStreak: 0,
        lastSessionDate: null,
      };
    }
  },

  async updateStats(stats: UserStats): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  },

  // Settings
  async getSettings(): Promise<AppSettings> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data
        ? JSON.parse(data)
        : {
            theme: 'dark',
            defaultDuration: 25,
            soundEnabled: true,
            vibrationEnabled: true,
            blockedApps: [],
            hasUnlockedNeon: false,
            isPremium: false,
            notificationsEnabled: true,
          };
    } catch (error) {
      console.error('Error getting settings:', error);
      return {
        theme: 'dark',
        defaultDuration: 25,
        soundEnabled: true,
        vibrationEnabled: true,
        blockedApps: [],
        hasUnlockedNeon: false,
        isPremium: false,
        notificationsEnabled: true,
      };
    }
  },

  async updateSettings(settings: Partial<AppSettings>): Promise<void> {
    try {
      const currentSettings = await this.getSettings();
      const newSettings = {...currentSettings, ...settings};
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  },

  // Update checking
  async getLastUpdateCheck(): Promise<number> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATE_CHECK);
      return data ? parseInt(data, 10) : 0;
    } catch (error) {
      console.error('Error getting last update check:', error);
      return 0;
    }
  },

  async setLastUpdateCheck(timestamp: number): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATE_CHECK, timestamp.toString());
    } catch (error) {
      console.error('Error setting last update check:', error);
    }
  },

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
