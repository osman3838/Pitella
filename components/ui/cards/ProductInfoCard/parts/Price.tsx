import React from 'react';
import { Text, StyleSheet } from 'react-native';

export const Price = ({ price }: { price: number }) => {
  return <Text style={styles.price}>{price}₺</Text>;
};

const styles = StyleSheet.create({
  price: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000',
  },
});
