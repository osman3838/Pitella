import type { TextStyle, ViewStyle } from 'react-native';

export interface CheckBoxProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  size?: number;           
  radius?: number;         
  testID?: string;
  style?: ViewStyle;
}

export interface ConsentItemProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  testID?: string;
  containerStyle?: ViewStyle;
  title?: string;          
  text: string;            
  titleStyle?: TextStyle;
  textStyle?: TextStyle;
  actionText?: string;     
  onActionPress?: () => void;
}
