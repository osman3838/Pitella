import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { MapCardProps } from '@/types/ui/map';
import React, { useMemo } from 'react';
import { ImageBackground, Platform, Pressable, StyleSheet, View } from 'react-native';
let MapView: any, Marker: any, Circle: any;
try {
  const maps = require('react-native-maps');
  MapView = maps.default;
  Marker = maps.Marker;
  Circle = maps.Circle;
} catch (_) {}

export default function MapCard({
  title = 'Kayseri / Talas',
  center,
  radiusMeters = 800,
  pins = [],
  useRealMap = false,
  onPressPin,
  onPressLocate,
  onPressAction,
  style,
}: MapCardProps) {
  const { colors } = useTheme();
  const region = useMemo(() => {
    const latDelta = Math.max((radiusMeters / 111_000) * 2.2, 0.01);
    const lonDelta = latDelta * 0.8;
    return { ...center, latitudeDelta: latDelta, longitudeDelta: lonDelta };
  }, [center, radiusMeters]);

  return (
    <View style={[s.card, { backgroundColor: colors.surface }, style]}>
      <View style={[s.header, { paddingHorizontal: 12, paddingTop: 8 }]}>
        <AppText size={12} weight="semiBold">{title}</AppText>
      </View>

      <View style={s.body}>
        {useRealMap && MapView ? (
          <MapView
            style={StyleSheet.absoluteFill}
            initialRegion={region}
            showsUserLocation
            pitchEnabled={false}
            rotateEnabled={false}
            toolbarEnabled={false}
            showsMyLocationButton={false}
            moveOnMarkerPress={false}
            provider={Platform.OS === 'android' ? 'google' : undefined}
          >
            <Circle
              center={center}
              radius={radiusMeters}
              strokeColor="#FF6B6B"
              fillColor="rgba(255, 107, 107, 0.12)"
              strokeWidth={2}
              strokePattern={[8, 8]}
            />              {pins.map(p => (
              <Marker
                key={p.id}
                coordinate={{ latitude: p.latitude, longitude: p.longitude }}
                title={p.title}
                pinColor={p.color ?? '#FF6B6B'}
                onPress={() => onPressPin?.(p)}
              />
            ))}
          </MapView>
        ) : (
          <ImageBackground
            source={''} // basit gri çizgili bir görsel koy
            style={StyleSheet.absoluteFill}
            imageStyle={{ resizeMode: 'cover', opacity: 0.45 }}
          >
            {/* radius overlay */}
            <View style={s.centerWrap}>
              <View style={s.radiusOuter}>
                <View style={s.radiusInner} />
              </View>

              {/* mavi kullanıcı noktası */}
              <View style={s.meDot} />

              {/* örnek pinler */}
              {pins.map((p, i) => (
                <View key={p.id ?? String(i)} style={[s.pinDot, { left: 60 + i * 24, top: 40 + (i % 2) * 28 }]} />
              ))}
            </View>
          </ImageBackground>
        )}

        {/* Right controls */}
        <View style={s.controls}>
          <Pressable onPress={onPressLocate} style={[s.ctrlBtn, { backgroundColor: colors.surface }]}>
            <Icon name="Crosshair" size={18} color={colors.text} />
          </Pressable>
          <Pressable onPress={onPressAction} style={[s.ctrlBtn, { backgroundColor: colors.primary }]}>
            <Icon name="Settings" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: { zIndex: 2 },
  body: {
    position: 'relative',
    height: 220, // Home tasarımına uygun sabit yükseklik
    overflow: 'hidden',
    borderRadius: 16,
  },

  // Mock mode
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiusOuter: {
    width: 180,
    height: 180,
    borderRadius: 180,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 107, 107, 0.12)',
  },
  radiusInner: {
    width: 120,
    height: 120,
    borderRadius: 120,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255, 107, 107, 0.6)',
  },
  meDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#1E90FF',
    position: 'absolute',
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    position: 'absolute',
  },

  controls: {
    position: 'absolute',
    right: 10,
    bottom: 12,
    gap: 10,
  },
  ctrlBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});
