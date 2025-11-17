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

  const setAt = (idx: number, ch: string) => {
    if (value != null) {
      const next = code.split('');
      next[idx] = ch;
      const joined = next.join('').slice(0, length);

      onChangeText?.(joined);

      // tüm slotlar doluysa complete
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
    // 🔹 SİLME DURUMU: kullanıcı backspace ile bu inputu boşalttı
    if (text === '') {
      setAt(idx, '');
      return;
    }

    const chars = text.replace(/\s+/g, '').split('');

    // tek karakter girilmişse
    if (chars.length <= 1) {
      if (!chars[0]) return;
      setAt(idx, chars[0]);
      if (idx < length - 1) inputs.current[idx + 1]?.focus();
      return;
    }

    // paste / çoklu giriş
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

      // slot dolu ise sadece bu slotu temizle
      if (current) {
        setAt(idx, '');
        return;
      }

      // zaten boşsa bir önceki inputa fokus
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
    <View style={[styles.row, { columnGap: gap }, containerStyle]}>
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
            style={[styles.box, boxStyle]}
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
    overflow: 'hidden',
  },
  box: {
    width: 58,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: '#fff',
    overflow: 'hidden',
    fontSize: 22,
    fontWeight: '700',
  },
});

export default OTPInput;
