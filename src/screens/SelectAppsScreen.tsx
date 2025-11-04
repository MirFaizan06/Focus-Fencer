/**
 * SelectAppsScreen - Choose apps to block during focus sessions
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';
import {useFocus} from '../context/FocusContext';
import {typography, spacing, borderRadius} from '../theme/typography';

interface App {
  packageName: string;
  appName: string;
  icon: string;
}

interface SelectAppsScreenProps {
  navigation: any;
}

export const SelectAppsScreen: React.FC<SelectAppsScreenProps> = ({navigation}) => {
  const {colorScheme} = useTheme();
  const {settings, updateSettings} = useFocus();
  const [apps, setApps] = useState<App[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>(settings.blockedApps);

  useEffect(() => {
    loadInstalledApps();
  }, []);

  const loadInstalledApps = async () => {
    // This would call native module to get installed apps
    // For now, using mock data
    const mockApps: App[] = [
      {packageName: 'com.instagram.android', appName: 'Instagram', icon: '📷'},
      {packageName: 'com.facebook.katana', appName: 'Facebook', icon: '👥'},
      {packageName: 'com.twitter.android', appName: 'Twitter', icon: '🐦'},
      {packageName: 'com.snapchat.android', appName: 'Snapchat', icon: '👻'},
      {packageName: 'com.google.android.youtube', appName: 'YouTube', icon: '📺'},
      {packageName: 'com.reddit.frontpage', appName: 'Reddit', icon: '🤖'},
      {packageName: 'com.tiktok.android', appName: 'TikTok', icon: '🎵'},
      {packageName: 'com.netflix.mediaclient', appName: 'Netflix', icon: '🎬'},
      {packageName: 'com.spotify.music', appName: 'Spotify', icon: '🎧'},
      {packageName: 'com.whatsapp', appName: 'WhatsApp', icon: '💬'},
    ];
    setApps(mockApps);
  };

  const toggleApp = (packageName: string) => {
    if (selectedApps.includes(packageName)) {
      setSelectedApps(selectedApps.filter(app => app !== packageName));
    } else {
      setSelectedApps([...selectedApps, packageName]);
    }
  };

  const handleSave = async () => {
    await updateSettings({blockedApps: selectedApps});
    Alert.alert('Success', `${selectedApps.length} apps will be blocked during focus sessions.`);
    navigation.goBack();
  };

  const renderAppItem = ({item}: {item: App}) => {
    const isSelected = selectedApps.includes(item.packageName);

    return (
      <TouchableOpacity
        style={[
          styles.appItem,
          {
            backgroundColor: colorScheme.surface,
            borderColor: isSelected ? colorScheme.primary : colorScheme.border,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
        onPress={() => toggleApp(item.packageName)}>
        <View style={styles.appInfo}>
          <Text style={styles.appIcon}>{item.icon}</Text>
          <Text style={[styles.appName, {color: colorScheme.text}]}>{item.appName}</Text>
        </View>
        {isSelected && (
          <View style={[styles.checkmark, {backgroundColor: colorScheme.primary}]}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colorScheme.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, {color: colorScheme.primary}]}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, {color: colorScheme.text}]}>Select Apps to Block</Text>
        <Text style={[styles.subtitle, {color: colorScheme.textSecondary}]}>
          {selectedApps.length} selected
        </Text>
      </View>

      <FlatList
        data={apps}
        renderItem={renderAppItem}
        keyExtractor={item => item.packageName}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, {backgroundColor: colorScheme.primary}]}
          onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Selection</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    ...typography.titleLarge,
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.headlineMedium,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodyMedium,
  },
  list: {
    padding: spacing.lg,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  appIcon: {
    fontSize: 32,
  },
  appName: {
    ...typography.bodyLarge,
    fontWeight: '500',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  saveButtonText: {
    ...typography.titleLarge,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
