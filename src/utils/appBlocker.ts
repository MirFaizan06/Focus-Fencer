/**
 * App Blocker Utility - Native module bridge
 * Handles app detection and blocking functionality
 */

import {NativeModules, Platform} from 'react-native';

interface AppBlockerModule {
  hasUsageStatsPermission: () => Promise<boolean>;
  requestUsageStatsPermission: () => void;
  getInstalledApps: () => Promise<Array<{packageName: string; appName: string}>>;
  isAppRunning: (packageName: string) => Promise<boolean>;
  getCurrentApp: () => Promise<string | null>;
}

// Get the native module
const AppBlocker: AppBlockerModule | null =
  Platform.OS === 'android' ? NativeModules.AppBlocker : null;

export const appBlocker = {
  /**
   * Check if we have permission to access usage stats
   */
  async hasPermission(): Promise<boolean> {
    if (!AppBlocker) return false;
    try {
      return await AppBlocker.hasUsageStatsPermission();
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  },

  /**
   * Request usage stats permission
   */
  requestPermission(): void {
    if (!AppBlocker) {
      console.warn('AppBlocker module not available');
      return;
    }
    AppBlocker.requestUsageStatsPermission();
  },

  /**
   * Get list of installed apps
   */
  async getInstalledApps(): Promise<Array<{packageName: string; appName: string}>> {
    if (!AppBlocker) return [];
    try {
      return await AppBlocker.getInstalledApps();
    } catch (error) {
      console.error('Error getting installed apps:', error);
      return [];
    }
  },

  /**
   * Check if a specific app is currently running
   */
  async isAppRunning(packageName: string): Promise<boolean> {
    if (!AppBlocker) return false;
    try {
      return await AppBlocker.isAppRunning(packageName);
    } catch (error) {
      console.error('Error checking if app is running:', error);
      return false;
    }
  },

  /**
   * Get the package name of the currently active app
   */
  async getCurrentApp(): Promise<string | null> {
    if (!AppBlocker) return null;
    try {
      return await AppBlocker.getCurrentApp();
    } catch (error) {
      console.error('Error getting current app:', error);
      return null;
    }
  },

  /**
   * Check if any blocked app is running
   */
  async isAnyBlockedAppRunning(blockedApps: string[]): Promise<string | null> {
    if (!AppBlocker || blockedApps.length === 0) return null;

    try {
      const currentApp = await this.getCurrentApp();
      if (currentApp && blockedApps.includes(currentApp)) {
        return currentApp;
      }
      return null;
    } catch (error) {
      console.error('Error checking blocked apps:', error);
      return null;
    }
  },
};
