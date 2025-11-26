import type { IconProps } from '@/types';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { defaultIconProps, withIcon } from '../Icon';

function UserIcon({
  size = defaultIconProps.size,
  color = defaultIconProps.color,
  ...rest
}: IconProps) {
  return (
    <Svg
      viewBox="0 0 51.45 51.45"
      width={size}
      height={size}
      fill="none"
      {...rest}
    >
      <Path
        d="M24.18 1.05C12.24 1.78 2.36 11.21 1.14 23.11c-.77 7.45 1.78 14.33 6.35 19.31.7.77 1.99.42 2.18-.6 1.45-7.55 8.09-13.25 16.06-13.25 4.51 0 8.6 1.83 11.56 4.79 2.26 2.26 3.87 5.18 4.49 8.45.2 1.03 1.48 1.37 2.19.59 4.02-4.4 6.47-10.24 6.47-16.67C50.45 11.56 38.53.17 24.18 1.05z"
        stroke={color}
        strokeWidth={2}
        strokeMiterlimit={10}
      />

      <Circle
        cx={25.73}
        cy={25.73}
        r={24.73}
        stroke={color}
        strokeWidth={2}
        strokeMiterlimit={10}
      />

      <Path
        d="M27.18 24.47c-5.86.96-10.85-4.03-9.89-9.89.58-3.55 3.44-6.41 6.99-6.99 5.86-.96 10.85 4.03 9.89 9.89-.58 3.55-3.44 6.41-6.99 6.99z"
        stroke={color}
        strokeWidth={2}
        strokeMiterlimit={10}
      />
    </Svg>
  );
}

export default withIcon(UserIcon, 'User');
