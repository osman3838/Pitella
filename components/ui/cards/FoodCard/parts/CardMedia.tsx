import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export function CardMedia({ source }: { source: any }) {
  return (
    <View style={s.media}>
      <Image source={source} style={s.img} resizeMode="cover" />
    </View>
  );
}
const s = StyleSheet.create({
  media: { flex: 1 },
  img: { width: '100%', height: '100%' },
});
