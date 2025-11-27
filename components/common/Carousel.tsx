import { useTheme } from '@/hooks/useTheme';
import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import RCarousel from 'react-native-reanimated-carousel';

type CarouselProps<T> = {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  sidePadding?: number;
  loop?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  parallax?: boolean;
};

export default function Carousel<T>({
  data,
  renderItem,
  keyExtractor,
  itemWidth,
  itemHeight,
  gap = 12,
  sidePadding = 40,
  loop = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  parallax = true, // şu an kullanılmıyor ama interface dursun
}: CarouselProps<T>) {
  const { width: screenWidth } = useWindowDimensions();

  // Sağ/sol padding sonrası kalan alan
  const containerWidth = useMemo(
    () => screenWidth - sidePadding * 2,
    [screenWidth, sidePadding],
  );

  // Kartın gerçek genişliği (2 kart + aradaki gap = containerWidth)
  const cardWidth = useMemo(
    () => itemWidth ?? Math.round((containerWidth - gap) / 2),
    [itemWidth, containerWidth, gap],
  );

  // Carousel slide genişliği: kart + boşluk payı
  const slideWidth = useMemo(
    () => cardWidth + gap,
    [cardWidth, gap],
  );

  const height = useMemo(
    () => itemHeight ?? Math.round(cardWidth * 0.625) + 160,
    [itemHeight, cardWidth],
  );

  const progress = useSharedValue(0);

  return (
    <View style={{ paddingHorizontal: sidePadding }}>
      <RCarousel
        width={slideWidth}               // slide genişliği
        height={height}
        data={data}
        loop={loop}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        onProgressChange={(_, absProgress) => {
          progress.value = absProgress;
        }}
        style={{ width: containerWidth }} // aynı anda 2 kartlık alan
        renderItem={({ item, index }) => (
          <View
            style={{
              width: slideWidth,
              paddingHorizontal: gap / 2,   // kartlar arası boşluk
            }}
          >
            <View style={{ width: cardWidth }}>
              {renderItem({ item, index })}
            </View>
          </View>
        )}
        mode={undefined}
        modeConfig={undefined}
      />

      {/* Dots: ortada, beyaz kapsül içinde */}
      <View style={styles.dots}>
        {data.map((item, i) => (
          <Dot key={keyExtractor(item, i)} index={i} progress={progress} />
        ))}
      </View>
    </View>
  );
}

function Dot({ index, progress }: { index: number; progress: any }) {
  const theme = useTheme();

  const rStyle = useAnimatedStyle(() => {
    // Boyut sabit, sadece opacity ile aktif/pasif efekti
    const opacity = interpolate(
      progress.value,
      [index - 1, index, index + 1],
      [0.4, 1, 0.4],
      Extrapolation.CLAMP,
    );

    return { opacity };
  }, [index]);

  return (
    <Animated.View
      style={[
        styles.dot,
        { backgroundColor: theme.colors.gold },
        rStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dots: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',       // ortala
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 14,     // kapsül iç yatay padding
    paddingVertical: 4,        // kapsül iç dikey padding
    borderRadius: 999,
    backgroundColor: '#ffffff', // beyaz kapsül
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
