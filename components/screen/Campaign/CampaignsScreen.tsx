import React from 'react';
import { ScrollView, StyleSheet,Image,  Text, View } from 'react-native';
import CampaignsHeader from './CampaignsHeader';
import CampaignsList from './CampaignsList';
import CampaignsMenu from './CampaignsMenu';
import CampaignsStats from './CampaignsStats';
import CampaignsWallet from './CampaignsWallet';
import { Images } from '@/assets';

export default function CampaignsScreen() {
  // Buraya RTK Query / API vs sonra bağlanır
  const user = { name: 'Hazal Kaya', createdAt: '11 Kasım 2025', avatarUrl: '' };
  const stats = { points: 400, favorites: 5 };
  const campaings = [{title:"deneme",subtitle:"deneme",price:22}]
  const wallet = { balance: 700, currency: '₺' };

  return (
   
     
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={{position:"absolute",height:80,width:80,bottom:10}}>
        <Image resizeMode='contain' source={Images.Campaings.Background01} style={{height:"100%",width:"100%"}}/>
      
      </View>
         <View style={{position:"absolute",height:80,width:80,bottom:500,right:-25,zIndex:1000}}>
             <Image resizeMode='contain' source={Images.Campaings.Background02} style={{height:"100%",width:"100%"}}/>
           
           </View>
      <CampaignsHeader user={user} />
      
      <CampaignsList campaigns={campaings} />
      <CampaignsStats stats={stats} />
      <CampaignsWallet wallet={wallet} />
      <CampaignsMenu />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F3F3',position:"relative" },
  content: {paddingVertical: 24,paddingBottom:50 },
});
