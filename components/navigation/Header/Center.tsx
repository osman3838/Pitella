import { AppText } from '@/components/ui/AppText';
import { CenterHeaderProps } from '@/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Center = ({ onMenuPress }: CenterHeaderProps) => {
  const insets = useSafeAreaInsets();

  const today = new Date();
  const formatted = new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(today);

  return (
    <View style={styles.center}>
      <AppText weight="bold" size={20}>
        Merhaba Hazal
      </AppText>
      <AppText>{formatted}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Center;
