import type { IconProps } from '@/types';
import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { defaultIconProps, withIcon } from '../Icon';

function Info({
  size = defaultIconProps.size,
  color = defaultIconProps.color,
  ...rest
}: IconProps) {
  return (
      <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 32 32"
      {...rest}
    >
      <G fill="none" stroke={color}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 14h1v9h1m12-7a13 13 0 11-26 0 13 13 0 0126 0z"
        />
        <Path fill={color} d="M17 9.5a1 1 0 11-2 0 1 1 0 012 0z" />
      </G>
    </Svg>
  );
}

export default withIcon(Info, 'Info');

