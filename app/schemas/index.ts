import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required.",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100),
});

export const LoginSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).max(100),
});
