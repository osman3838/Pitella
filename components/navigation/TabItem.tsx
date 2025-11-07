import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import React, { useMemo } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import type { TabItemProps } from '@/types/navigation/TabItemProps';

export default function TabItem({
  label,
  icon,
  focused,
  center = false,
  badge,
  onPress,
  onLongPress,
  style,
  testID,
}: TabItemProps) {
  const { colors } = useTheme();
  const s = useMemo(() => makeStyles(colors), [colors]);

  const tint = focused ? (colors.primary ?? '#007aff') : (colors.surface ?? '#444');
  const bg = focused ? (colors.background ?? '#f4f4f4') : 'transparent';


  return (
    <Pressable
      testID={testID}

      accessibilityRole="button"
      accessibilityState={focused ? { selected: true } : {}}
      accessibilityLabel={label}
      
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        s.item,
        center && s.itemCenter,
        { backgroundColor: bg, transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }] },
        style,
      ]}
      android_ripple={{ color: '#00000014', borderless: false }}
      hitSlop={8}
    >
      <View style={s.iconWrap}>
        <Icon name={icon as any} size={center ? 34 : 28} color={tint} />
        {typeof badge === 'number' && badge > 0 && (
          <View style={s.badge}>
            <AppText size={9} style={s.badgeTxt}>
              {badge > 99 ? '99+' : String(badge)}
            </AppText>
          </View>
        )}
      </View>

      <AppText size={10} style={[s.label, { color: tint, fontWeight: focused ? '700' : '500' }]}>
        {label}
      </AppText>
    </Pressable>
  );
}

function makeStyles(colors: any) {
  return StyleSheet.create({
    item: {
      flex: 1,
      height: 56,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      ...Platform.select({ android: { overflow: 'hidden' } }),
    },
    itemCenter: {
      height: 60,
      borderRadius: 16,
    },
    iconWrap: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 24,
    },
    label: {
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
    badge: {
      position: 'absolute',
      top: -6,
      right: -10,
      minWidth: 16,
      height: 16,
      paddingHorizontal: 4,
      borderRadius: 8,
      backgroundColor: colors.primary ?? '#007aff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeTxt: {
      color: '#fff',
      fontWeight: '700',
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
  });
}
