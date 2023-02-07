import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const salt = bcrypt.genSaltSync(10);

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "pessoa da silva",
      email: "pessoa@email.com",
      password: bcrypt.hashSync("mudar123", salt),
      cpf: "000.000.000.00",
      shopping: {
        nome: "Fantastic Soft Pants",
        descricao:
          "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
        categoria: "Practical",
        imagem: "http://placeimg.com/640/480/abstract",
        preco: "36.00",
        material: "Steel",
        departamento: "Toys",
        id: "36",
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
