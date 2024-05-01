import { z } from "zod";

export const validationSchemaForSignIn = z.object({
    email: z
      .string({
        invalid_type_error: "Email must be in String.",
        required_error: "email  is required",
      })
      .trim()
      .email()
      .min(1, {
        message: "roleId is required",
      }),
    password: z
      .string({
        invalid_type_error: "Password must be in String.",
        required_error: "Password  is required",
      })
      .trim()
      .min(1, {
        message: "password is required",
      }),
  });