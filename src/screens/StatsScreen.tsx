/**
 * StatsScreen - Session statistics and progress tracking
 */

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';
import {useFocus} from '../context/FocusContext';
import {AdBanner} from '../components/AdBanner';
import {typography, spacing, borderRadius} from '../theme/typography';
import {getRandomPremiumMessage} from '../utils/ads';

export const StatsScreen: React.FC = () => {
  const {colorScheme} = useTheme();
  const {stats, settings} = useFocus();
  const [premiumMessage, setPremiumMessage] = useState(getRandomPremiumMessage());

  useEffect(() => {
    // Refresh premium message when screen is focused
    setPremiumMessage(getRandomPremiumMessage());
  }, []);

  const completionRate =
    stats.totalSessions > 0
      ? Math.round((stats.completedSessions / stats.totalSessions) * 100)
      : 0;

  const averageSessionLength =
    stats.completedSessions > 0
      ? Math.round(stats.totalMinutes / stats.completedSessions)
      : 0;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colorScheme.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, {color: colorScheme.text}]}>Your Progress</Text>
          <Text style={[styles.subtitle, {color: colorScheme.textSecondary}]}>
            Keep up the great work!
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Sessions"
            value={stats.totalSessions.toString()}
            icon="📊"
            colorScheme={colorScheme}
          />
          <StatCard
            title="Completed"
            value={stats.completedSessions.toString()}
            icon="✅"
            colorScheme={colorScheme}
          />
          <StatCard
            title="Total Minutes"
            value={stats.totalMinutes.toString()}
            icon="⏱️"
            colorScheme={colorScheme}
          />
          <StatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            icon="🎯"
            colorScheme={colorScheme}
          />
        </View>

        {/* Streaks */}
        <View style={[styles.streaksContainer, {backgroundColor: colorScheme.surface}]}>
          <View style={styles.streakItem}>
            <Text style={[styles.streakValue, {color: colorScheme.text}]}>
              {stats.currentStreak}
            </Text>
            <Text style={[styles.streakLabel, {color: colorScheme.textSecondary}]}>
              Current Streak 🔥
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.streakItem}>
            <Text style={[styles.streakValue, {color: colorScheme.text}]}>
              {stats.bestStreak}
            </Text>
            <Text style={[styles.streakLabel, {color: colorScheme.textSecondary}]}>
              Best Streak ⭐
            </Text>
          </View>
        </View>

        {/* Insights */}
        <View style={[styles.insightsContainer, {backgroundColor: colorScheme.surface}]}>
          <Text style={[styles.insightsTitle, {color: colorScheme.text}]}>
            📈 Your Insights
          </Text>
          <Text style={[styles.insightText, {color: colorScheme.textSecondary}]}>
            • Average session: {averageSessionLength} minutes
          </Text>
          <Text style={[styles.insightText, {color: colorScheme.textSecondary}]}>
            • You've focused for {Math.floor(stats.totalMinutes / 60)} hours total
          </Text>
          <Text style={[styles.insightText, {color: colorScheme.textSecondary}]}>
            • {stats.currentStreak > 0 ? `On a ${stats.currentStreak} day streak!` : 'Start a streak today!'}
          </Text>
        </View>

        {/* Premium Upsell (if not premium) */}
        {!settings.isPremium && (
          <TouchableOpacity
            style={[styles.premiumCard, {backgroundColor: colorScheme.primary}]}
            onPress={() => {
              // Handle premium purchase
            }}>
            <Text style={styles.premiumTitle}>{premiumMessage.title}</Text>
            <Text style={styles.premiumMessage}>{premiumMessage.message}</Text>
            <View style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>{premiumMessage.cta}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Ad Banner */}
        {!settings.isPremium && <AdBanner type="BANNER_STATS" isPremium={settings.isPremium} />}
      </ScrollView>
    </SafeAreaView>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  colorScheme: any;
}

const StatCard: React.FC<StatCardProps> = ({title, value, icon, colorScheme}) => (
  <View style={[styles.statCard, {backgroundColor: colorScheme.surface}]}>
    <Text style={styles.statIcon}>{icon}</Text>
    <Text style={[styles.statValue, {color: colorScheme.text}]}>{value}</Text>
    <Text style={[styles.statTitle, {color: colorScheme.textSecondary}]}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.headlineLarge,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodyLarge,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.headlineMedium,
    marginBottom: spacing.xs,
  },
  statTitle: {
    ...typography.bodySmall,
    textAlign: 'center',
  },
  streaksContainer: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  streakItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: spacing.md,
  },
  streakValue: {
    ...typography.displayMedium,
    marginBottom: spacing.xs,
  },
  streakLabel: {
    ...typography.bodyMedium,
    textAlign: 'center',
  },
  insightsContainer: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insightsTitle: {
    ...typography.titleLarge,
    marginBottom: spacing.md,
  },
  insightText: {
    ...typography.bodyMedium,
    marginBottom: spacing.sm,
  },
  premiumCard: {
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumTitle: {
    ...typography.headlineSmall,
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  premiumMessage: {
    ...typography.bodyLarge,
    color: '#FFFFFF',
    marginBottom: spacing.lg,
    opacity: 0.9,
  },
  premiumButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  premiumButtonText: {
    ...typography.labelLarge,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
