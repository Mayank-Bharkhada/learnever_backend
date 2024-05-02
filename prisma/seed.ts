import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const roles = [
  {
    name: "user",
  },
  {
    name: "admin",
  },
];

(async () => {
  try {
    const roleCount = await prisma.role.count();

    if (roleCount === 0) {
      await prisma.role.createMany({
        data: roles,
      });

      console.log(
        '========== Initial role data was inserted successfully. =========='
      )
    }
  } catch (e) {
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
