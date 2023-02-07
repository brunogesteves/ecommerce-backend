import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getInfoUser = async (id: number) => {
  const infoUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return infoUser;
};
