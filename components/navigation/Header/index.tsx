import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Center from './Center';
import Left from './Left';
import Right from './Right';

export default function Header({
  left = true,
  center = true,
  right = true,
}: {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[{ paddingTop: Math.max(insets.top, 8) }]}>
      <View style={s.row}>
        {/* Sol slot */}
        {left && <View style={s.slot}>
          <Left />
        </View>}


        {/* Orta başlık alanı */}
        {center && <Center />}

        {/* Sağ slot */}
        {right && <View style={[s.slot, s.alignEnd]}>
          <Right />
        </View>}
      </View>
    </View>
  );
}

const s = StyleSheet.create({

  row: {
    minHeight: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Sol ve sağ için sabit slot: Center gerçekten ortada kalır
  slot: {
    width: 56,                // ikon/avatara yeter, tasarımda stabil merkez
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },

});
