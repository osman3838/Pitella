import type { IconProps } from '@/types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { defaultIconProps, withIcon } from '../Icon';

function Review({
  size = defaultIconProps.size,
  color = defaultIconProps.color,
  ...rest
}: IconProps) {
  return (
    <Svg
      height={size}
      viewBox="0 0 48 48"
      width={size}
      {...rest}
    >
      <Path
        d="M34.865 39.83l-10.25-5.621-10.153 5.8 2.091-11.647-8.563-8.027 11.542-1.577L24.394 8l5.042 10.672L41 20.047l-8.426 8.173z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeWidth={0}
        fillRule="evenodd"
      />
    </Svg>
  );
}
export default withIcon(Review, 'Review');
