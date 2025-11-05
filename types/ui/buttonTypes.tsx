import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps extends PressableProps {
  title?: string;
  children?: ReactNode;

  variant?: ButtonVariant;
  size?: ButtonSize;

  loading?: boolean;
  block?: boolean;

  round?: boolean;

  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  /** Text overrides */
  titleColor?: string;
  titleSize?: number; // AppText size override
  titleWeight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  uppercase?: boolean;
  numberOfLines?: number;  // text truncation
  align?: 'left' | 'center' | 'right'; // content alignment

  /** Full control: forwarded to AppText */
  titleProps?: Partial<{
    size: number;
    weight: 'regular' | 'medium' | 'semiBold' | 'bold';
    color: string;
    align: 'left' | 'center' | 'right';
    numberOfLines: number;
    letterSpacing: number;
    lineHeight: number;
  }>;
}
