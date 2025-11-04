import { TextProps } from 'react-native';

export interface AppTextProps extends TextProps {
  /**
   * Font ağırlığı
   * @default 'regular'
   */
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';

  /**
   * Yazı rengi
   * @default theme.colors.text
   */
  color?: string;

  /**
   * Font boyutu
   * @default 16
   */
  size?: number;

  /**
   * Hizalama tipi
   * @default 'auto'
   */
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}
