// types/ui/backButtonTypes.ts
export interface BackButtonProps {
  label?: string;          // default: "Geri Dön"
  onPress?: () => void;    // override için opsiyonel
  testID?: string;
  size?: number;           // default: 48
  radius?: number;         // default: 24
}
