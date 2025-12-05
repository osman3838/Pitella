import type { IconProps } from '@/types';
import React from 'react';
import Svg, { G, Path,Defs } from 'react-native-svg';
import { defaultIconProps, withIcon } from '../Icon';

function Mail({
  size = defaultIconProps.size,
  color = defaultIconProps.color,
  ...rest
}: IconProps) {
  return (
  <Svg
      id="katman_2"
      data-name="katman 2"
      viewBox="0 0 49.45 38.84"
      {...rest}
    >
      <Defs></Defs>
      <G id="Layer_1" data-name="Layer 1">
        <G id="layer2">
          <G id="g10495">
            <Path
              id="rect8403"
              className="cls-1"
              d="M8.19 0C3.68 0 0 3.68 0 8.19v22.47c0 4.5 3.68 8.19 8.19 8.19h33.08c4.5 0 8.18-3.68 8.18-8.19V8.19c0-4.5-3.68-8.19-8.18-8.19H8.19zm0 3.53h33.08c2.61 0 4.65 2.05 4.65 4.65v22.47c0 2.61-2.04 4.65-4.65 4.65H8.19c-2.61 0-4.65-2.05-4.65-4.65V8.19c0-2.61 2.05-4.65 4.65-4.65z"
            />
            <Path
              id="path8745"
              className="cls-1"
              d="M7.65 9.31c-.71.67-.74 1.78-.08 2.49l11.91 12.63c2.96 2.63 7.8 2.64 10.11.01l12.29-12.63c.68-.7.66-1.82-.03-2.5-.7-.68-1.82-.66-2.5.03L27.07 21.96c-1.35 1.37-3.65 1.33-5.08-.03L10.15 9.37c-.78-.81-1.76-.69-2.49-.07z"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default withIcon(Mail, 'Mail');

