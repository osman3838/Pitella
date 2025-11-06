import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues } from 'react-hook-form';
import { useForm, UseFormProps } from 'react-hook-form';
import type { ZodTypeAny } from 'zod';

export function useZodForm<TFieldValues extends FieldValues>(
  schema: ZodTypeAny,
  options?: Omit<UseFormProps<TFieldValues>, 'resolver'>
) {
  return useForm<TFieldValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    ...options,
  });
}
