
import { PrismaClient } from "@prisma/client";
import path from "path";

const prismaPath = "./prisma/index.js";

const __dirname = path.resolve(path.dirname(''), './');
const prismaDynamicImportPath = path.resolve(__dirname, prismaPath);

export default async function Prisma() {
    try {
      // Dynamically import the module
      const prismaModule = await import(prismaDynamicImportPath);
      // Access the default export of the module
      const prisma = prismaModule.default;
      return prisma;
    } catch (error) {
      console.error("Error loading Prisma module:", error);
      throw error;
    }
  }