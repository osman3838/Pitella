import { useTheme } from '@/hooks/useTheme';
import type { ScreenContainerProps } from '@/types';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Images } from '@/assets';

type BackProps = {
  showBack?: boolean;
  backLabel?: string;
  onBack?: () => void;
};

type Props = ScreenContainerProps &
  BackProps & {
    /**
     * sheet alanında, padding'den etkilenmeyen, istersen absolute verebileceğin slot
     */
    edgeContent?: React.ReactNode;
  };

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
  edgeContent,
}: Props) {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View
      style={[s.safe, { backgroundColor: colors.primaryDark }]}
      testID={testID}
    >
      <StatusBar barStyle="light-content" />

      <View
        style={[
          s.header,
          {
            backgroundColor: colors.primaryDark,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        {header}
        <Image
          source={Images.Logo}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>

      <View
        style={[
          s.sheet,
          { backgroundColor: colors.borderDark },
        ]}
      >
        {/* Dekor/overlay slotu */}
        {edgeContent && <View style={s.edgeWrap}>{edgeContent}</View>}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={[
              s.content,
              s.contentInner,
              contentContainerStyle,
            ]}
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
    flex: 6,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 16,
    overflow: 'visible',
    position: 'relative',
  },
  // overlay alanı (sheet referanslı)
  edgeWrap: {
    position: 'absolute',
    top: -40, // kırmızı alanla kesişsin istiyorsan burayı oynarsın
    right: 24,
    zIndex: 10,
  },
  content: {
    paddingTop: 8,
    flexGrow: 1,
  },
  contentInner: {
    paddingHorizontal: 54,
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
