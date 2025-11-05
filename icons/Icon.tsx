import type { IconProps } from '@/types';
import React from 'react';

export function withIcon(Comp: React.FC<IconProps>, displayName: string) {
  const Wrapped = React.memo((props: IconProps) => <Comp {...props} />);
  Wrapped.displayName = displayName;
  return Wrapped;
}

export const defaultIconProps = {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
} as const;
