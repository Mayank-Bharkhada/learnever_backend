import {  User } from "@prisma/client";
import prisma from "../prisma/index.js";


export const findUserById = async(id: number): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
};

export const findUserByEmail = async(email: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const createUser = async (body: User): Promise<User> => {
  const { name, email, password } = body;
  return await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  });

};


