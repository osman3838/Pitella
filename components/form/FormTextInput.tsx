import { useTheme } from '@/hooks/useTheme';
import type { FormTextInputHandles, FormTextInputProps } from '@/types/forms/inputTypes';
import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const BASE_MIN_HEIGHT = 48;

const FormTextInputInner = forwardRef<FormTextInputHandles, FormTextInputProps>((props, ref) => {
  const t = useTheme();
  const {
    label, value, defaultValue, onChangeText, onBlur, onFocus, placeholder, hint,
    error, touched, required, disabled, secureTextEntry, enablePasswordToggle,
    leftAdornment, rightAdornment, containerStyle, inputStyle, labelStyle, errorStyle,
    hintStyle, testID, keyboardType = 'default', inputMode, autoCapitalize = 'none',
    autoCorrect = false, autoComplete = 'off', textContentType, returnKeyType = 'done',
    onSubmitEditing, editable = !disabled, maxLength, multiline = false, numberOfLines,
    selectionColor, textAlign, selectTextOnFocus,
  } = props;

  const inputRef = useRef<TextInput>(null);
  const [internalSecure, setInternalSecure] = React.useState<boolean>(!!secureTextEntry);
  React.useEffect(() => setInternalSecure(!!secureTextEntry), [secureTextEntry]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    clear: () => inputRef.current?.clear(),
    getNativeRef: () => inputRef.current,
  }), []);

  const showError = !!error && (touched ?? true);

  const cs = StyleSheet.flatten(containerStyle) || {};
  const controlHeight: number =
    (typeof cs.height === 'number' && cs.height) ||
    (typeof cs.minHeight === 'number' && cs.minHeight) ||
    BASE_MIN_HEIGHT;

  const wrapperRadiusStyle = {
    borderRadius: cs.borderRadius,
    borderTopLeftRadius: cs.borderTopLeftRadius,
    borderTopRightRadius: cs.borderTopRightRadius,
    borderBottomLeftRadius: cs.borderBottomLeftRadius,
    borderBottomRightRadius: cs.borderBottomRightRadius,
  };

  const hasOuterPH = typeof cs.paddingHorizontal === 'number' || typeof cs.padding === 'number';
  const resolvedInputPaddingH = hasOuterPH ? 0 : t.spacing.sm;

  const a11yLabel = label
    ? `${label}${required ? ' (zorunlu)' : ''}`
    : (placeholder || 'metin girişi');

  const handleChangeText = useCallback((txt: string) => onChangeText?.(txt), [onChangeText]);
  const handleToggleSecure = useCallback(() => {
    if (enablePasswordToggle) setInternalSecure(s => !s);
  }, [enablePasswordToggle]);

  const styles = useMemo(() => createStyles(t), [t]);

  return (
    <View style={[styles.container, containerStyle]}>
      {!!label && (
        <Text style={[styles.label, { fontFamily: t.font?.family?.medium }, labelStyle]}>
          {label}{required ? ' *' : ''}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          { minHeight: controlHeight },
          wrapperRadiusStyle,
          showError && styles.inputWrapperError,
          disabled && styles.inputWrapperDisabled,
        ]}
      >
        {leftAdornment ? (
          <View style={[styles.adornment, { height: controlHeight }]}>{leftAdornment}</View>
        ) : null}

        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            {
              minHeight: controlHeight,
              paddingHorizontal: resolvedInputPaddingH,
              fontFamily: t.font?.family?.regular,
            },
            inputStyle,
          ]}
          defaultValue={defaultValue}
          value={value}
          onChangeText={handleChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          placeholderTextColor={t.colors.border}
          editable={editable}
          secureTextEntry={internalSecure}
          keyboardType={keyboardType}
          inputMode={inputMode as any}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          autoComplete={autoComplete as any}
          textContentType={textContentType as any}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          selectionColor={selectionColor ?? t.colors.primary}
          textAlign={textAlign}
          selectTextOnFocus={selectTextOnFocus}
          accessible
          accessibilityLabel={a11yLabel}
          accessibilityHint={hint}
          testID={testID}
        />

        {enablePasswordToggle && secureTextEntry && (
          <TouchableOpacity
            onPress={handleToggleSecure}
            style={[styles.eye, { height: controlHeight }]}
            accessibilityRole="button"
            accessibilityLabel={internalSecure ? 'Şifreyi göster' : 'Şifreyi gizle'}
          >
            <Ionicons
              name={internalSecure ? 'eye-outline' : 'eye-off-outline'}
              size={22}
              color={t.colors.mutedText}
            />
            
          </TouchableOpacity>
        )}

        {rightAdornment ? (
          <View style={[styles.adornment, { height: controlHeight }]}>{rightAdornment}</View>
        ) : null}
      </View>

      {showError ? (
        <Text
          style={[styles.error, { fontFamily: t.font?.family?.regular }, errorStyle]}
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      ) : hint ? (
        <Text style={[styles.hint, { fontFamily: t.font?.family?.book }, hintStyle]}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
});

const createStyles = (t: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: { marginBottom: t.spacing.md },
    label: {
      fontSize: 14,
      fontWeight: '600' as any,
      marginBottom: t.spacing.xs,
      color: t.colors.text,
      
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: t.colors.inputBg,  
      overflow: 'hidden',
    },
    inputWrapperError: { borderColor: t.colors.danger },
    inputWrapperDisabled: { opacity: 0.6 },
    adornment: {
      paddingLeft: 20,
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: "black",
    },
    eye: {
      paddingHorizontal: t.spacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      color: t.colors.danger,
      marginTop: t.spacing.xs,
      fontSize: 13,
    },
    hint: {
      color: t.colors.mutedText,
      marginTop: t.spacing.xs,
      fontSize: 12,
    },
  });

function areEqual(prev: FormTextInputProps, next: FormTextInputProps) {
  return (
    prev.label === next.label &&
    prev.value === next.value &&
    prev.placeholder === next.placeholder &&
    prev.error === next.error &&
    prev.touched === next.touched &&
    prev.required === next.required &&
    prev.disabled === next.disabled &&
    prev.secureTextEntry === next.secureTextEntry &&
    prev.enablePasswordToggle === next.enablePasswordToggle &&
    prev.keyboardType === next.keyboardType &&
    prev.returnKeyType === next.returnKeyType &&
    prev.multiline === next.multiline &&
    prev.numberOfLines === next.numberOfLines &&
    prev.maxLength === next.maxLength &&
    prev.autoCapitalize === next.autoCapitalize &&
    prev.autoCorrect === next.autoCorrect &&
    prev.autoComplete === next.autoComplete &&
    prev.textContentType === next.textContentType &&
    prev.inputMode === next.inputMode &&
    prev.selectionColor === next.selectionColor &&
    prev.textAlign === next.textAlign &&
    prev.selectTextOnFocus === next.selectTextOnFocus &&
    prev.containerStyle === next.containerStyle &&
    prev.inputStyle === next.inputStyle &&
    prev.labelStyle === next.labelStyle &&
    prev.errorStyle === next.errorStyle &&
    prev.hintStyle === next.hintStyle &&
    prev.leftAdornment === next.leftAdornment &&
    prev.rightAdornment === next.rightAdornment
  );
}

export const FormTextInput = memo(FormTextInputInner, areEqual);
