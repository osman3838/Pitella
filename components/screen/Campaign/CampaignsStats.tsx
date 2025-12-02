import { AppText } from '@/components/ui/AppText';
import StatCard from '@/components/ui/cards/StatCards/StatCard';
import { useTheme } from '@/hooks/useTheme';
import Icon from '@/icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type CampaignsStatsProps = {
  stats: {
    points: number;
    favorites: number;
  };
};

export default function CampaignsStats({ stats }: CampaignsStatsProps) {
  const { colors } = useTheme();

  return (
    <View style={s.container}>
      <View style={s.labelRow}>
    
      
      </View>

      <View style={s.cardsRow}>
        <View style={{flex:1,display:"flex",gap:10}} >
                <AppText  size={14} weight="medium">
          Puanlarım <Icon name='Review' size={14} color={colors.yellow}/>
        </AppText>

        <StatCard value={stats.points} />
        </View>
        <View style={{flex:1,display:"flex",gap:10}}>
  <AppText size={14} weight="medium">
          Favoriler <Icon name="Review" size={14} color={colors.primaryDark}/>
        </AppText>
        <StatCard value={stats.favorites} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  cardsRow: {
    display:"flex",
    justifyContent:"space-between",
    flexDirection: 'row',
    gap: 12,
  },
});
