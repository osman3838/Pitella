import type { IconProps } from '@/types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { defaultIconProps, withIcon } from '../Icon';

function Balance({
  size = defaultIconProps.size,
  color = defaultIconProps.color,
  ...rest
}: IconProps) {
  return (
     <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 440 440"
      {...rest}
    >
      <Path d="M344.33 212.5c0 103.857-80.577 189.248-182.5 196.936V197.361l151.76-55.236-10.26-28.191-141.5 51.502V121.38l151.76-55.236-10.26-28.191-141.5 51.502V0h-30v100.374l-66.16 24.08 10.261 28.191L131.83 132.3v44.055l-66.16 24.08 10.261 28.191 55.899-20.346V440h15c60.813 0 117.957-23.651 160.902-66.597 42.946-42.946 66.598-100.089 66.598-160.903h-30z" />
    </Svg>
  );
}

export default withIcon(Balance, 'Balance');

