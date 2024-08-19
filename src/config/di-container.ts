import { PrismaClient } from '@prisma/client';
import { ClothingRepository } from '../repositories/clothingRepository';
import { ClothingService } from '../services/clothingService';
import { ClothingController } from '../controllers/clothingController';

export function createDIContainer() {
  const prisma = new PrismaClient();
  const repository = new ClothingRepository(prisma);
  const service = new ClothingService(repository);
  const controller = new ClothingController(service);

  return { prisma, repository, service, controller };
}