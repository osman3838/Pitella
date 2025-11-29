// src/components/common/maps/RadiusMap.tsx
import Slider from '@react-native-community/slider';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import MapView, {
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import {
  NearbyFilter,
  NearbyFilterId,
} from '@/config/nearbyFilters';
import Icon from '@/icons';

export type Coords = { lat: number; lng: number };

export type RadiusMarker = {
  id: string | number;
  lat: number;
  lng: number;
  title?: string;
  description?: string;
  isActive?: boolean;
};

type RadiusMapProps = {
  coords: Coords;
  radiusKm: number;
  markers?: RadiusMarker[];
  style?: StyleProp<ViewStyle>;
  filters?: NearbyFilter[];
  activeFilter?: NearbyFilterId;
  onFilterChange?: (id: NearbyFilterId) => void;

  minRadiusKm?: number;
  maxRadiusKm?: number;

  onRadiusChange?: (nextKm: number) => void;
};

export const RadiusMap: React.FC<RadiusMapProps> = ({
  coords,
  radiusKm,
  markers = [],
  style,
  minRadiusKm = 1,
  maxRadiusKm = 20,
  onRadiusChange,
}) => {
  const center = {
    latitude: coords.lat,
    longitude: coords.lng,
  };

  const region = {
    latitude: center.latitude,
    longitude: center.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const safeRadiusKm = (() => {
    const r = Number(radiusKm);
    if (isNaN(r)) return minRadiusKm;
    return Math.min(Math.max(r, minRadiusKm), maxRadiusKm);
  })();

  const radiusMeters = safeRadiusKm * 1000;

  return (
    <View style={[styles.wrapper, style]}>
      {/* MAP -------------------------------------------------------------------- */}
      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={region}
          provider={PROVIDER_GOOGLE}
          showsCompass={false}
          showsPointsOfInterest={false}
          showsBuildings={false}
          showsTraffic={false}
        >
          {/* RADIUS CIRCLE */}
          <Circle
            center={center}
            radius={radiusMeters}
            strokeColor="rgba(255, 107, 0, 0.9)"
            fillColor="rgba(255, 107, 0, 0.08)"
            strokeWidth={2}
          />

          {/* USER LOCATION DOT */}
          <Marker coordinate={center} anchor={{ x: 0.5, y: 0.5 }}>
            <Icon name="Location" size={24}  />
          </Marker>

          {/* AUTOMAT MARKERS */}
          {markers.map(m => (
            <Marker
              key={m.id}
              coordinate={{ latitude: m.lat, longitude: m.lng }}
            >
          <Icon name="Location" size={24} color="#FF6B00" />
            </Marker>
          ))}
        </MapView>
      </View>

      {/* SLIDER AREA ------------------------------------------------------------ */}
      <View style={styles.sliderRow}>
        <Text style={styles.kmLabel}>{minRadiusKm} km</Text>

        <Slider
          style={styles.slider}
          minimumValue={minRadiusKm}
          maximumValue={maxRadiusKm}
          step={1}
          value={safeRadiusKm}
          minimumTrackTintColor="#FF6B00"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#FF6B00"
          onValueChange={value => {
            const km = Math.round(value);
            onRadiusChange?.(km);
          }}
        />

        <Text style={styles.kmLabel}>{maxRadiusKm} km</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position:"relative"
  },

  mapContainer: {
    height: 220,
    borderRadius: 16,
    position:"relative",
    overflow: 'hidden',
    backgroundColor: '#fff',
  },

  /* USER DOT */
  userDotOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,174,239,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00AEEF',
  },

  /* PINS */
  pin: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pinActive: { backgroundColor: '#ff4d00' },
  pinInactive: { backgroundColor: '#acacac' },

  /* SLIDER AREA */
  sliderRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  kmLabel: {
    width: 40,
    fontSize: 12,
    textAlign: 'center',
    color: '#555',
  },

  slider: {
    flex: 1,
    height: 30,
  },
});
