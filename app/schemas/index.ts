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