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
}
