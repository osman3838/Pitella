import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/AppText';
import OTPInput from '@/components/ui/OTPInput';

type CodeSectionProps = {
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
  title?: string;
  helperText?: string;
};

export const CodeSection: React.FC<CodeSectionProps> = ({
  value,
  onChange,
  onComplete,
  title = 'Pizza kodunu giriniz.',
  helperText,
}) => {
  return (
    <View style={styles.container}>
      <AppText weight="medium" size={18} align="center">
        {title}
      </AppText>

      {helperText ? (
        <AppText
          size={13}
          align="center"
          style={styles.helper}
        >
          {helperText}
        </AppText>
      ) : null}

      <View style={styles.inputWrapper}>
        <OTPInput
          length={3}
          value={value}
          onChangeText={onChange}
          onComplete={onComplete}
          keyboardType="number-pad"
          autoFocus={false}
          gap={16}
          boxStyle={styles.otpBox}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
  },
  helper: {
    marginTop: 4,
    opacity: 0.7,
  },
  inputWrapper: {
    marginTop: 32,
  },
  otpBox: {
    width: 72,
    height: 92,
    borderRadius: 18,
    borderWidth: 0,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'center',
    fontSize: 32,
    fontWeight: '700',
    // shadow (Android + iOS)
    elevation: 4,
    shadowColor: '#00000022',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});

export default CodeSection;
