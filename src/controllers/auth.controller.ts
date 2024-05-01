import { Response } from "express";
import { asyncMW } from "../utils/async-middleware.js";
import { AuthenticatedRequest } from "../types/request.js";;
import { jwtNumericDate, jwtSign } from "../lib/jwt.js";
import { createUser, findUserByEmail } from "../services/user.services.js";
import ResponseHandler from "../lib/responseHandler.js";
import { passwordHash, passwordMatch } from "../lib/security.js";
import { validationSchemaForSignUp } from "../validationSchemas/auth/validationSchemaForSignUp.js";
import { validationSchemaForSignIn } from "../validationSchemas/auth/validationSchemaForSignIn.js";

const TOKEN_EXP_TIME = 60 * 60;

export const signUp = asyncMW(
  async (req: AuthenticatedRequest, res: Response) => {
    const { email, password } = validationSchemaForSignUp.parse(req.body);

    const alreadyExistUser = await findUserByEmail(email);

    if (alreadyExistUser) {
      return ResponseHandler.conflict(
        res, "User already exists"
      )
    }

    const encryptedPassword = await passwordHash(password);

    const user = await createUser({ ...req.body, password: encryptedPassword });

    const token = jwtSign({
      kind: "user-authentication-token",
      sub: { id: user.id },
      iat: jwtNumericDate(new Date()),
      exp: jwtNumericDate(new Date()) + TOKEN_EXP_TIME,
    });

    return ResponseHandler.success(res, {token}, "SignUp successfully !!");
  }
);

export const signIn = asyncMW(
  async (req: AuthenticatedRequest, res: Response) => {
    const { email, password } = validationSchemaForSignIn.parse(req.body);

    const user = await findUserByEmail(email);

    if (!user) {
      return ResponseHandler.notFound(
        res, "User not found"
      )
    }

    const isMatched = await passwordMatch(password, user.password);

    if (!isMatched) {
      return ResponseHandler.notFound(
        res, "Incorrect  password"
      )
    }

    const token = jwtSign({
      kind: "user-authentication-token",
      sub: { id: user.id },
      iat: jwtNumericDate(new Date()),
      exp: jwtNumericDate(new Date()) + TOKEN_EXP_TIME,
    });

    return ResponseHandler.success(res, {token}, "SignIn successfully !!");
  }
);

export const verifyToken = asyncMW(
  async (req: AuthenticatedRequest, res: Response) => {
    const { user } = req;
    const sanitizedUser = { ...user, password: undefined };
    return ResponseHandler.success(res, sanitizedUser, "Token verified!!");
  }
);
