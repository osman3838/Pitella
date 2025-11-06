import type { FieldError, FieldValues, UseFormSetError } from 'react-hook-form';
import type { ServerErrors } from './types';

/** Backend’ten dönen hataları RHF alanlarına dağıtır */
export function applyServerErrors<TFieldValues extends FieldValues>(
  serverErrors: ServerErrors,
  setError: UseFormSetError<TFieldValues>,
) {
  if (!serverErrors) return;

  // 1) { field: ["msg"] } veya { field: "msg" }
  if (serverErrors && typeof serverErrors === 'object' && !Array.isArray(serverErrors)) {
    Object.entries(serverErrors as Record<string, any>).forEach(([key, val]) => {
      const msg = Array.isArray(val) ? String(val[0]) : String(val);
      setError(key as keyof TFieldValues, { type: 'server', message: msg } as FieldError);
    });
    return;
  }

  // 2) [{ field, message }]
  if (Array.isArray(serverErrors)) {
    serverErrors.forEach(e => {
      const field = e?.field as keyof TFieldValues | undefined;
      const msg = e?.message || 'Geçersiz değer';
      if (field) {
        setError(field, { type: 'server', message: msg } as FieldError);
      }
    });
  }
}

/** İlk hatalı alana fokusla (ref haritası => RHF fieldName) */
export function focusFirstError<TFieldValues extends FieldValues>(
  errors: Record<string, any>,
  refs: Partial<Record<keyof TFieldValues, { focus?: () => void } | null>>,
) {
  const first = Object.keys(errors)[0] as keyof TFieldValues | undefined;
  if (!first) return;
  refs[first]?.focus?.();
}
