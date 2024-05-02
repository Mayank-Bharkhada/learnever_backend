import {  User } from "@prisma/client";
import loadPrisma from "../utils/importPrisma.js";

const Prisma = loadPrisma as any;

export const findUserById = async(id: number): Promise<User | null> => {
  return await Prisma.user.findFirst({
    where: {
      id,
    },
  });
};

export const findUserByEmail = async(email: string): Promise<User | null> => {
  return await Prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const createUser = async (body: User): Promise<User> => {
  const { name, email, password } = body;
  return await Prisma.user.create({
    data: {
      name,
      email,
      password
    }
  });

};


