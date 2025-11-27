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

  const discountLabel: string | undefined = (price as any)?.badgeLabel;

  return (
    <Pressable
      onPress={onPress}
      style={[
        s.card,
        { backgroundColor: colors.surface },
        style,
      ]}
    >
      {/* MEDIA */}
      <View style={[s.mediaWrap, { backgroundColor: colors.mutedBg ?? '#F2EEE6' }]}>
        <Image source={src} style={s.media} resizeMode="cover" />

        {!!badges.length && (
          <View style={s.badges}>
            {badges.map(b => (
              <Pressable
                key={b.key}
                onPress={b.onPress}
                style={[s.badge, { backgroundColor: colors.surface }]}
              >
                {b.icon && (
                  <Icon
                    name={b.icon as any}
                    size={12}           // daha küçük
                    color={colors.text}
                  />
                )}
                {b.label && (
                  <AppText
                    size={9}
                    style={{ marginLeft: b.icon ? 4 : 0 }}
                    numberOfLines={1}
                  >
                    {b.label}
                  </AppText>
                )}
              </Pressable>
            ))}
          </View>
        )}
      </View>

      {/* BODY */}
      <View style={s.body}>
        <View style={s.row}>
          <AppText
            size={15}
            weight="bold"
            color="text"
            style={{ flex: 1 }}
            numberOfLines={1}
          >
            {title}
          </AppText>

          {!!rating && (
            <View style={[s.row, { gap: 4 }]}>
              <Icon name="Review" size={13} color="#d6d147ff" />
              <AppText size={11}>
                {rating.value.toFixed(1)}
                {!!rating.count && ` (${rating.count})`}
              </AppText>
            </View>
          )}

          {contentRight}
        </View>

        {!!subtitle && (
          <AppText
            size={10}
            color="muted"
            style={{ marginTop: 2 }}
            numberOfLines={1}
          >
            {subtitle}
          </AppText>
        )}

        {/* Divider */}
        <View
          style={[
            s.divider,
            { backgroundColor: colors.border ?? '#E9E9E9' },
          ]}
        />

        {/* Footer */}
        {contentBottom ? (
          contentBottom
        ) : (
          <View style={[s.row, { alignItems: 'center' }]}>
            {!price?.hidden && (
              <AppText
                size={18}
                weight="bold"
                style={{ minWidth: 56 }}
              >
                {typeof price?.value === 'number'
                  ? `${price.value}₺`
                  : price?.value}
              </AppText>
            )}

            {!!discountLabel && (
              <View
                style={[
                  s.pill,
                  { backgroundColor: colors.success },
                ]}
              >
                <AppText size={9} color="onPrimary">
                  {discountLabel}
                </AppText>
              </View>
            )}

            <View style={{ flex: 1 }} />

            <Pressable
              hitSlop={8}
              onPress={actions.find(a => a.key === 'buy')?.onPress}
            >
              <AppText size={12} color="gray">
                Satın Al
              </AppText>
            </Pressable>

            <Pressable
              onPress={actions.find(a => a.key === 'add')?.onPress}
              style={[
                s.addBtn,
                { backgroundColor: colors.accent },
              ]}
              hitSlop={8}
            >
              <Icon name="Plus" size={40} color="white" /> {/* küçültüldü */}
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },

  mediaWrap: {
    width: '100%',
    aspectRatio: 16 / 10,
    position: 'relative',
  },
  media: {
    width: '100%',
    height: '100%',
  },

  badges: {
    position: 'absolute',
    top: 6,
    right: 6,
    gap: 5,
  },
  badge: {
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  body: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 8,
    opacity: 0.7,
  },

  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginLeft: 8,
  },

  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
