import React from 'react';
import { FlatList } from 'react-native';

export default function List<T>({
  data,
  renderItem,
  keyExtractor,
  contentContainerStyle,
}: {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  contentContainerStyle?: any;
}) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={[{ paddingVertical: 8, gap: 10 }, contentContainerStyle]}
    />
  );
}
