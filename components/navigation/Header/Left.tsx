import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from '@/components/ui/Avatar';
import { LeftHeaderProps } from '@/types';

const Left = ({ onMenuPress, userAvatar, onAvatarPress }: LeftHeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View >
      <View style={styles.content}>
        <Avatar source={require('@/assets/images/react-logo.png')} size={66} rounded={18} fallbackColor="#E5E5E5" />
    

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
});

export default Left;