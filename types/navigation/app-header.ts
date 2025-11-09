import type { AppText } from '@/components/ui/AppText';
import type { PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';



export interface LeftHeaderProps {
  onMenuPress?: () => void;
  
  userAvatar?: string | null;
  
  onAvatarPress?: () => void;
}


export interface CenterHeaderProps {
  onMenuPress?: () => void;
  
  
}


