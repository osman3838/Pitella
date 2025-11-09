import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';

export type SearchProps = {
  onChange?: (q: string) => void;
  onSubmit?: (q: string) => void;
  defaultOpen?: boolean;
  placeholder?: string;
};

export default function Search({
  onChange,
  onSubmit,
  defaultOpen = false,
  placeholder,
}: SearchProps) {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    onChange?.('');
  }, [onChange]);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (open) {
        close();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [open, close]);

  return (
    <View >
      {open ? (
        <SearchInput
          value={query}
          onChangeText={(t) => {
            setQuery(t);
            onChange?.(t);
          }}
          onSubmit={(t) => onSubmit?.(t)}
          onCancel={close}
          placeholder={placeholder}
        />
      ) : (
        <SearchButton onPress={() => setOpen(true)} />
      )}
    </View>
  );
}

export { default as SearchButton } from './SearchButton';
export { default as SearchInput } from './SearchInput';

const styles = StyleSheet.create({
  container: { },
});
