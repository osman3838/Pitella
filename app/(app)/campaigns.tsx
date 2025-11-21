import CampaignsScreen from '@/components/screen/Campaign/CampaignsScreen';
import React from 'react';
import { StyleSheet, View } from 'react-native';
export default function campaigns() {
  


  return (
    <View style={styles.screen}>
      <CampaignsScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
