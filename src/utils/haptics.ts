// Haptic feedback utility — Shneiderman Rule 3 (Informative Feedback)
// Provides tactile feedback on button presses and successful actions on mobile

import { Platform } from 'react-native';

let Haptics: any = null;

// Lazy-load expo-haptics only on native platforms
const loadHaptics = async () => {
  if (Platform.OS !== 'web' && !Haptics) {
    try {
      Haptics = await import('expo-haptics');
    } catch {
      Haptics = null;
    }
  }
};

// Call once at startup
loadHaptics();

export const hapticLight = () => {
  if (Haptics && Platform.OS !== 'web') {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  }
};

export const hapticMedium = () => {
  if (Haptics && Platform.OS !== 'web') {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
  }
};

export const hapticSuccess = () => {
  if (Haptics && Platform.OS !== 'web') {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
  }
};

export const hapticError = () => {
  if (Haptics && Platform.OS !== 'web') {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch {}
  }
};

export const hapticSelection = () => {
  if (Haptics && Platform.OS !== 'web') {
    try {
      Haptics.selectionAsync();
    } catch {}
  }
};
