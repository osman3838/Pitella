import type { IconProps } from '@/types';
import React from 'react';
import Svg, { Path,Defs,G } from 'react-native-svg';
import { defaultIconProps, withIcon } from '../Icon';

function Google({color, size = defaultIconProps.size, ...rest }: IconProps) {
  return (
     <Svg
      id="katman_2"
      data-name="katman 2"
      viewBox="0 0 31.87 31.87"
      {...rest }
      width={size}
      height={size}
      fill={color}

    >

      <Defs></Defs>
      <G id="katman_1" data-name="katman 1">
        <Path
          className="cls-1"
          d="M17.21 8.24c.02.71-.5 1.27-1.32 1.27-.73 0-1.25-.57-1.25-1.27s.54-1.3 1.3-1.3 1.27.57 1.27 1.3zM14.9 22.86V11.44h2.08v11.42H14.9z"
        />
        <Path
          className="cls-1"
          d="M15.94 31.87C7.15 31.87 0 24.72 0 15.94S7.15 0 15.94 0s15.94 7.15 15.94 15.94-7.15 15.94-15.94 15.94zm0-30.18c-7.86 0-14.25 6.39-14.25 14.25s6.39 14.24 14.24 14.24 14.24-6.39 14.24-14.24S23.79 1.69 15.94 1.69z"
        />
      </G>
    </Svg>
  );
}

export default withIcon(Google, 'Google');
