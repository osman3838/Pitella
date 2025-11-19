// src/components/common/maps/RadiusMap.tsx
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import MapView, {
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import { FilterDropdown } from '@/components/common/maps/FilterDropdown';
import {
  NearbyFilter,
  NearbyFilterId,
} from '@/config/nearbyFilters';

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
};

export const RadiusMap: React.FC<RadiusMapProps> = ({
  coords,
  radiusKm,
  markers = [],
  style,
  filters,
  activeFilter,
  onFilterChange,
}) => {
  const region = {
    latitude: coords.lat,
    longitude: coords.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  const radiusMeters = radiusKm * 1000;

  return (
    <View style={[styles.container, style]}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={region}
        provider={PROVIDER_GOOGLE}
        showsCompass={false}
        showsPointsOfInterest={false}
        showsBuildings={false}
        showsTraffic={false}
      >
        <Circle
          center={{ latitude: coords.lat, longitude: coords.lng }}
          radius={radiusMeters}
          strokeColor="#FF6B00"
          fillColor="rgba(255, 107, 0, 0.09)"
          strokeWidth={2}
        />

        <Marker
          coordinate={{ latitude: coords.lat, longitude: coords.lng }}
          anchor={{ x: 0.5, y: 0.5 }}
        >
          <View style={styles.userDotOuter}>
            <View style={styles.userDotInner} />
          </View>
        </Marker>

        {markers.map(m => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.lat, longitude: m.lng }}
            title={m.title}
            description={m.description}
          >
            <View
              style={[
                styles.pin,
                m.isActive ? styles.pinActive : styles.pinInactive,
              ]}
            />
          </Marker>
        ))}
      </MapView>

        <View style={styles.filterWrapper}>
          <FilterDropdown
            filters={filters!}
            activeFilter={activeFilter!}
            onChange={onFilterChange!}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  userDotOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,174,239,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00AEEF',
  },
  pin: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  pinActive: {
    backgroundColor: '#ff4d00',
  },
  pinInactive: {
    backgroundColor: '#999',
  },
  filterWrapper: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
