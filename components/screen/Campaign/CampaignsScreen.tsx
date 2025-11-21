import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import CampaignsHeader from './CampaignsHeader';
import CampaignsList from './CampaignsList';
import CampaignsMenu from './CampaignsMenu';
import CampaignsStats from './CampaignsStats';
import CampaignsWallet from './CampaignsWallet';

export default function CampaignsScreen() {
  // Buraya RTK Query / API vs sonra bağlanır
  const user = { name: 'Hazal Kaya', createdAt: '11 Kasım 2025', avatarUrl: '' };
  const stats = { points: 400, favorites: 5 };
  const campaings = [{title:"deneme",subtitle:"deneme",price:22}]
  const wallet = { balance: 700, currency: '₺' };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <CampaignsHeader user={user} />
      <CampaignsList campaigns={campaings} />
      <CampaignsStats stats={stats} />
      <CampaignsWallet wallet={wallet} />
      <CampaignsMenu />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F3F3' },
  content: { paddingHorizontal: 16, paddingVertical: 24 },
});
