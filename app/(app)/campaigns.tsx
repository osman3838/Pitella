import CampaignsScreen from '@/components/screen/Campaign/CampaignsScreen';
import React from 'react';
import { StyleSheet, View,Image } from 'react-native';
import {Images} from '@/assets';

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
    position:"relative",

    backgroundColor: '#F5F5F5',
  },
});
