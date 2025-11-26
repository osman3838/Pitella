// components/screen/Campaigns/CampaignsMenu.tsx

import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  SettingsCard,
  type SettingsItem,
} from '@/components/ui/cards/SettingsCard/SettingsCard';
type CampaignsMenuProps = {
  onHelpPress?: () => void;
  onTermsPress?: () => void;
  onLogoutPress?: () => void;
};

export default function CampaignsMenu({
  onHelpPress,
  onTermsPress,
  onLogoutPress,
}: CampaignsMenuProps) {
  const { colors } = useTheme();

  // Menü item listesi
  const items: SettingsItem[] = [
    {
      id: 'help',
      label: 'Yardım Merkezi',
      onPress: onHelpPress,
    },
    {
      id: 'terms',
      label: 'Kullanım Koşulları ve Veri Politikası',
      onPress: onTermsPress,
    },
  ];

  return (
    <View style={s.container}>
      {/* Menü kartı */}
      <SettingsCard
        items={items}
        style={s.menuCard}
      />

      {/* Çıkış butonu */}
      <Pressable
        style={[
          s.logoutBtn,
          { borderColor: colors.text ?? '#222' },
        ]}
        onPress={onLogoutPress}
      >
        <AppText size={14} weight="semiBold" >
          Çıkış Yap
        </AppText>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginBottom: 60,
  },
  menuCard: {
    marginBottom: 38,
  },
  logoutBtn: {
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
});
