import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const CampaignHeader: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kampanyalar</Text>

      {/* Sağdaki yuvarlak + buton (şimdilik dummy) */}
      <Pressable style={styles.iconButton} hitSlop={8} onPress={() => {}}>
        <Text style={styles.iconText}>＋</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  iconButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  iconText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
    lineHeight: 18,
  },
});
