import bcrypt from "bcryptjs";
var SALT_ROUNDS = 12;
export function generateSalt() {
    return bcrypt.genSalt(SALT_ROUNDS);
}
export function passwordHash(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}
export function passwordMatch(plainTextPassword, passwordHash) {
    return bcrypt.compare(plainTextPassword, passwordHash);
}
