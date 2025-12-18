// components/screen/Campaigns/CampaignsList.tsx
import { AppText } from '@/components/ui/AppText';
import FoodCard from '@/components/ui/cards/FoodCard/FoodCard';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type CampaignItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: any;
  rating?: {
    value: number;
    count?: number;
  };
  price: number;
  // istersen buraya badge vs ekleyebilirsin
};

type CampaignsListProps = {
  campaigns: CampaignItem[];
};

export default function CampaignsList({ campaigns }: CampaignsListProps) {
  return (
    <View style={s.container}>
      <AppText size={16} weight="semibold" color="text" style={s.title}>
        Geçmiş Siparişlerim
      </AppText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.listContent}
      >
        {campaigns.map(item => (
          <View key={item.id} style={s.cardWrap}>
            <FoodCard
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              rating={item.rating}
              price={{ value: item.price }}
              actions={[
                { key: 'buy', onPress: () => {} },
                { key: 'add', onPress: () => {} },
              ]}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginBottom: 24,
    marginTop:24,
    marginHorizontal:15,

  },
  title: {
    marginBottom: 12,
  },
  listContent: {
    paddingRight: 8,
  },
  cardWrap: {
    width: 260,
    marginRight: 12,
  },
});
