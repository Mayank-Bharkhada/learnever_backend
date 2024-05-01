import { NextFunction, Response } from "express";
import { jwtVerify } from "../lib/jwt.js";
import { JwtPayload } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/request.js";
import { findUserById } from "../services/user.services.js";
import ResponseHandler from "../lib/responseHandler.js";

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) {
    return ResponseHandler.unAuthorized(res, "Unauthorized - Missing token" )
  }
  const decodedToken = jwtVerify(token) as unknown as JwtPayload;
  const userId = decodedToken.userId;

  // Check if the user exists in the database
  const user = await findUserById(userId);
  
  if (!user) {
    return ResponseHandler.notFound(res, "Unauthorized - User not found" )
  }

  req.user = user;

  next();
};
