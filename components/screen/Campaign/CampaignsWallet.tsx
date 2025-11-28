// components/screen/Campaigns/CampaignsWallet.tsx
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

type CampaignsWalletProps = {
  wallet: {
    balance: number;
    currency: string;
  };
  onTopUpPress?: () => void;
};

export default function CampaignsWallet({
  wallet,
  onTopUpPress,
}: CampaignsWalletProps) {
  const { colors } = useTheme();

  return (
    <View style={s.container}>
      <AppText size={14} weight="medium" style={{ marginBottom: 8 }}>
        Cüzdan
      </AppText>

      <View style={[s.card, { backgroundColor:  '#FFFFFF' }]}>
        <AppText size={12} color="muted" weight='bold'>
          Bakiye
        </AppText>
        <AppText size={18} weight="bold" style={{ marginTop: 4 }}>
          {wallet.balance.toFixed(2)} {wallet.currency.toLowerCase() === '₺' ? 'tl' : wallet.currency}
        </AppText>
      </View>
      <Pressable
        style={[
          s.button,
          { backgroundColor: colors.yellow },
        ]}
        onPress={onTopUpPress}
      >
        <AppText size={14} weight="semiBold" color="white">
          Bakiye Yükle
        </AppText>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  card: {
    borderRadius: 18,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",

    paddingHorizontal: 16,
    paddingVertical: 17,
    marginBottom: 12,
  },
  button: {
    alignSelf: 'flex-end',
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 999,
  },
});
