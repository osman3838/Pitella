import * as Location from 'expo-location';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import LocationPermissionEmptyState from '@/components/common/location/LocationPermissionEmptyState';
import MapCard from '@/components/screen/Automat/MapCard';

export default function AutomatScreen() {
  const [status, setStatus] = React.useState<'unknown' | 'granted' | 'denied'>(
    'unknown'
  );

  React.useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') setStatus('granted');
      else if (status === 'denied') setStatus('denied');
      else setStatus('unknown');
    })();
  }, []);

  const handleAllowPress = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') setStatus('granted');
    else setStatus('denied');
  };

  if (status !== 'granted') {
    return (
      <View style={styles.screen}>
        <LocationPermissionEmptyState onPressAllow={handleAllowPress} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <MapCard />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
