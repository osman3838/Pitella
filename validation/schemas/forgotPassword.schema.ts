import { z } from 'zod';
import { MSG, isEmail, normalizePhone, strongPassword } from '../helpers';

export const forgotPasswordSchema = z.object({
  identifier: z
    .string({ required_error: MSG.required })
    .trim()
    .min(1, { message: MSG.required })
    .superRefine((val, ctx) => {
      const emailOk = isEmail(val);
      const phoneNorm = normalizePhone(val);
      const phoneOk = /^(\+?\d{7,15})$/.test(phoneNorm);

      if (!emailOk && !phoneOk) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Geçerli bir e-posta ya da telefon girin',
          path: ['identifier'],
        });
        return;
      }
    })
    .transform((val) => {
      if (isEmail(val)) return val.trim().toLowerCase();
      return normalizePhone(val);
    }),
});

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const forgotCodeSchema = z.object({
  code: z
    .string({ required_error: MSG.required })
    .trim()
    .min(4, { message: 'Kod en az 4 haneli olmalı' })
    .max(8, { message: 'Kod en fazla 8 haneli olmalı' })
    .refine((v) => /^\d{4,8}$/.test(v), { message: 'Geçerli bir kod girin' }),
});

export type ForgotCodeForm = z.infer<typeof forgotCodeSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: MSG.required })
      .refine(strongPassword, { message: MSG.password }),
    confirm: z.string({ required_error: MSG.required }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm) {
      ctx.addIssue({
        path: ['confirm'],
        code: z.ZodIssueCode.custom,
        message: MSG.passwordsNotMatch,
      });
    }
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
