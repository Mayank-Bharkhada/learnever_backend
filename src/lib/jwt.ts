import jwt, { Secret, GetPublicKeyOrSecret } from "jsonwebtoken";
import { config } from "../config/env.config.js";
import { jwtSign } from "../types/authentication.js";

export function jwtVerify(token: string){
  try {
    const secretKey = config.authSettings?.jwtSecretKey;
    if (!secretKey) {
      throw new Error("JWT secret key is undefined");
    }

    return jwt.verify(token, secretKey as Secret | GetPublicKeyOrSecret);
  } catch (err) {
    return undefined;
  }
}

export function jwtSign(obj: jwtSign) {
  const secretKey = config.authSettings?.jwtSecretKey;
  if (!secretKey) {
    throw new Error("JWT secret key is undefined");
  }

  return jwt.sign(obj, secretKey);
}

export function jwtNumericDate(date: Date): number {
  return Math.round(date.getTime() / 1000);
}

export function jwtDate(unixTime: number): Date {
  const date = new Date();
  date.setTime(unixTime * 1000);
  return date;
}
