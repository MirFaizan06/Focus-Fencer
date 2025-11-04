/**
 * ThemeSwitcher Component - Beautiful theme toggle
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {ThemeMode} from '../theme/colors';
import {typography, spacing, borderRadius} from '../theme/typography';

interface ThemeSwitcherProps {
  hasUnlockedNeon: boolean;
  onUnlockNeon?: () => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  hasUnlockedNeon,
  onUnlockNeon,
}) => {
  const {theme, setTheme, colorScheme} = useTheme();

  const themes: Array<{value: ThemeMode; label: string; emoji: string}> = [
    {value: 'light', label: 'Light', emoji: '☀️'},
    {value: 'dark', label: 'Dark', emoji: '🌙'},
    {value: 'neon', label: 'Neon Focus', emoji: '⚡'},
  ];

  const handleThemeSelect = (selectedTheme: ThemeMode) => {
    if (selectedTheme === 'neon' && !hasUnlockedNeon) {
      onUnlockNeon?.();
      return;
    }
    setTheme(selectedTheme);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: colorScheme.text}]}>Choose Theme</Text>
      <View style={styles.themesContainer}>
        {themes.map(themeOption => {
          const isLocked = themeOption.value === 'neon' && !hasUnlockedNeon;
          const isSelected = theme === themeOption.value;

          return (
            <TouchableOpacity
              key={themeOption.value}
              style={[
                styles.themeCard,
                {
                  backgroundColor: colorScheme.surface,
                  borderColor: isSelected ? colorScheme.primary : colorScheme.border,
                  borderWidth: isSelected ? 2 : 1,
                },
              ]}
              onPress={() => handleThemeSelect(themeOption.value)}
              disabled={isLocked && !onUnlockNeon}>
              <Text style={styles.emoji}>{themeOption.emoji}</Text>
              <Text style={[styles.themeLabel, {color: colorScheme.text}]}>
                {themeOption.label}
              </Text>
              {isLocked && (
                <Text style={[styles.lockIcon, {color: colorScheme.textSecondary}]}>🔒</Text>
              )}
              {isLocked && onUnlockNeon && (
                <Text style={[styles.unlockText, {color: colorScheme.primary}]}>
                  Watch ad to unlock
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  title: {
    ...typography.titleLarge,
    marginBottom: spacing.md,
  },
  themesContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  themeCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  emoji: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  themeLabel: {
    ...typography.labelLarge,
    textAlign: 'center',
  },
  lockIcon: {
    fontSize: 20,
    marginTop: spacing.xs,
  },
  unlockText: {
    ...typography.labelSmall,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
