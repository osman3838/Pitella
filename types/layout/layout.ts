import { ViewStyle } from 'react-native';

export interface ScreenContainerProps {
  header?: React.ReactNode;    
  footer?: React.ReactNode;      
  children?: React.ReactNode;
  cta?: React.ReactNode;         
  contentContainerStyle?: ViewStyle;
  testID?: string;
}

export interface AuthLayoutProps extends Omit<ScreenContainerProps, 'header'> {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  children?: React.ReactNode;
  hero?: React.ReactNode;    
  avatar?: React.ReactNode;  
}