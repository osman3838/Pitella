export type HeroVariant =
  | 'left-text'
  | 'right-text'
  | 'center'
  | 'image-only';

export type HeroImageSource =
  | { uri: string }
  | number;

export type HeroStyle = {
  height?: number;
  radius?: number;
  overlay?: number;
};

export type HeroCta = {
  label: string;
  onPress: () => void;
};

export type HeroModel = {
  title: string;
  subtitle?: string;
  image: HeroImageSource;
  variant?: HeroVariant;
  style?: HeroStyle;
  cta?: HeroCta;
};
