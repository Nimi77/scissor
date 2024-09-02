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
    .min(8, { message: "Password must be at least 8 characters" })
    .max(60, { message: "Password must be less than 60 characters" })
    .trim(),
});

export const RegisterSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is required " })
      .min(4, { message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .max(60, { message: "Password must be less than 60 characters" })
      .trim(),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(1, { message: "Password is required" })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, "Token is required."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
