import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  onCancel: () => void;
  onSubmit?: (t: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

export default function SearchInput({
  value,
  onChangeText,
  onCancel,
  onSubmit,
  placeholder = 'Ara...',
  autoFocus = true,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={s.row}>
      <TextInput
        autoFocus={autoFocus}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        returnKeyType="search"
        onSubmitEditing={() => onSubmit?.(value)}
        style={[
          s.input,
          { borderColor: colors.secondary, color: colors.text, backgroundColor: colors.surface },
        ]}
      />
      <TouchableOpacity onPress={onCancel} style={s.cancel} accessibilityRole="button" accessibilityLabel="Aramayı kapat">
        <AppText weight="medium">İptal</AppText>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10 },
  input: { flex: 1, borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16 },
  cancel: { paddingHorizontal: 8, paddingVertical: 6 },
});
