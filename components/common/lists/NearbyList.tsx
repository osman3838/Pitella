import { AppButton } from '@/components/ui/AppButton';
import type { NearbySiteDTO } from '@/types/dto/otomat';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type NearbyListProps = {
  sites: NearbySiteDTO[];
  onPressRoute?: (item: NearbySiteDTO) => void;
  onPressItem?: (item: NearbySiteDTO) => void;
  highlightFirst?: boolean;
};

export default function NearbyList({
  sites,
  onPressRoute,
  onPressItem,
  highlightFirst = true,
}: NearbyListProps) {
  return (
    <View style={{ gap: 6 }}>
      {sites.map((s, i) => {
        const isActive = highlightFirst && i === 0;

        const name =
          s.address?.startsWith('Koordinat') && s.city
            ? s.city
            : s.address || s.city || 'Otomat';

        return (
          <View> 
          <Pressable
            key={s.site_id}
            onPress={() => onPressItem?.(s)}
            style={[
              styles.row,
              isActive ? styles.rowActive : styles.rowInactive,
            ]}
          >
            <Text
              style={[
                styles.rowName,
                isActive && styles.rowNameActive,
              ]}
              numberOfLines={1}
            >
              {name}
            </Text>

            {typeof s.distance_km === 'number' && (
              <Text style={styles.rowDistance}>
                {s.distance_km.toFixed(1)} km
              </Text>
            )}

            <Pressable
              onPress={() => onPressRoute?.(s)}
              style={[
                styles.routeBtn,
                isActive ? styles.routeBtnActive : styles.routeBtnInactive,
              ]}
            >
              <Text
                style={[
                  styles.routeText,
                  isActive
                    ? styles.routeTextActive
                    : styles.routeTextInactive,
                ]}
              >
                Rota
              </Text>
            </Pressable>
          </Pressable>
          
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },

  rowActive: { backgroundColor: '#FF6B00' },
  rowInactive: { backgroundColor: '#e0e0e0' },

  rowName: { flex: 1, color: '#000', fontWeight: '600', fontSize: 13 },
  rowNameActive: { color: '#fff' },

  rowDistance: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    fontSize: 11,
    fontWeight: '700',
    color: '#000',
  },

  routeBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  routeBtnActive: { backgroundColor: '#fff' },
  routeBtnInactive: { backgroundColor: '#ccc' },

  routeText: { fontSize: 11, fontWeight: '800' },
  routeTextActive: { color: '#FF6B00' },
  routeTextInactive: { color: '#555' },
});
