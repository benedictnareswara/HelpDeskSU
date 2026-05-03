import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { COLORS, FONT_SIZES, SPACING, RADIUS, SHADOWS } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const MaintenanceScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Header title="Maintenance" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="construct" size={64} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>UNDER MAINTENANCE</Text>
          <Text style={styles.message}>
            We apologize for the inconvenience.{'\n'}
            This feature is currently under maintenance and will be available soon.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxxl,
    alignItems: 'center',
    width: '100%',
    ...SHADOWS.card,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  message: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default MaintenanceScreen;
