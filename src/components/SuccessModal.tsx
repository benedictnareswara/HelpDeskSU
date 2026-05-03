import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, RADIUS } from '../utils/theme';

interface SuccessModalProps {
  visible: boolean;
  onDismiss: () => void;
}

const { width, height } = Dimensions.get('window');

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onDismiss }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onDismiss}
      >
        <View style={styles.card}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={64} color={COLORS.white} />
          </View>
          <Text style={styles.title}>SUBMISSION SUCCESSFUL</Text>
          <Text style={styles.subtitle}>TAP TO EXIT</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    paddingVertical: SPACING.xxxl * 2,
    paddingHorizontal: SPACING.xxxl,
    alignItems: 'center',
    width: width * 0.75,
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default SuccessModal;
