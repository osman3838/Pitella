import { FieldErrors } from 'react-hook-form';
import type { TextInput } from 'react-native';
import Toast from 'react-native-toast-message';

type RefMap<T> = Partial<Record<keyof T, TextInput | null>>;

export function focusFirstError<T extends Record<string, any>>(
  errors: FieldErrors<T>,
  refs: RefMap<T>
) {
  const keys = Object.keys(errors) as (keyof T)[];
  for (const k of keys) {
    const ref = refs[k];
    if (ref && typeof ref.focus === 'function') {
      ref.focus();
      return;
    }
  }
}

export function useInvalidSubmit<T extends Record<string, any>>() {
  return (errors: FieldErrors<T>, refs?: RefMap<T>) => {
    Toast.show({
      type: 'error',
      text1: 'Formu kontrol et',
      text2: 'Eksik veya hatalı alanlar var.',
      position: 'top',
    });
    if (refs) focusFirstError<T>(errors, refs);
  };
}
