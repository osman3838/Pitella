import type { IconProps } from '@/types';
import React from 'react';

import * as Navigation from './navigation';
import * as Social from './social';
import * as FoodCard from './food_card';
import * as Profile from './profile';
import * as İnput from './input';
import * as Category from "./category"
import * as SSS from "./sss"
export const ICONS = {
  ...Social,
  ...Navigation,
  ...FoodCard,
  ...Profile,
  ...İnput,
  ...Category,
  ...SSS
} as const;

export type IconName = keyof typeof ICONS;

export default function Icon({ name, ...props }: IconProps & { name: IconName }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp {...props} />;
}

export { defaultIconProps, withIcon } from './Icon';
export * from './navigation';
export * from './social';
export * from './food_card';
export * from './profile';
export * from "./input";
export * from "./category";
export * from "./sss";


