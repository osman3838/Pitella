import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Link, usePathname } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../ui/AppText';

export default function BottomBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();
  const pathname = usePathname().replace("/", "");

  return (
    <View style={[s.wrap, { paddingBottom: insets.bottom }]}>
      <View style={s.bar}>
        <Link href="/(app)/home" asChild>
          <Pressable style={s.item}>
            <Icon name="Home" size={32} color={pathname == "home" ? colors.secondary : colors.surface} />
            <AppText size={7}>Ev</AppText>
          </Pressable>
        </Link>

        <Link href="/(app)/campaigns" asChild>
          <Pressable style={s.item}>
            <Icon name="Campains" size={32} color={pathname == "campaigns" ? colors.secondary : colors.surface} />
            <AppText size={7}>Kampanyalar</AppText>
          </Pressable>
        </Link>

        <Link href="/(app)/pay" asChild>
          <Pressable style={s.item}>
            <Icon name="Barcode" size={30} color={pathname == "pay" ? colors.secondary : colors.surface} />
            <AppText size={7}>Öde</AppText>
          </Pressable>
        </Link>

        {/* MACHINES / LOCATIONS */}
        <Link href="/(app)/automat" asChild>
          <Pressable style={s.item}>
            <Icon name="Location" size={32} color={pathname == "automat" ? colors.secondary : colors.surface} />
            <AppText size={7}>Otomatlar</AppText>
          </Pressable>
        </Link>

        {/* PROFILE */}
        <Link href="/(app)/profile" asChild>
          <Pressable style={s.item}>
            <Icon name="Profile" size={32} color={pathname == "profile" ? colors.secondary : colors.surface} />
            <AppText size={7}>Hesabım</AppText>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    pointerEvents: 'box-none',
    backgroundColor: 'transparent',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 8,
    width: '100%',
    borderRadius:15,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});
