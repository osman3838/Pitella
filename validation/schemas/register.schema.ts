import { z } from 'zod';
import { MSG, isEmail, normalizePhone, strongPassword } from '../helpers';

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, { message: MSG.required }),
    surname: z.string().trim().min(1, { message: MSG.required }),

    phone: z
      .string()
      .trim()
      .optional()
      .transform(v => (v ? normalizePhone(v) : undefined))
      .refine(v => (v ? /^(\+?\d{7,15})$/.test(v) : true), {
        message: MSG.phone,
      }),

    email: z.string().trim().toLowerCase().refine(isEmail, {
      message: MSG.email,
    }),

    password: z.string().refine(strongPassword, { message: MSG.password }),
    confirm: z.string(),

    invite_code: z
      .string()
      .trim()
      .max(32, { message: 'Davet kodu en fazla 32 karakter' })
      .optional()
      .or(z.literal('')),

    kvkk: z.boolean().optional(),
    contract: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm) {
      ctx.addIssue({
        path: ['confirm'],
        code: z.ZodIssueCode.custom,
        message: MSG.passwordsNotMatch,
      });
    }

    if (!data.kvkk) {
      ctx.addIssue({
        path: ['kvkk'],
        code: z.ZodIssueCode.custom,
        message: MSG.kvkk,
      });
    }

    if (!data.contract) {
      ctx.addIssue({
        path: ['contract'],
        code: z.ZodIssueCode.custom,
        message: MSG.contract,
      });
    }
  });

export type RegisterForm = z.infer<typeof registerSchema>;
