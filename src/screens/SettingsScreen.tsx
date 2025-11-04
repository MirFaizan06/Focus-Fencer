/**
 * SettingsScreen - App preferences and configuration
 */

import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';
import {useFocus} from '../context/FocusContext';
import {ThemeSwitcher} from '../components/ThemeSwitcher';
import {typography, spacing, borderRadius} from '../theme/typography';
import {adManager} from '../utils/ads';
import {updater} from '../utils/updater';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({navigation}) => {
  const {colorScheme} = useTheme();
  const {settings, updateSettings} = useFocus();

  const handleUnlockNeon = () => {
    Alert.alert(
      'Unlock Neon Theme',
      'Watch a short ad to unlock the exclusive Neon Focus theme!',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Watch Ad',
          onPress: () => {
            adManager.showRewardedAdForTheme(
              () => {
                updateSettings({hasUnlockedNeon: true});
                Alert.alert('Success!', 'Neon Focus theme unlocked! 🎉');
              },
              error => {
                Alert.alert('Error', 'Failed to load ad. Please try again later.');
              }
            );
          },
        },
      ]
    );
  };

  const handleCheckUpdates = () => {
    updater.checkForUpdates('1.0.0', false);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colorScheme.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, {color: colorScheme.text}]}>Settings</Text>
        </View>

        {/* Theme Switcher */}
        <ThemeSwitcher
          hasUnlockedNeon={settings.hasUnlockedNeon}
          onUnlockNeon={handleUnlockNeon}
        />

        {/* Settings Sections */}
        <View style={[styles.section, {backgroundColor: colorScheme.surface}]}>
          <Text style={[styles.sectionTitle, {color: colorScheme.text}]}>Focus Settings</Text>

          <SettingRow
            label="Default Duration"
            value={`${settings.defaultDuration} min`}
            colorScheme={colorScheme}
            onPress={() => {
              // Handle duration picker
            }}
          />

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('SelectApps')}>
            <Text style={[styles.settingLabel, {color: colorScheme.text}]}>Blocked Apps</Text>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, {color: colorScheme.textSecondary}]}>
                {settings.blockedApps.length} apps
              </Text>
              <Text style={[styles.chevron, {color: colorScheme.textSecondary}]}>›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Sound & Vibration */}
        <View style={[styles.section, {backgroundColor: colorScheme.surface}]}>
          <Text style={[styles.sectionTitle, {color: colorScheme.text}]}>
            Notifications
          </Text>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, {color: colorScheme.text}]}>Sound</Text>
            <Switch
              value={settings.soundEnabled}
              onValueChange={value => updateSettings({soundEnabled: value})}
              trackColor={{false: colorScheme.border, true: colorScheme.primary}}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, {color: colorScheme.text}]}>Vibration</Text>
            <Switch
              value={settings.vibrationEnabled}
              onValueChange={value => updateSettings({vibrationEnabled: value})}
              trackColor={{false: colorScheme.border, true: colorScheme.primary}}
            />
          </View>
        </View>

        {/* Premium */}
        {!settings.isPremium && (
          <TouchableOpacity
            style={[styles.premiumButton, {backgroundColor: colorScheme.primary}]}
            onPress={() => {
              // Handle premium purchase
              Alert.alert(
                'Go Premium',
                'Unlock ad-free experience, exclusive themes, and priority support for just ₹49/month!',
                [{text: 'Maybe Later'}, {text: 'Upgrade Now'}]
              );
            }}>
            <Text style={styles.premiumText}>⭐ Upgrade to Premium - ₹49/month</Text>
          </TouchableOpacity>
        )}

        {/* About */}
        <View style={[styles.section, {backgroundColor: colorScheme.surface}]}>
          <Text style={[styles.sectionTitle, {color: colorScheme.text}]}>About</Text>

          <SettingRow
            label="Version"
            value="1.0.0"
            colorScheme={colorScheme}
            onPress={handleCheckUpdates}
          />

          <SettingRow
            label="Check for Updates"
            colorScheme={colorScheme}
            onPress={handleCheckUpdates}
          />

          <SettingRow
            label="Rate on Play Store"
            colorScheme={colorScheme}
            onPress={() => {
              // Handle rate app
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface SettingRowProps {
  label: string;
  value?: string;
  colorScheme: any;
  onPress?: () => void;
}

const SettingRow: React.FC<SettingRowProps> = ({label, value, colorScheme, onPress}) => (
  <TouchableOpacity style={styles.settingRow} onPress={onPress} disabled={!onPress}>
    <Text style={[styles.settingLabel, {color: colorScheme.text}]}>{label}</Text>
    {value && (
      <View style={styles.settingRight}>
        <Text style={[styles.settingValue, {color: colorScheme.textSecondary}]}>{value}</Text>
        {onPress && <Text style={[styles.chevron, {color: colorScheme.textSecondary}]}>›</Text>}
      </View>
    )}
    {!value && onPress && (
      <Text style={[styles.chevron, {color: colorScheme.textSecondary}]}>›</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.headlineLarge,
  },
  section: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.titleMedium,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  settingLabel: {
    ...typography.bodyLarge,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingValue: {
    ...typography.bodyMedium,
  },
  chevron: {
    ...typography.headlineSmall,
    fontSize: 24,
  },
  premiumButton: {
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumText: {
    ...typography.titleLarge,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
