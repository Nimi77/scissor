import * as z from "zod";

export const AuthSchema = z.object({
  email: z
    .string()
    .email({ message: "Email is required " })
    .min(4, { message: "Invalid email address" })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100)
    .trim(),
});

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
