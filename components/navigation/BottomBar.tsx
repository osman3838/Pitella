import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../ui/AppText';
export default function BottomBar({ state, descriptors, navigation }: BottomTabBarProps) {
     
    const insets = useSafeAreaInsets(); const { colors } = useTheme();
      return ( 

     <View style={[s.wrap, { paddingBottom: insets.bottom }]}>
         <View style={s.bar}>
             <View style={s.item}>
                 <Icon name="Home" size={32} color={colors.surface} />
                  <AppText size={7} >Ev</AppText> 
                  </View> <View style={s.item}> <Icon name="Campains" size={32} color={colors.surface} />
                   <AppText size={7} >Kampanyalar</AppText> </View> <View style={s.item}> <Icon name="Barcode" size={30} color={colors.surface} />
                   <AppText size={7} >Öde</AppText> </View> <View style={s.item}> <Icon name="Location" size={32} color={colors.surface} />
                   <AppText size={7} >Otomatlar</AppText> </View> <View style={s.item}> <Icon name="Profile" size={32} color={colors.surface} />
                   <AppText size={7} >Hesabım</AppText> </View> </View> </View> ); }
 const s = StyleSheet.create({ wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center', pointerEvents: 'box-none', backgroundColor: 'transparent', }, bar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 10, gap: 8, width: '100%', shadowColor: '#000', backgroundColor: '#fff', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, }, item: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6, }, label: { fontSize: 11, fontWeight: '600', }, });
 