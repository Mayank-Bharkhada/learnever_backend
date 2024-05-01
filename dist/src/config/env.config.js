function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
import { z } from "zod";
import { config as cfg } from "dotenv";
import path from "path";
// Define the path to the .env file manually
var envFilePath = "./.env";
// Resolve the absolute path to the .env file
var __dirname = path.resolve(path.dirname(''), './');
var resolvedEnvFilePath = path.resolve(__dirname, envFilePath);
// Load environment variables from the .env file
cfg({
    path: resolvedEnvFilePath
});
// Define the schema using zod
var envVarsSchema = z.object({
    PORT: z.string().optional(),
    ENVIROMENT: z.string({
        invalid_type_error: "Environment must be in string."
    }).optional(),
    jWTSECRECTKEY: z.string({
        invalid_type_error: "Jwt security key must be in string."
    }).optional()
});
var envVars;
// Parse and validate the environment variables
try {
    envVars = envVarsSchema.parse(process.env);
} catch (error) {
    if (_instanceof(error, z.ZodError)) {
        throw new Error("Env validation error: ".concat(JSON.stringify(error.errors, null, 2)));
    } else {
        throw error;
    }
}
// Export the validated config
export var config = {
    app: {
        port: envVars.PORT,
        env: envVars.ENVIROMENT
    },
    authSettings: {
        jwtSecretKey: envVars.jWTSECRECTKEY
    }
};
