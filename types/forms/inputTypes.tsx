import React from 'react';
import { TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type FormTextInputHandles = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getNativeRef: () => TextInput | null;
};

export type FormTextInputProps = {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  enablePasswordToggle?: boolean;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  borderColor?: string;
  hintStyle?: TextStyle;
  testID?: string;
} & Pick<TextInputProps,
  | 'keyboardType'
  | 'inputMode'
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'autoComplete'
  | 'textContentType'
  | 'returnKeyType'
  | 'onSubmitEditing'
  | 'editable'
  | 'maxLength'
  | 'multiline'
  | 'numberOfLines'
  | 'selectionColor'
  | 'textAlign'
  | 'selectTextOnFocus'
>;
