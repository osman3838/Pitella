import { ReactNode } from 'react';
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export type BadgeItem = {
  key: string;
  icon?: string;
  label?: string;
  onPress?: () => void;
};

export type ActionItem = {
  key: string;
  icon?: string;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export type PriceInfo = {
  value: number | string;
  unit?: string;
  hidden?: boolean;
};

export interface FoodCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  rating?: { value: number; count?: number };
  price?: PriceInfo;
  right?: ReactNode;

  badges?: BadgeItem[];
  actions?: ActionItem[];

  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentRight?: ReactNode;
  contentBottom?: ReactNode;
}

