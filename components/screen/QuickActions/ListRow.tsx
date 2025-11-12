import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AppText } from '@/components/ui/AppText';
import { ProfileListRow } from '@/types';
import Icon from '@/icons';



export default function ListRow({ label, icon, color = '#EA5B2A', onPress }: ProfileListRow) {
  return (
    <Pressable onPress={onPress} style={s.row}>
      <AppText size={13}>{label}</AppText>

      <View style={s.right}>
        <Icon name={icon as any} size={16} color={color} />
      </View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  right: {
    marginLeft: 'auto',
  },
});
