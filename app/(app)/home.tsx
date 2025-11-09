import Hero from '@/components/Home/Hero';
import { useTheme } from '@/hooks/useTheme';
import { useAppSelector } from '@/redux/hooks';

import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Home() {
  const t = useTheme();
  const s = styles(t);

  const user = useAppSelector((state) => state.session.user);

  return (
    <View style={s.container}>
<Hero title="Günün Çorbası"  subtitle='TIKLA VE ÖĞREN'  image={require("@/assets/images/pages/home/hero/banner.png")} />
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: t.spacing.lg,
      paddingTop: t.spacing.xl,
    },
  });
