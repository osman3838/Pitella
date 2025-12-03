// components/ui/BackButton.tsx
import { AppText } from '@/components/ui/AppText';
import { IconButton } from '@/components/ui/IconButton';
import { useTheme } from '@/hooks/useTheme';
import type { BackButtonProps } from '@/types/ui/backButtonTypes';
import { withAlpha } from '@/utils/color';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const BackButton: React.FC<BackButtonProps> = ({
  label = 'Geri Dön',
  onPress,
  testID,
  size = 48,
  radius = 30,
}) => {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={s.row} testID={testID}>
      <IconButton
        onPress={onPress ?? (() => router.back())}
        size={size}
        radius={radius}
        backgroundColor={colors.primary}
      >
        <Ionicons name="arrow-back-outline" size={20} color={"white"} />
      </IconButton>

      <AppText weight="medium" size={14} style={s.label}>
        {label}
      </AppText>
    </View>
  );
};

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  label: { marginLeft: 8 },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
});
