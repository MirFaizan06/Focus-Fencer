/**
 * HomeScreen - Main focus timer screen
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';
import {useFocus} from '../context/FocusContext';
import {Timer} from '../components/Timer';
import {QuoteBox} from '../components/QuoteBox';
import {AdBanner} from '../components/AdBanner';
import {quotesManager} from '../utils/quotes';
import {typography, spacing, borderRadius} from '../theme/typography';
import RNHapticFeedback from 'react-native-haptic-feedback';

export const HomeScreen: React.FC = () => {
  const {colorScheme} = useTheme();
  const {
    isInFocusMode,
    isPaused,
    timeRemaining,
    settings,
    startFocusSession,
    pauseFocusSession,
    resumeFocusSession,
    stopFocusSession,
  } = useFocus();

  const [duration, setDuration] = useState(settings.defaultDuration.toString());
  const [currentQuote, setCurrentQuote] = useState(quotesManager.getRandomQuote());

  useEffect(() => {
    if (isInFocusMode) {
      // Refresh quote when session starts
      setCurrentQuote(quotesManager.getRandomQuote());
    }
  }, [isInFocusMode]);

  const handleStartFocus = () => {
    const durationMinutes = parseInt(duration, 10);

    if (isNaN(durationMinutes) || durationMinutes < 1 || durationMinutes > 120) {
      Alert.alert('Invalid Duration', 'Please enter a duration between 1 and 120 minutes.');
      return;
    }

    if (settings.blockedApps.length === 0) {
      Alert.alert(
        'No Apps Selected',
        'Go to Settings to select apps you want to block during focus sessions.',
        [
          {text: 'Later', style: 'cancel'},
          {text: 'Select Apps', onPress: () => {}}, // Navigate to SelectApps
        ]
      );
      return;
    }

    RNHapticFeedback.trigger('impactMedium');
    startFocusSession(durationMinutes, settings.blockedApps);
  };

  const handlePause = () => {
    RNHapticFeedback.trigger('impactLight');
    pauseFocusSession();
  };

  const handleResume = () => {
    RNHapticFeedback.trigger('impactLight');
    resumeFocusSession();
  };

  const handleStop = () => {
    Alert.alert(
      'Stop Session?',
      'Are you sure you want to stop this focus session? Your progress will not be counted.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Stop',
          style: 'destructive',
          onPress: () => {
            RNHapticFeedback.trigger('notificationWarning');
            stopFocusSession(false);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colorScheme.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, {color: colorScheme.text}]}>Focus Fencer</Text>
          <Text style={[styles.subtitle, {color: colorScheme.textSecondary}]}>
            {isInFocusMode ? 'You\'re in the zone 🔥' : 'Ready to focus?'}
          </Text>
        </View>

        {!isInFocusMode ? (
          <>
            {/* Duration Input */}
            <View style={styles.durationContainer}>
              <Text style={[styles.label, {color: colorScheme.text}]}>Focus Duration</Text>
              <View style={styles.durationInputContainer}>
                <TextInput
                  style={[
                    styles.durationInput,
                    {
                      backgroundColor: colorScheme.surface,
                      color: colorScheme.text,
                      borderColor: colorScheme.border,
                    },
                  ]}
                  value={duration}
                  onChangeText={setDuration}
                  keyboardType="number-pad"
                  maxLength={3}
                  placeholder="25"
                  placeholderTextColor={colorScheme.textTertiary}
                />
                <Text style={[styles.durationLabel, {color: colorScheme.textSecondary}]}>
                  minutes
                </Text>
              </View>

              {/* Quick duration buttons */}
              <View style={styles.quickDurations}>
                {[15, 25, 45, 60].map(mins => (
                  <TouchableOpacity
                    key={mins}
                    style={[
                      styles.quickButton,
                      {
                        backgroundColor: colorScheme.surface,
                        borderColor: colorScheme.border,
                      },
                    ]}
                    onPress={() => setDuration(mins.toString())}>
                    <Text style={[styles.quickButtonText, {color: colorScheme.text}]}>
                      {mins}m
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Start Button */}
            <TouchableOpacity
              style={[styles.startButton, {backgroundColor: colorScheme.primary}]}
              onPress={handleStartFocus}>
              <Text style={styles.startButtonText}>Start Focus Session</Text>
            </TouchableOpacity>

            {/* Quote */}
            <QuoteBox quote={currentQuote} />

            {/* Ad Banner */}
            {!settings.isPremium && <AdBanner type="BANNER_HOME" isPremium={settings.isPremium} />}
          </>
        ) : (
          <>
            {/* Active Session */}
            <Timer
              timeRemaining={timeRemaining}
              totalTime={parseInt(duration, 10) * 60}
              isPaused={isPaused}
              onPause={handlePause}
              onResume={handleResume}
              onStop={handleStop}
            />

            {/* Current Quote */}
            <QuoteBox quote={currentQuote} />

            {/* Blocked Apps Count */}
            <View style={[styles.blockedInfo, {backgroundColor: colorScheme.surface}]}>
              <Text style={[styles.blockedText, {color: colorScheme.textSecondary}]}>
                {settings.blockedApps.length} apps blocked
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

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
  durationContainer: {
    marginBottom: spacing.xl,
  },
  label: {
    ...typography.titleMedium,
    marginBottom: spacing.md,
  },
  durationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  durationInput: {
    ...typography.headlineMedium,
    borderWidth: 2,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    textAlign: 'center',
    minWidth: 100,
  },
  durationLabel: {
    ...typography.bodyLarge,
  },
  quickDurations: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  quickButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickButtonText: {
    ...typography.labelMedium,
  },
  startButton: {
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    ...typography.titleLarge,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  blockedInfo: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  blockedText: {
    ...typography.bodyMedium,
  },
});
