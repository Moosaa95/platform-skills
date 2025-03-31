import { z } from "zod";

export const basicSchema = z.object({
  first_name: z.string().min(50).max(500),
  last_name: z.string().min(50).max(500),
});

export const passwordSchema = z.object({
  password: z.string().min(8),
  re_password: z.string(),
}).refine(data => data.password === data.re_password, {
  message: "Passwords don't match",
  path: ["re_password"],
});

// @ts-ignore
export const registerSchema = basicSchema.merge(passwordSchema)