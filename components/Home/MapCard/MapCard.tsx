import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import { useListSitesQuery } from '@/redux/api/automat.api';
import type { MapCardProps } from '@/types/ui/map';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';


export default function MapCard({
  title = 'Kayseri / Talas', // şehir / semt bilgisi
  center = { latitude: 38.6939, longitude: 35.5530 },
  radiusMeters = 800,
  pins = [
    { id: 1, latitude: 38.698, longitude: 35.547 },
    { id: 2, latitude: 38.690, longitude: 35.560 },
  ],
  
  onPressPin,
  onPressLocate,
  onPressAction,
  style,
}: MapCardProps) {
    const { data, isLoading, error } = useListSitesQuery();
    console.log(data);
    

  // Konsol çıktıları (tek noktadan)

  const { colors } = useTheme();


  const region = useMemo(() => {
    const latDelta = Math.max((radiusMeters / 111_000) * 2.2, 0.01);
    const lonDelta = latDelta * 0.8;
    return { ...center, latitudeDelta: latDelta, longitudeDelta: lonDelta };
  }, [center, radiusMeters]);

  return (
    <View style={[styles.card, style]}>
      {/* Harita */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        customMapStyle={mapStyle}
      >
        <Circle
          center={center}
          radius={radiusMeters}
          strokeColor={colors.primary ?? '#FF6B00'}
          fillColor="rgba(255,107,0,0.08)"
          strokeWidth={2}
        />
        <Marker coordinate={center} pinColor="#00AEEF" />
        {pins.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.latitude, longitude: p.longitude }}
            pinColor={p.id === 1 ? '#FF6B00' : '#A0A0A0'}
            onPress={() => onPressPin?.(p)}
          />
        ))}
      </MapView>

      {/* Şehir / Semt Başlığı */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>

      {/* Alt metin */}
      <View style={styles.bottomText}>
        <Text style={styles.searching}>Aranıyor.</Text>
      </View>

      {/* Sağ alt kontrol tuşları */}
      <View style={styles.controls}>
        <Pressable style={styles.button} onPress={() => onPressAction?.('zoomIn')}>
          <Icon name="plus" size={20} color="#fff" />
        </Pressable>
        <Pressable style={styles.button} onPress={() => onPressAction?.('zoomOut')}>
          <Icon name="minus" size={20} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

/* Minimalist harita stili */
const mapStyle = [
  { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#f8f8f8' }] },
  { featureType: 'road', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', stylers: [{ color: '#ffffff' }] },
];

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
    backgroundColor: '#fafafa',
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    top: 8,
    left: 12,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  bottomText: {
    position: 'absolute',
    left: 12,
    bottom: 8,
  },
  searching: {
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
  },
  controls: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    flexDirection: 'row',
    gap: 6,
  },
  button: {
    backgroundColor: '#FF6B00',
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
