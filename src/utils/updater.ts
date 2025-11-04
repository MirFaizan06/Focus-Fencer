/**
 * Auto-Updater Utility
 * Checks for updates from GitHub releases and notifies users
 */

import axios from 'axios';
import {Alert, Linking, Platform} from 'react-native';
import {storage} from './storage';

const GITHUB_REPO = 'MirFaizan06/Focus-Fencer';
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
const UPDATE_CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours

interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
  }>;
  html_url: string;
}

export const updater = {
  /**
   * Check if an update is available
   */
  async checkForUpdates(currentVersion: string, silent: boolean = false): Promise<void> {
    try {
      // Check if we should check for updates (respect interval)
      const lastCheck = await storage.getLastUpdateCheck();
      const now = Date.now();

      if (!silent && now - lastCheck < UPDATE_CHECK_INTERVAL) {
        console.log('Update check skipped (too soon)');
        return;
      }

      const response = await axios.get<GitHubRelease>(GITHUB_API_URL, {
        timeout: 10000,
      });

      const latestRelease = response.data;
      const latestVersion = latestRelease.tag_name.replace('v', '');

      // Store the check timestamp
      await storage.setLastUpdateCheck(now);

      if (this.isNewerVersion(latestVersion, currentVersion)) {
        this.showUpdateDialog(latestRelease);
      } else if (!silent) {
        Alert.alert('You\'re up to date!', 'You have the latest version of FocusFencer.');
      }
    } catch (error) {
      console.error('Failed to check for updates:', error);
      if (!silent) {
        Alert.alert('Update Check Failed', 'Could not check for updates. Please try again later.');
      }
    }
  },

  /**
   * Compare version strings
   */
  isNewerVersion(latest: string, current: string): boolean {
    const latestParts = latest.split('.').map(Number);
    const currentParts = current.split('.').map(Number);

    for (let i = 0; i < Math.max(latestParts.length, currentParts.length); i++) {
      const latestPart = latestParts[i] || 0;
      const currentPart = currentParts[i] || 0;

      if (latestPart > currentPart) return true;
      if (latestPart < currentPart) return false;
    }

    return false;
  },

  /**
   * Show update available dialog
   */
  showUpdateDialog(release: GitHubRelease): void {
    const apkAsset = release.assets.find(
      asset => asset.name.endsWith('.apk') && Platform.OS === 'android'
    );

    const message = `${release.body}\n\nWould you like to download the update?`;

    Alert.alert(
      `Update Available: ${release.name}`,
      message,
      [
        {
          text: 'Later',
          style: 'cancel',
        },
        {
          text: 'Download',
          onPress: () => {
            if (apkAsset) {
              Linking.openURL(apkAsset.browser_download_url);
            } else {
              Linking.openURL(release.html_url);
            }
          },
        },
      ],
      {cancelable: true}
    );
  },

  /**
   * Open GitHub releases page
   */
  openReleasesPage(): void {
    Linking.openURL(`https://github.com/${GITHUB_REPO}/releases`);
  },
};
