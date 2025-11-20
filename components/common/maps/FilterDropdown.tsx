// src/components/common/maps/FilterDropdown.tsx
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { AppText } from '@/components/ui/AppText';
import {
  NearbyFilter,
  NearbyFilterId,
} from '@/config/nearbyFilters';

type Props = {
  filters: NearbyFilter[];
  activeFilter: NearbyFilterId;
  onChange: (id: NearbyFilterId) => void;
  style?: ViewStyle;
};

export const FilterDropdown: React.FC<Props> = ({
  filters,
  activeFilter,
  onChange,
  style,
}) => {
  const [open, setOpen] = useState(false);

  const active = filters.find(f => f.id === activeFilter) ?? filters[0];

  const handleSelect = (id: NearbyFilterId) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {/* TRIGGER BUTTON (sağa yaslı, turuncu buton görünümü) */}
      <Pressable
        onPress={() => setOpen(prev => !prev)}
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.triggerPressed,
        ]}
      >
        <AppText
          weight="semiBold"
          size={13}
          style={styles.triggerText}
        >
          Günün Ürünleri
        </AppText>
      </Pressable>

      {open && (
        <View style={styles.dropdown}>
          <FlatList
            data={filters}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const selected = item.id === activeFilter;
              return (
                <Pressable
                  onPress={() => handleSelect(item.id)}
                  style={({ pressed }) => [
                    styles.item,
                    selected && styles.itemSelected,
                    pressed && styles.itemPressed,
                  ]}
                >
                  <AppText
                    size={13}
                    weight={selected ? 'semiBold' : 'medium'}
                    style={selected ? styles.itemTextSelected : styles.itemText}
                  >
                    {item.label}
                  </AppText>
                </Pressable>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-end', // varsayılan: sağa yaslı
  },

  trigger: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 18,
    paddingVertical: 8,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triggerPressed: {
    opacity: 0.85,
  },
  triggerText: {
    color: '#FFFFFF',
  },

  // DROPDOWN
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 0,         // sağdan açılacak
    minWidth: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  itemSelected: {
    backgroundColor: '#FFF3E8',
  },
  itemPressed: {
    opacity: 0.8,
  },
  itemText: {
    color: '#333',
  },
  itemTextSelected: {
    color: '#FF6B00',
  },
});
