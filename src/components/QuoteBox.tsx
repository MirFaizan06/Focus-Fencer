/**
 * QuoteBox Component - Displays motivational quotes with animations
 */

import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '../context/ThemeContext';
import {typography, spacing, borderRadius} from '../theme/typography';
import {Quote} from '../utils/quotes';

interface QuoteBoxProps {
  quote: Quote;
}

export const QuoteBox: React.FC<QuoteBoxProps> = ({quote}) => {
  const {colorScheme} = useTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    // Entrance animation
    opacity.value = withTiming(1, {duration: 600});
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 100,
    });
  }, [quote]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme.surface,
          borderColor: colorScheme.border,
        },
        animatedStyle,
      ]}>
      <View style={styles.quoteIcon}>
        <Text style={[styles.quoteIconText, {color: colorScheme.primary}]}>"</Text>
      </View>
      <Text style={[styles.quoteText, {color: colorScheme.text}]}>{quote.text}</Text>
      <Text style={[styles.authorText, {color: colorScheme.textSecondary}]}>
        — {quote.author}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    margin: spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quoteIcon: {
    marginBottom: spacing.sm,
  },
  quoteIconText: {
    ...typography.displayMedium,
    fontSize: 48,
    lineHeight: 48,
  },
  quoteText: {
    ...typography.bodyLarge,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  authorText: {
    ...typography.bodyMedium,
    fontSize: 14,
    textAlign: 'right',
  },
});
