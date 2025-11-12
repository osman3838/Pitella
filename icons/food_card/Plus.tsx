import type { IconProps } from '@/types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { defaultIconProps, withIcon } from '../Icon';

function Plus({
  size = defaultIconProps.size,
  color = defaultIconProps.color,
  ...rest
}: IconProps) {
  return (
       <Svg
      height="50px"
      viewBox="0 0 50 50"
      width="50px"
      {...rest}
    >
      <Path fill="none" d="M0 0H50V50H0z" />
      <Path
        fill="none"
        stroke={color}
        strokeMiterlimit={10}
        strokeWidth={4}
        d="M9 25L41 25"
      />
      <Path
        fill="none"
        stroke={color}
        strokeMiterlimit={10}
        strokeWidth={4}
        d="M25 9L25 41"
      />
    </Svg>
  );
}
export default withIcon(Plus, 'Plus');
