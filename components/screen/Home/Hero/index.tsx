import type { HeroModel } from '@/types';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';

export default function Hero({
  image,
  style,
  onPress,
}: HeroModel) {

  return (
    <Pressable
      android_ripple={{ color: '#00000014' }}
      onPress={onPress}
    >
      <ImageBackground
        source={image}
        style={{zIndex:100000,width:420,height:210,position:"relative"}}
        resizeMode='contain'
        borderRadius={10}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
  },
});
