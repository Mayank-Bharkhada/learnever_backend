import { PrismaClient } from "@prisma/client";
var prisma = globalThis.client || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalThis.client = prisma;
}
export default prisma;
