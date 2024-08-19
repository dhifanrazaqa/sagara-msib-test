import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const bajuPartai = await prisma.clothing.create({
    data: {
      title: "Baju Partai",
      color: "Merah",
      size: "XL",
      price: 50000,
      stock: 10,
    },
  });
  const bajuMuslim = await prisma.clothing.create({
    data: {
      title: "Baju Muslim",
      color: "Putih",
      size: "M",
      price: 25000,
      stock: 35,
    },
  });
  console.log({ bajuPartai, bajuMuslim });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
