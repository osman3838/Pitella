// app/(tabs)/home.tsx veya senin Home ekran dosyan
import { Images } from '@/assets';
import { CampaignSection } from '@/components/screen/Home/Campaign';
import Category from '@/components/screen/Home/Category/Category';
import Hero from '@/components/screen/Home/Hero';
import MapCard from '@/components/screen/Home/MapCard/MapCard';
import { useTheme } from '@/hooks/useTheme';
import { mocks } from '@/mocks';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Home() {
  const t = useTheme();
  const s = styles(t);
  const user = useAppSelector((state) => state.session.user);

  return (
    <View style={s.container}>
      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        <Hero
          title="Günün Çorbası"
          subtitle="TIKLA VE ÖĞREN"
          image={Images.Home.Hero.Background}
          style={{
            radius: 40,
            height: 220,
            foreground: [
              {
                src: Images.Home.Hero.Cup2,
                style: {
                  right: -30,
                  bottom: -150,
                  width: 320,
                  height: 320,
                  transform: [{ rotate: '-10deg' }],
                },
              },
              {
                src: Images.Home.Hero.Cup1,
                style: {
                  right: -70,
                  bottom: -110,

                  width: 220,
                  height: 220,
                  transform: [{ rotate: '-10deg' }],
                },
              },
            ],
          } as any}
        />

        <Category
          title="Çorbalar"
          chips={[
            { key: 'veg', label: 'Sebzeli Çorbalar', active: true, icon: 'Vegatable' },
            { key: 'veg', label: 'Sebzeli Çorbalar', active: true, icon: 'Vegatable' },
            { key: 'veg', label: 'Sebzeli Çorbalar', active: true, icon: 'Vegatable' },
            { key: 'veg', label: 'Sebzeli Çorbalar', active: true, icon: 'Vegatable' },
            { key: 'veg', label: 'Sebzeli Çorbalar', active: true, icon: 'Vegatable' },
            { key: 'veg', label: 'Sebzeli Çorbalar', active: true, icon: 'Vegatable' },

          ]}
          data={mocks.soups}
        />
      <MapCard />
      <CampaignSection title="Kampanyalar" campaigns={mocks.campaigns} />
      </ScrollView>
    </View>
  );
}

const styles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: t.spacing.lg,
      paddingTop: t.spacing.xl,
    },
    content: {
      paddingBottom: 120,
      gap: 16,
    },
  });
