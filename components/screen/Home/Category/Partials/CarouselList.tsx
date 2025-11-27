import Carousel from '@/components/common/Carousel';
import React from 'react';

type CarouselListProps<T> = {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  itemWidth?: number;
  itemHeight?: number;
  sidePadding?: number;
  gap?: number;
  loop?: boolean;
  autoPlay?: boolean;
};

export default function CarouselList<T>({
  data,
  renderItem,
  keyExtractor,
  itemWidth,
  itemHeight,
  sidePadding = 16,
  gap = 12,
  loop = false,
  autoPlay = false,
}: CarouselListProps<T>) {
  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      sidePadding={sidePadding}
      gap={gap}
      loop={loop}
      autoPlay={autoPlay}
      parallax
    />
  );
}
