import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
  useWindowDimensions,
} from 'react-native';

import type { OTPInputProps, OTPInputRef } from '@/types';

const allFilled = (arr: string[]) => arr.every((ch) => ch !== '');

export const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(function OTPInput(
  {
    length = 6,
    value,
    defaultValue = '',
    onChangeText,
    onComplete,
    autoFocus = true,
    editable = true,
    keyboardType = 'number-pad',
    containerStyle,
    boxStyle,
    gap = 12,
    secure = false,
  },
  ref,
) {
  const inputs = useRef<Array<TextInput | null>>([]);
  const [internal, setInternal] = useState<string[]>(
    Array.from({ length }, (_, i) => defaultValue[i] ?? ''),
  );

  const code = useMemo(
    () => (value != null ? value : internal.join('')),
    [value, internal],
  );

  const { width: screenWidth } = useWindowDimensions();

  // ScreenContainer içindeki padding'leri hesaba katıp,
  // satırın güvenli maksimum genişliğini hesapla
  const maxRowWidth = screenWidth - 80; // 2x padding + biraz nefes payı
  const totalGap = gap * (length - 1);
  const computedBoxWidth = Math.min(
    58, // büyük ekranda taşmasın diye üst limit
    (maxRowWidth - totalGap) / length,
  );

  const setAt = (idx: number, ch: string) => {
    if (value != null) {
      const next = code.split('');
      next[idx] = ch;
      const joined = next.join('').slice(0, length);

      onChangeText?.(joined);
      if (joined.length === length && allFilled(next)) {
        onComplete?.(joined);
      }
      return;
    }

    const next = [...internal];
    next[idx] = ch;
    setInternal(next);

    const joined = next.join('');
    onChangeText?.(joined);

    if (joined.length === length && allFilled(next)) {
      onComplete?.(joined);
    }
  };

  const distribute = (idx: number, text: string) => {
    if (text === '') {
      setAt(idx, '');
      return;
    }

    const chars = text.replace(/\s+/g, '').split('');

    if (chars.length <= 1) {
      if (!chars[0]) return;
      setAt(idx, chars[0]);
      if (idx < length - 1) inputs.current[idx + 1]?.focus();
      return;
    }

    for (let i = 0; i < chars.length && idx + i < length; i++) {
      setAt(idx + i, chars[i]);
    }
    const jump = Math.min(idx + chars.length, length - 1);
    inputs.current[jump]?.focus();
  };

  const handleKey = (
    idx: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      const current = (value != null ? code[idx] : internal[idx]) ?? '';

      if (current) {
        setAt(idx, '');
        return;
      }

      if (idx > 0) inputs.current[idx - 1]?.focus();
    }
  };

  useImperativeHandle(ref, () => ({
    focus: (index = 0) => inputs.current[index]?.focus(),
    clear: () => {
      if (value != null) {
        onChangeText?.('');
      } else {
        setInternal(Array.from({ length }, () => ''));
      }
      inputs.current[0]?.focus();
    },
  }));

  return (
    <View
      style={[
        styles.row,
        { columnGap: gap },
        containerStyle,
      ]}
    >
      {Array.from({ length }).map((_, idx) => {
        const char = value != null ? value[idx] ?? '' : internal[idx];
        return (
          <TextInput
            key={idx}
            ref={(el) => (inputs.current[idx] = el)}
            value={char}
            editable={editable}
            onChangeText={(t) => distribute(idx, t)}
            onKeyPress={(e) => handleKey(idx, e)}
            keyboardType={keyboardType}
            returnKeyType="next"
            textAlign="center"
            maxLength={1}
            autoFocus={autoFocus && idx === 0}
            textContentType="oneTimeCode"
            style={[
              styles.box,
              boxStyle,
              { width: computedBoxWidth },
            ]}
            secureTextEntry={secure}
            selectionColor="transparent"
          />
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  box: {
    height: 72,
    borderRadius: 18,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'center',
    fontSize: 32,
    fontWeight: '700',
    elevation: 4,
    shadowColor: '#00000022',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});

export default OTPInput;
