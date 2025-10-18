import * as z from "zod";

export const userSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email("Invalid email address"),
  status: z.string().optional(),
});

export const providerSchema = z.object({
  name: z.string(),
  node: z.string(),
  photoURL: z.string(),
  accountId: z.string(),
  isPayin: z.boolean(),
  isPayout: z.boolean(),
  isAvailable: z.boolean(),
});

export const transactionSchema = z.object({
  payinProvider: z.string(),
  payoutProvider: z.string(),
  payoutAccountId: z.string(),
  payinAccountId: z.string(),
  chargeId: z.string().nullable(),
  referenceId: z.string().nullable(),
  description: z.string().nullable(),
  payinStatus: z.string(),
  payinAmount: z.string(),
  payoutAmount: z.string(),
  rate: z
    .union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), {
      message: "Rate must be a number",
    }),
});

export const countrySchema = z.object({
  name: z.string(),
  countryCode: z.string(),
  address: z.string(),
  businessNumber: z.string(),
  currency: z.string(),
});

export type ZodUser = z.infer<typeof userSchema>;
export type ZodCountry = z.infer<typeof countrySchema>;
export type ZodProvider = z.infer<typeof providerSchema>;
export type ZodTransaction = z.infer<typeof transactionSchema>;
