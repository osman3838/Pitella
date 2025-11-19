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
      <Pressable
        onPress={() => setOpen(prev => !prev)}
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.triggerPressed,
        ]}>
        <AppText weight="semiBold" size={13}>
          {active.label}
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
                  ]}>
                  <AppText
                    size={13}
                    weight={selected ? 'semiBold' : 'medium'}>
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
  },
  trigger: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  triggerPressed: {
    opacity: 0.8,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  itemSelected: {
    backgroundColor: '#FFF3E8',
  },
  itemPressed: {
    opacity: 0.7,
  },
});
