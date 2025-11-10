import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { FoodCardProps } from '@/types';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

export default function FoodCard({
  image,
  title,
  subtitle,
  rating,
  price,
  badges = [],
  actions = [],
  onPress,
  style,
  contentRight,
  contentBottom,
}: FoodCardProps) {
  const { colors } = useTheme();
  const src = typeof image === 'string' ? { uri: image } : image;

  // İndirim pili için opsiyonel alan (types'ta yoksa da sorun değil)
  const discountLabel: string | undefined = (price as any)?.badgeLabel;

  return (
    <Pressable onPress={onPress} style={[s.card, { backgroundColor: colors.surface }, style]}>
      {/* MEDIA */}
      <View style={[s.mediaWrap, { backgroundColor: colors.mutedBg ?? '#F2EEE6' }]}>
        <Image source={src} style={s.media} resizeMode="cover" />
        {!!badges.length && (
          <View style={s.badges}>
            {badges.map(b => (
              <Pressable key={b.key} onPress={b.onPress} style={[s.badge, { backgroundColor: colors.surface }]}>
                {b.icon && <Icon name={b.icon as any} size={14} color={colors.text} />}
                {b.label && <AppText size={10} style={{ marginLeft: b.icon ? 4 : 0 }}>{b.label}</AppText>}
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* BODY */}
      <View style={s.body}>
        {/* Title + rating */}
        <View style={s.row}>
          <AppText size={18} weight="bold" color="text" style={{ flex: 1 }} numberOfLines={1}>
            {title}
          </AppText>

          {!!rating && (
            <View style={[s.row, { gap: 6 }]}>
              <Icon name="Star" size={16} color={colors.primary} />
              <AppText size={13}>
                {rating.value.toFixed(1)}
                {!!rating.count && ` (${rating.count})`}
              </AppText>
            </View>
          )}
          {contentRight}
        </View>

        {!!subtitle && (
          <AppText size={12} color="muted" style={{ marginTop: 2 }} numberOfLines={1}>
            {subtitle}
          </AppText>
        )}

        {/* Divider */}
        <View style={[s.divider, { backgroundColor: colors.border ?? '#E9E9E9' }]} />

        {/* Footer row */}
        {contentBottom ? (
          contentBottom
        ) : (
          <View style={[s.row, { alignItems: 'center' }]}>
            {!price?.hidden && (
              <AppText
                size={24}
                weight="bold"
                style={{ minWidth: 64 }}
              >
                {typeof price?.value === 'number' ? `${price.value}₺` : price?.value}
              </AppText>
            )}
            {!!discountLabel && (
              <View style={[s.pill, { backgroundColor: colors.success}]}>
                <AppText size={11} color="onPrimary">
                  {discountLabel}
                </AppText>
              </View>
            )}

            <View style={{ flex: 1 }} />

            <Pressable hitSlop={8} onPress={actions.find(a => a.key === 'buy')?.onPress}>
              <AppText size={14} color="gray">
                Satın Al
              </AppText>
            </Pressable>

            <Pressable
              onPress={actions.find(a => a.key === 'add')?.onPress}
              style={[
                s.addBtn,
                { backgroundColor:colors.accent },
              ]}
              hitSlop={8}
            >
              <Icon name="Plus" size={22} color="#fff" />
          </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  mediaWrap: {
    width: '100%',
    aspectRatio: 16 / 10,
    position: 'relative',
  },
  media: { width: '100%', height: '100%' },

  badges: { position: 'absolute', top: 10, right: 10, gap: 8 },
  badge: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  body: { paddingHorizontal: 16, paddingVertical: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },

  divider: { height: StyleSheet.hairlineWidth, marginVertical: 12, opacity: 0.8 },

  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginLeft: 10,
  },

  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
