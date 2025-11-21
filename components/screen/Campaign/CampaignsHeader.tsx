// components/screen/Campaigns/CampaignsHeader.tsx
import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type CampaignsHeaderProps = {
  user: {
    name: string;
    createdAt: string;
    avatarUrl?: string;
  };
};

export default function CampaignsHeader({ user }: CampaignsHeaderProps) {
  const { colors } = useTheme();

  const initials = user.name
    ?.split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={s.container}>
      <View style={s.textWrap}>
        <AppText size={22} weight="bold" color="text">
          {user.name}
        </AppText>
        <AppText
          size={11}
          color="muted"
          style={{ marginTop: 4 }}
          numberOfLines={1}
        >
          Hesap Açılış Tarihi: {user.createdAt}
        </AppText>
      </View>

      {user.avatarUrl ? (
        <Image source={{ uri: user.avatarUrl }} style={s.avatar} />
      ) : (
        <View style={[s.avatar, { backgroundColor: colors.accent ?? '#F3C34C' }]}>
          <AppText size={14} weight="bold" color="onPrimary">
            {initials}
          </AppText>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  textWrap: {
    flex: 1,
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
