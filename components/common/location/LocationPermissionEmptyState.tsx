import type { LocationPermissionEmptyStateProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const DEFAULT_TEXT =
  'Konum erişimi olmadan\nmevcut otomatları\nlisteleyemezsiniz.';

export default function LocationPermissionEmptyState({
  title = DEFAULT_TEXT,
  description,
  buttonLabel = 'İzin Ver',
}: LocationPermissionEmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="ban" size={72} color="#FF6B00" />
      </View>

      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}

      <Pressable style={styles.button}>
        <View style={styles.buttonIcon} />
        <Text style={styles.buttonText}>{buttonLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
    lineHeight: 22,
    marginBottom: 24,
  },
  description: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#FF6B00',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF6B00',
  },
});
