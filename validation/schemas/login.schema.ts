import { MSG, isEmail, normalizePhone } from '@/validation/helpers';
import { z } from 'zod';

export const loginSchema = z.object({
  email_or_phone: z
    .string()
    .trim()
    .min(1, { message: MSG.required })
    .superRefine((v, ctx) => {
      const val = v.trim();
      const phone = normalizePhone(val);

      const looksLikePhone = /^(\+?\d{7,15})$/.test(phone);
      const looksLikeEmail = isEmail(val);

      if (!looksLikePhone && !looksLikeEmail) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'E-posta ya da telefon girin',
        });
      }
    }),

  password: z.string().min(1, { message: MSG.required }),
});

export type LoginForm = z.infer<typeof loginSchema>;
