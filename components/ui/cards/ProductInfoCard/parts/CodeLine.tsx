import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const CodeLine = ({ code }: { code: string }) => {
  return <Text style={styles.code}>Ürün Kodu: {code}</Text>;
};

const styles = StyleSheet.create({
  code: {
    fontSize: 11,
    color: '#777',
    marginTop: 4,
  },
});
