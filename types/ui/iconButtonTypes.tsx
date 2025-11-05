import { ViewStyle } from "react-native";

export interface IconButtonProps {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: number;
  radius?: number;
  backgroundColor?: string;
  style?: ViewStyle;
  children?: React.ReactNode; 
}

