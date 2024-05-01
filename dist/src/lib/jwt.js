import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";
export function jwtVerify(token) {
    try {
        var _config_authSettings;
        var secretKey = (_config_authSettings = config.authSettings) === null || _config_authSettings === void 0 ? void 0 : _config_authSettings.jwtSecretKey;
        if (!secretKey) {
            throw new Error("JWT secret key is undefined");
        }
        return jwt.verify(token, secretKey);
    } catch (err) {
        return undefined;
    }
}
export function jwtSign(obj) {
    var _config_authSettings;
    var secretKey = (_config_authSettings = config.authSettings) === null || _config_authSettings === void 0 ? void 0 : _config_authSettings.jwtSecretKey;
    if (!secretKey) {
        throw new Error("JWT secret key is undefined");
    }
    return jwt.sign(obj, secretKey);
}
export function jwtNumericDate(date) {
    return Math.round(date.getTime() / 1000);
}
export function jwtDate(unixTime) {
    var date = new Date();
    date.setTime(unixTime * 1000);
    return date;
}
