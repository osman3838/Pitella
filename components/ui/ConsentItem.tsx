import { AppText } from '@/components/ui/AppText';
import { useTheme } from '@/hooks/useTheme';
import type { ConsentItemProps } from '@/types/ui/checkboxTypes';
import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CheckBox } from '@/components/ui/CheckBox';

export const ConsentItem = memo(function ConsentItem({
  checked,
  onChange,
  disabled,
  testID,
  containerStyle,
  title,
  text,
  titleStyle,
  textStyle,
  actionText,
  onActionPress,
}: ConsentItemProps) {
  const { spacing, colors } = useTheme();

  return (
    <Pressable
      testID={testID}
      onPress={() => !disabled && onChange(!checked)}
      disabled={disabled}
      style={[styles.row, containerStyle]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <CheckBox checked={checked} onChange={onChange} disabled={disabled} />

      <View style={{ marginLeft: spacing.md, flex: 1 }}>
        {!!title && (
          <AppText
            weight="semiBold"
            size={15}
            color={disabled ? colors.mutedText : colors.text}
            style={[{ marginBottom: 2 }, titleStyle]}
          >
            {title}
          </AppText>
        )}

        <AppText
          size={13}
          color={disabled ? colors.mutedText : colors.text}
          style={[styles.text, textStyle]}
        >
          {text}
        </AppText>

        {!!actionText && (
          <Pressable
            onPress={onActionPress}
            disabled={disabled}
            hitSlop={6}
            style={{ alignSelf: 'flex-start', marginTop: 4 }}
          >
            <AppText
              size={12}
              weight="semiBold"
              color={colors.secondary}
              style={{ textDecorationLine: 'underline' }}
            >
              {actionText}
            </AppText>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  text: {
    lineHeight: 20,
  },
});
