import type { IconProps } from '@/types';
import React from 'react';

import * as Navigation from './navigation';
import * as Social from './social';

export const ICONS = {
  ...Social,
  ...Navigation,
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

