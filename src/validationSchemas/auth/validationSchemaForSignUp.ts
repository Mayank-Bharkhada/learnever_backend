import { z } from "zod";

export const validationSchemaForSignUp = z.object({
    name: z
      .string({
        invalid_type_error: "Name must be in String.",
        required_error: "Name is required",
      })
      .trim()
      .min(1, {
        message: "Name is required",
      }),
    email: z
      .string({
        required_error: "email  is required",
      })
      .trim()
      .min(1, {
        message: "email is required",
      })
      .email(),
    password: z
      .string({
        invalid_type_error: "Password must be in String.",
        required_error: "Password is required",
      })
      .trim()
      .min(1, {
        message: "Password is required",
      }),
  });