// app/(app)/otomats.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import LocationPermissionEmptyState from '@/components/common/location/LocationPermissionEmptyState';

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

  // İzin yokken / bilinmiyorken boş state
  if (status !== 'granted') {
    return (
      <View style={styles.screen}>
        {/* Header + bottom tab zaten layout'tan gelir */}
        <LocationPermissionEmptyState onPressAllow={handleAllowPress} />
      </View>
    );
  }

  // İzin verilmişse gerçek MapCard
  return (
    <View style={styles.screen}>
      <Automat />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
