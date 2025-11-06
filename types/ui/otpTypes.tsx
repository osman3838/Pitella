import type { StyleProp, TextStyle, ViewStyle, KeyboardTypeOptions } from 'react-native';

export type OTPCode = string;

export interface OTPInputRef {
  focus: (index?: number) => void;
  clear: () => void;
}

export interface OTPInputProps {
  length?: number;
  value?: OTPCode;
  defaultValue?: OTPCode;
  onChangeText?: (code: OTPCode) => void;
  onComplete?: (code: OTPCode) => void;
  autoFocus?: boolean;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  containerStyle?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<TextStyle>;
  gap?: number;
  secure?: boolean;
}
