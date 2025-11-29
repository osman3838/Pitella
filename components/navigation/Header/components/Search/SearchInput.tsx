import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

type Props = {
  visible: boolean;
  value: string;
  onChangeText: (t: string) => void;
  onCancel: () => void;
  onSubmit?: (t: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

export default function SearchInput({
  visible,
  value,
  onChangeText,
  onCancel,
  onSubmit,
  placeholder = 'Ara...',
  autoFocus = true,
}: Props) {
  const { colors } = useTheme();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <Pressable style={s.backdrop} onPress={onCancel}>
        <View style={s.centerWrapper}>
          <Pressable
            style={[s.card, { backgroundColor: colors.surface }]}
            onPress={() => {}}
          >
            <View style={s.headerRow}>
              <AppText weight="medium" size={16}>
                Arama
              </AppText>
            </View>

            <View style={s.inputRow}>
              <TextInput
                autoFocus={autoFocus}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.mutedText}
                returnKeyType="search"
                onSubmitEditing={() => onSubmit?.(value)}
                style={[
                  s.input,
                  {
                    borderColor: colors.border,
                    color: colors.text,
                    backgroundColor: colors.background,
                  },
                ]}
              />
            </View>

            <View style={s.footerRow}>
              <Pressable onPress={onCancel} style={s.cancelBtn}>
                <AppText weight="medium" color="gray">
                  İptal
                </AppText>
              </Pressable>
              {onSubmit && (
                <Pressable
                  onPress={() => onSubmit(value)}
                  style={[s.applyBtn, { backgroundColor: colors.primary }]}
                >
                  <AppText weight="medium" color={colors.onPrimary ?? 'white'}>
                    Ara
                  </AppText>
                </Pressable>
              )}
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  centerWrapper: {
    width: '100%',
  },
  card: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  headerRow: {
    marginBottom: 8,
  },
  inputRow: {
    marginTop: 4,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  applyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
});
