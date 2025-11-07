import type { IconProps } from '@/types';
import Svg, { Path } from "react-native-svg";

import { defaultIconProps, withIcon } from "../Icon";
function Search({
  size = defaultIconProps.size,
  color = defaultIconProps.color,
  ...rest
}: IconProps) {
      return (
    <Svg
      width={size}  
      height={size}
      viewBox="0 0 1000 1000"
      {...rest}
    >
      <Path
        d="M981.75 893.54L788.19 699.89c144.83-193.55 105.34-467.86-88.21-612.7C506.43-57.63 232.12-18.14 87.28 175.41-57.55 368.95-18.06 643.27 175.49 788.1c155.47 116.34 369.01 116.34 524.49 0l193.65 193.65c24.33 24.33 63.79 24.33 88.12 0 24.33-24.33 24.33-63.79 0-88.12v-.08zm-542.4-142.81c-172.02 0-311.46-139.45-311.46-311.46S267.33 127.8 439.35 127.8s311.46 139.45 311.46 311.46c-.18 171.94-139.52 311.28-311.46 311.46z"
        fill={color}
      />

    </Svg>
  )
}

export default withIcon(Search, 'Search');
