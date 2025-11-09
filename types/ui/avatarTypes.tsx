import type { ReactNode } from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';

export type AvatarProps = {
  source?: any;                 
  size?: number;                
  rounded?: number;             
  fallbackColor?: string;       
  borderColor?: string;
  borderWidth?: number;
  style?: ViewStyle | ImageStyle;
  children?: ReactNode;        
};
