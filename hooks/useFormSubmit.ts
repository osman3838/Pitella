import { useCallback } from 'react';
import type { FieldValues, SubmitErrorHandler, UseFormReturn } from 'react-hook-form';

type Options<T extends FieldValues> = {
  onValid: (data: T) => Promise<void> | void;
  onInvalid?: SubmitErrorHandler<T>;
  shouldFocusOnError?: boolean; // default true
};

export function useFormSubmit<T extends FieldValues>(
  form: UseFormReturn<T>,
  opts: Options<T>
) {
  const { handleSubmit, trigger } = form;
  const { onValid, onInvalid, shouldFocusOnError = true } = opts;

  const submit = useCallback(async () => {
    const isOk = await form.trigger(undefined, { shouldFocus: shouldFocusOnError });
    if (isOk) {
      await handleSubmit(onValid, onInvalid)(undefined as any);
    } else {
      // RHF kendi focusunu yapar (shouldFocusOnError=true). Ekstra bir şey istersen onInvalid içinde yap.
      onInvalid?.(form.formState.errors, undefined as any);
    }
  }, [form, handleSubmit, onValid, onInvalid, shouldFocusOnError]);

  return { submit };
}
