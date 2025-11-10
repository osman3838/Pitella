
import FoodCard from '@/components/ui/cards/FoodCard/FoodCard';
import React from 'react';
export default function CardItem({ item }: { item: any }) {
  return (
    <FoodCard
      image={item.image}
      title={item.title}
      subtitle={item.subtitle}
      rating={item.rating}
      price={item.price ? { value: item.price } : undefined}
      actions={[{ key: 'add', label: 'Ekle', icon: 'Plus', onPress: () => {} }]}
    />
  );
}
