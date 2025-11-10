import React, { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
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
  parallax = true,
}: CarouselProps<T>) {
  const { width: screenWidth } = useWindowDimensions();
const width = useMemo(() => itemWidth ?? Math.round(screenWidth - sidePadding * 3), [itemWidth, screenWidth, sidePadding]);
const height = useMemo(() => itemHeight ?? Math.round(width * 0.625) + 160, [itemHeight, width]);

  const progress = useSharedValue(0);

  return (
    <View style={{ paddingHorizontal: sidePadding }}>
      <RCarousel
        width={width}
        height={height}
        data={data}
        loop={loop}
        autoPlay={autoPlay}
        autoPlayInterval={autoPlayInterval}
        onProgressChange={(_, absProgress) => {
          progress.value = absProgress;
        }}
        renderItem={({ item, index }) => (
          <View style={{ width }}>
            {renderItem({ item, index })}
          </View>
        )}
        mode={undefined}
        modeConfig={undefined}
      />

      <View style={s.dots}>
        {data.map((_, i) => (
          <Dot key={keyExtractor(_, i)} index={i} progress={progress} />
        ))}
      </View>
    </View>
  );
}

function Dot({ index, progress }: { index: number; progress: any }) {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [index - 1, index, index + 1], [1, 1.35, 1], Extrapolation.CLAMP);
    const opacity = interpolate(progress.value, [index - 1, index, index + 1], [0.4, 1, 0.4], Extrapolation.CLAMP);
    return { transform: [{ scale }], opacity };
  }, [index]);
  return <Animated.View style={[s.dot, rStyle]} />;
}

const s = StyleSheet.create({
  dots: { marginTop: 10, flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#999' },
});
