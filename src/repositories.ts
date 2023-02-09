import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface ModelInfo {
  email: string;
  password: string;
  cpf?: string;
  id?: number;
  name?: string;
}

interface ProductsModel {
  nome: String;
  descricao: String;
  categoria: String;
  imagem: String;
  preco: String;
  material: String;
  departamento: String;
  id: String;
}

export const getInfoUser = async (id: number) => {
  const infoUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return infoUser;
};

export const getShopping = async (id: number) => {
  console.log("resp-getShopping-type: ", typeof id);
  console.log("resp-getShopping-value: ", id);

  const infoUser = await prisma.user.findFirst({
    where: {
      id: id,
    },
  });

  console.log(infoUser);

  return infoUser;
};

export const getLoginInfo = async (loginInfo: ModelInfo) => {
  const infoUser = await prisma.user.findFirst({
    where: {
      email: loginInfo.email,
    },

    select: {
      name: true,
      password: true,
      id: true,
      cpf: true,
      email: true,
    },
  });

  const compareInfoPassword = bcrypt.compareSync(
    loginInfo.password,
    infoUser?.password as string
  );
  if (compareInfoPassword) {
    return infoUser;
  } else {
    return false;
  }
};

export const newInfoUserUpdate = async (newInfoUser: ModelInfo) => {
  console.log("resp-newInfoUserUpdate: ", newInfoUser.password);

  const infoUser = await prisma.user.update({
    where: {
      id: Number(newInfoUser.id),
    },
    data: {
      name: newInfoUser.name,
      email: newInfoUser.email,
      cpf: newInfoUser.cpf,
    },
  });

  return infoUser;
};

export const sendProducts = async (
  products: any,
  userId: number | undefined
) => {
  const saveProduct = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      shopping: products,
    },
  });

  return saveProduct;
};
