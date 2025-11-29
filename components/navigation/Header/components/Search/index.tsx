import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
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
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    onChange?.('');
  }, [onChange]);

  return (
    <View>
      <SearchButton size={20} onPress={() => setOpen(true)} />

      <SearchInput
        visible={open}
        value={query}
        onChangeText={t => {
          setQuery(t);
          onChange?.(t);
        }}
        onSubmit={t => {
          onSubmit?.(t);
        }}
        onCancel={close}
        placeholder={placeholder}
        autoFocus
      />
    </View>
  );
}

export { default as SearchButton } from './SearchButton';
export { default as SearchInput } from './SearchInput';

