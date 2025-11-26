import { useTheme } from '@/hooks/useTheme';
import type { ScreenContainerProps } from '@/types';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { AppText } from '../ui/AppText';

type BackProps = {
  showBack?: boolean;
  backLabel?: string;
  onBack?: () => void;
};

type Props = ScreenContainerProps & BackProps;

export default function ScreenContainer({
  header,
  children,
  footer,
  cta,
  contentContainerStyle,
  testID = 'screen-container',
  showBack = false,
  backLabel = 'Geri Dön',
  onBack,
}: Props) {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[s.safe, { backgroundColor: colors.primaryDark }]} testID={testID}>
      <StatusBar barStyle="light-content" />
      

      <View style={[s.header, { backgroundColor: colors.primaryDark,display:'flex',justifyContent:'center',alignItems:'center' }]}>
        {header}
        <AppText color='white' align='center'  size={25} weight='bold' >Soupana</AppText>
      </View>

      <View style={[s.sheet, { backgroundColor: colors.borderDark }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={[s.content, contentContainerStyle]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {children}

            {!!footer && <View style={s.footer}>{footer}</View>}

            <View style={{ height: cta ? 120 : 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>


    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sheet: {
    flex: 4,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 54,
  },
  content: {
    paddingTop: 8,
    flexGrow: 1,
  },
  footer: { marginTop: 16 },
  ctaWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    alignItems: 'center',
  },
  ctaInner: {
    width: '88%',
    maxWidth: 520,
    alignSelf: 'center',
  },
});
