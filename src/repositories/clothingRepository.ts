import { PrismaClient } from "@prisma/client";
import { IClothingRepository } from "../interfaces/IClothingRepository";
import {
  Clothing,
  CreateClothingDto,
  UpdateClothingDto,
} from "../models/clothing";

export class ClothingRepository implements IClothingRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create(clothing: CreateClothingDto): Promise<Clothing> {
    return this.prisma.clothing.create({ data: clothing });
  }

  async findAll(): Promise<Clothing[]> {
    return this.prisma.clothing.findMany();
  }

  async findById(id: string): Promise<Clothing | null> {
    return this.prisma.clothing.findUnique({ where: { id } });
  }

  async findOutOfStock(): Promise<Clothing[]> {
    return this.prisma.clothing.findMany({
      where: {
        stock: 0,
      },
    });
  }

  async findLowStock(): Promise<Clothing[]> {
    return this.prisma.clothing.findMany({
      where: {
        stock: {
          gt: 0,
          lte: 5,
        },
      },
    });
  }

  async update(id: string, clothing: UpdateClothingDto): Promise<Clothing> {
    return this.prisma.clothing.update({ where: { id }, data: clothing });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.clothing.delete({ where: { id } });
  }

  async findByFilters(filters: {
    color?: string;
    size?: string;
  }): Promise<Clothing[]> {
    return this.prisma.clothing.findMany({
      where: {
        ...(filters.color && {
          color: {
            contains: filters.color,
            mode: "insensitive",
          },
        }),
        ...(filters.size && {
          size: {
            contains: filters.size,
            mode: "insensitive",
          },
        }),
      },
    });
  }

  async addStock(id: string, quantity: number): Promise<Clothing> {
    return this.prisma.clothing.update({
      where: { id },
      data: { stock: { increment: quantity } },
    });
  }

  async reduceStock(id: string, quantity: number): Promise<Clothing | null> {
    const clothing = await this.prisma.clothing.findUnique({ where: { id } });

    if (!clothing || clothing.stock < quantity) {
      return null;
    }

    return this.prisma.clothing.update({
      where: { id },
      data: { stock: { decrement: quantity } },
    });
  }
}
