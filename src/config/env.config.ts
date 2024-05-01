import { z } from "zod";
import { config as cfg } from "dotenv";
import path, { dirname, join } from "path";

// Define the path to the .env file manually
const envFilePath = "./.env";

// Resolve the absolute path to the .env file
const __dirname = path.resolve(path.dirname(''), './');
const resolvedEnvFilePath = path.resolve(__dirname, envFilePath);

// Load environment variables from the .env file
cfg({ path: resolvedEnvFilePath });

// Define the schema using zod
const envVarsSchema = z.object({
  PORT: z.string().optional(),
  ENVIROMENT: z
    .string({ invalid_type_error: "Environment must be in string." })
    .optional(),
  jWTSECRECTKEY: z
    .string({ invalid_type_error: "Jwt security key must be in string." })
    .optional(),
});

let envVars;
// Parse and validate the environment variables
try {
  envVars = envVarsSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(`Env validation error: ${JSON.stringify(error.errors, null, 2)}`);
  } else {
    throw error;
  }
}
// Export the validated config
export const config = {
  app: {
    port: envVars.PORT,
    env: envVars.ENVIROMENT,
  },
  authSettings: {
    jwtSecretKey: envVars.jWTSECRECTKEY,
  },
} as const;
