// app/(tabs)/profile.tsx
import QuickActionsCard from '@/components/screen/QuickActions/QuickActionsCard';
import { useTheme } from '@/hooks/useTheme';
import type { QuickActionsModel } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { Images } from '@/assets';

export default function ProfileScreen() {
  const t = useTheme();
  const s = styles(t);

  const quickActions: QuickActionsModel = {
    rows: [
      { key: 'profile', label: 'Profilimi Görüntüle', icon: 'Person', onPress: () => {} },
      { key: 'balance', label: 'Bakiyem', icon: 'Balance', onPress: () => {} },
      { key: 'points', label: 'Puanlar', icon: 'Review', onPress: () => {} },
      { key: 'help', label: 'Yardım', icon: 'Info', onPress: () => {} },
      { key: 'faq', label: 'S.S.S.', icon: 'Question', onPress: () => {} },
    ],
  };

  return (
    <View style={s.container}>
      {/* Sol alt köşede sabit background image */}
      <View style={s.bgImageWrap} pointerEvents="none">
        <Image style={s.bgImage} source={Images.Profile.Background01} resizeMode="contain" />
      </View> 
       <View style={s.bgImageWrapTwo} pointerEvents="none">
        <Image style={s.bgImage2} source={Images.Profile.Background02} resizeMode="contain" />
      </View>


      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }} />
        <QuickActionsCard card={quickActions} />
      </ScrollView>
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.lg,
    },
    content: {
      minHeight: '100%',
      paddingBottom: 120,
      gap: 12,
    },

    // ✅ sol alt köşe background
    bgImageWrap: {
      position: 'absolute',
      left: 10,     // biraz taşsın diye (isteğe göre 0 yaparsın)
      bottom: 170,   // biraz aşağı taşsın diye
      width: 100,    // boyutu buradan büyüt/küçült
      height: 100,
      zIndex: -1,    // içerik üstte kalsın
    },
        bgImageWrapTwo: {
      position: 'absolute',
      right: 10,     // biraz taşsın diye (isteğe göre 0 yaparsın)
      top: 0,   // biraz aşağı taşsın diye
      width: 80,    // boyutu buradan büyüt/küçült
      height: 80,
      zIndex: -1,    // içerik üstte kalsın
    },
    bgImage: {
      width: '100%',
      height: '100%',
    },
        bgImage2: {
      width: '100%',
      height: '100%',
    },
    });
