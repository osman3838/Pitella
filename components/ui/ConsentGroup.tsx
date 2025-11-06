// components/ui/ConsentGroup.tsx
import { ConsentItem } from '@/components/ui/ConsentItem';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Text, View } from 'react-native';

type Props = {
  kvkkText: string;
  kvkkActionText?: string;
  onKvkkAction?: () => void;
  contractTitle: string;
  contractText: string;
};

export function ConsentGroup({ kvkkText, kvkkActionText, onKvkkAction, contractTitle, contractText }: Props) {
  const { colors } = useTheme();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const kvkk = watch('kvkk');
  const contract = watch('contract');

  return (
    <View>
      <ConsentItem
        checked={!!kvkk}
        onChange={v => setValue('kvkk', v, { shouldValidate: true })}
        text={kvkkText}
        actionText={kvkkActionText}
        onActionPress={onKvkkAction}
      />
      {errors.kvkk ? <Text style={{ marginTop: 4, fontSize: 12, color: colors.danger }}>{String(errors.kvkk.message)}</Text> : null}

      <ConsentItem
        checked={!!contract}
        onChange={v => setValue('contract', v, { shouldValidate: true })}
        title={contractTitle}
        text={contractText}
      />
      {errors.contract ? (
        <Text style={{ marginTop: 4, fontSize: 12, color: colors.danger }}>{String(errors.contract.message)}</Text>
      ) : null}
    </View>
  );
}
