import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import { Images } from "@/assets/index";
import { AppText } from '@/components/ui/AppText'; // path’i projene göre düzelt
import type { CampaignCardProps } from '@/types';

export const CampaignCard: React.FC<CampaignCardProps> = ({
  title,
  discountText,
  description,
  code,
  expiresAt,
  image,
  onPress,
}) => {
  const Wrapper: any = onPress ? Pressable : View;

  return (
    <Wrapper style={styles.container} onPress={onPress}>
      <ImageBackground
        source={Images.Home.Campaign.Campaign}
        style={styles.image}
        imageStyle={styles.imageBorder}
        resizeMode="cover"
      >
        <LinearGradient
          // Soldan koyu, sağa doğru azalan gradient: tasarımdaki gibi
          colors={['rgba(0,0,0,0.75)', 'rgba(0,0,0,0.15)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.overlay}
        >
          <View style={styles.row}>
            {/* Sol metin alanı */}
            <View style={styles.left}>
              <AppText
                weight="medium"
                size={14}
                color="#F5F5F5"
                style={styles.title}
                numberOfLines={1}
              >
                {title}
              </AppText>

              <AppText
                weight="bold"
                size={28}
                color="#FFFFFF"
                style={styles.discount}
                numberOfLines={1}
              >
                {discountText}
              </AppText>

              {!!description && (
                <AppText
                  size={11}
                  color="#F0F0F0"
                  style={styles.description}
                  numberOfLines={3}
                >
                  {description}
                </AppText>
              )}

              {!!expiresAt && (
                <AppText
                  size={10}
                  color="#D6D6D6"
                  style={styles.expires}
                  numberOfLines={1}
                >
                  {expiresAt}
                </AppText>
              )}
            </View>

            {/* Sağdaki KOD kutusu */}
            {!!code && (
              <View style={styles.codeBox}>
                <AppText
                  weight="medium"
                  size={10}
                  color="#E5E5E5"
                  style={styles.codeLabel}
                >
                  KOD :
                </AppText>

                <AppText
                  weight="bold"
                  size={20}
                  color="#FFFFFF"
                  style={styles.codeValue}
                  numberOfLines={1}
                >
                  {code}
                </AppText>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    width: '100%',
    minHeight: 140,
    justifyContent: 'flex-end',
  },
  imageBorder: {
    borderRadius: 18,
  },
  overlay: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  left: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    marginBottom: 2,
  },
  discount: {
    marginBottom: 6,
  },
  description: {
    lineHeight: 16,
    marginBottom: 10,
  },
  expires: {
    marginTop: 2,
  },
  codeBox: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  codeLabel: {
    marginBottom: 2,
    letterSpacing: 1,
  },
  codeValue: {
    lineHeight: 16,
  },
});
