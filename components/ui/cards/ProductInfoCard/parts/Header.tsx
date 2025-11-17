import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  name: string;
  rating?: number;
  ratingCount?: number;
};

export const Header: React.FC<Props> = ({ name, rating, ratingCount }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>

      {rating != null && (
        <Text style={styles.rating}>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  rating: {
    fontSize: 12,
    color: '#777',
  },
});
