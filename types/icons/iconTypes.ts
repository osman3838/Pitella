// src/types/icons/iconTypes.ts
export interface IconProps {
  size?: number;          // px
  color?: string;         // fill/stroke rengi
  strokeWidth?: number;   // sadece stroke ikonlarda işe yarar
  style?: object;
}

export type IconComponent = React.FC<IconProps>;
