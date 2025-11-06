import { useRef } from 'react';
import type { TextInput } from 'react-native';

export function useInputRefs<T extends string>(names: T[]) {
  const refs = names.reduce((acc, n) => {
    acc[n] = useRef<TextInput>(null);
    return acc;
  }, {} as Record<T, React.RefObject<TextInput>>);
  return refs;
}
