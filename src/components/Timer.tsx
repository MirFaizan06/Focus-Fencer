/**
 * Timer Component - Circular animated timer with Reanimated
 */

import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {Canvas, Path, Skia} from '@shopify/react-native-skia';
import {useTheme} from '../context/ThemeContext';
import {typography, spacing} from '../theme/typography';

interface TimerProps {
  timeRemaining: number; // in seconds
  totalTime: number; // in seconds
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export const Timer: React.FC<TimerProps> = ({
  timeRemaining,
  totalTime,
  isPaused,
  onPause,
  onResume,
  onStop,
}) => {
  const {colorScheme} = useTheme();
  const progress = useSharedValue(1);

  useEffect(() => {
    progress.value = withTiming(timeRemaining / totalTime, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, [timeRemaining, totalTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMotivationalText = (): string => {
    const percentage = (timeRemaining / totalTime) * 100;
    if (percentage > 75) return 'Stay strong! 💪';
    if (percentage > 50) return 'You\'re doing great! 🔥';
    if (percentage > 25) return 'Keep pushing! 🚀';
    if (percentage > 10) return 'Almost there! ⭐';
    return 'Final stretch! 🎯';
  };

  return (
    <View style={styles.container}>
      {/* Circular Progress */}
      <View style={styles.timerCircle}>
        <Canvas style={styles.canvas}>
          {/* Background circle */}
          <Path
            path={createCirclePath(150, 150, 120)}
            color={colorScheme.border}
            style="stroke"
            strokeWidth={12}
          />
          {/* Progress circle */}
          <Path
            path={createArcPath(150, 150, 120, progress.value)}
            color={colorScheme.primary}
            style="stroke"
            strokeWidth={12}
            strokeCap="round"
          />
        </Canvas>

        {/* Time Display */}
        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, {color: colorScheme.text}]}>
            {formatTime(timeRemaining)}
          </Text>
          <Text style={[styles.motivationText, {color: colorScheme.textSecondary}]}>
            {getMotivationalText()}
          </Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colorScheme.surface}]}
          onPress={isPaused ? onResume : onPause}>
          <Text style={[styles.buttonText, {color: colorScheme.primary}]}>
            {isPaused ? 'Resume' : 'Pause'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.stopButton, {backgroundColor: colorScheme.error}]}
          onPress={onStop}>
          <Text style={[styles.buttonText, {color: '#FFFFFF'}]}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Helper functions for circular paths
const createCirclePath = (cx: number, cy: number, radius: number): string => {
  const path = Skia.Path.Make();
  path.addCircle(cx, cy, radius);
  return path.toSVGString();
};

const createArcPath = (
  cx: number,
  cy: number,
  radius: number,
  progress: number
): string => {
  const path = Skia.Path.Make();
  const startAngle = -90; // Start from top
  const sweepAngle = progress * 360;

  path.moveTo(cx, cy - radius);
  path.addArc(
    {x: cx - radius, y: cy - radius, width: radius * 2, height: radius * 2},
    startAngle,
    sweepAngle
  );

  return path.toSVGString();
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  timerCircle: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  canvas: {
    width: 300,
    height: 300,
    position: 'absolute',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    ...typography.displayLarge,
    fontSize: 56,
    marginBottom: spacing.sm,
  },
  motivationText: {
    ...typography.bodyLarge,
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  stopButton: {
    marginLeft: spacing.md,
  },
  buttonText: {
    ...typography.labelLarge,
    fontSize: 16,
    fontWeight: '600',
  },
});
