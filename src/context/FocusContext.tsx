/**
 * Focus Context - Manages focus sessions and app blocking state
 */

import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {storage, FocusSession, UserStats, AppSettings} from '../utils/storage';
import {v4 as uuidv4} from 'react-native-uuid';

interface FocusContextType {
  // State
  isInFocusMode: boolean;
  isPaused: boolean;
  timeRemaining: number; // in seconds
  currentSession: FocusSession | null;
  stats: UserStats;
  settings: AppSettings;
  blockedApps: string[];

  // Actions
  startFocusSession: (duration: number, apps: string[]) => void;
  pauseFocusSession: () => void;
  resumeFocusSession: () => void;
  stopFocusSession: (wasCompleted: boolean) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  refreshStats: () => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [isInFocusMode, setIsInFocusMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentSession, setCurrentSession] = useState<FocusSession | null>(null);
  const [stats, setStats] = useState<UserStats>({
    totalSessions: 0,
    completedSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
    bestStreak: 0,
    lastSessionDate: null,
  });
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'dark',
    defaultDuration: 25,
    soundEnabled: true,
    vibrationEnabled: true,
    blockedApps: [],
    hasUnlockedNeon: false,
    isPremium: false,
    notificationsEnabled: true,
  });
  const [blockedApps, setBlockedApps] = useState<string[]>([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isInFocusMode && !isPaused && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Session completed
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInFocusMode, isPaused, timeRemaining]);

  const loadInitialData = async () => {
    const [loadedStats, loadedSettings] = await Promise.all([
      storage.getStats(),
      storage.getSettings(),
    ]);
    setStats(loadedStats);
    setSettings(loadedSettings);
    setBlockedApps(loadedSettings.blockedApps);
  };

  const startFocusSession = (duration: number, apps: string[]) => {
    const session: FocusSession = {
      id: uuidv4() as string,
      duration: duration * 60, // convert to seconds
      completedAt: new Date(),
      wasCompleted: false,
      blockedApps: apps,
    };

    setCurrentSession(session);
    setIsInFocusMode(true);
    setIsPaused(false);
    setTimeRemaining(duration * 60);
    setBlockedApps(apps);
  };

  const pauseFocusSession = () => {
    setIsPaused(true);
  };

  const resumeFocusSession = () => {
    setIsPaused(false);
  };

  const stopFocusSession = async (wasCompleted: boolean) => {
    if (currentSession) {
      const finishedSession: FocusSession = {
        ...currentSession,
        wasCompleted,
        completedAt: new Date(),
      };

      await storage.addSession(finishedSession);
      await updateStatsAfterSession(wasCompleted, currentSession.duration / 60);
    }

    setIsInFocusMode(false);
    setIsPaused(false);
    setTimeRemaining(0);
    setCurrentSession(null);
    setBlockedApps([]);
  };

  const handleSessionComplete = async () => {
    await stopFocusSession(true);
  };

  const updateStatsAfterSession = async (completed: boolean, minutes: number) => {
    const today = new Date().toISOString().split('T')[0];
    const isConsecutiveDay =
      stats.lastSessionDate === today ||
      (stats.lastSessionDate &&
        new Date(stats.lastSessionDate).getTime() ===
          new Date(today).getTime() - 24 * 60 * 60 * 1000);

    const newStats: UserStats = {
      totalSessions: stats.totalSessions + 1,
      completedSessions: completed ? stats.completedSessions + 1 : stats.completedSessions,
      totalMinutes: completed ? stats.totalMinutes + minutes : stats.totalMinutes,
      currentStreak: completed && isConsecutiveDay ? stats.currentStreak + 1 : completed ? 1 : 0,
      bestStreak: 0,
      lastSessionDate: today,
    };

    newStats.bestStreak = Math.max(newStats.currentStreak, stats.bestStreak);

    await storage.updateStats(newStats);
    setStats(newStats);
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = {...settings, ...newSettings};
    await storage.updateSettings(newSettings);
    setSettings(updated);

    if (newSettings.blockedApps) {
      setBlockedApps(newSettings.blockedApps);
    }
  };

  const refreshStats = async () => {
    const loadedStats = await storage.getStats();
    setStats(loadedStats);
  };

  return (
    <FocusContext.Provider
      value={{
        isInFocusMode,
        isPaused,
        timeRemaining,
        currentSession,
        stats,
        settings,
        blockedApps,
        startFocusSession,
        pauseFocusSession,
        resumeFocusSession,
        stopFocusSession,
        updateSettings,
        refreshStats,
      }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = (): FocusContextType => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocus must be used within FocusProvider');
  }
  return context;
};
