import { IClothingService } from "../interfaces/IClothingService";
import { IClothingRepository } from "../interfaces/IClothingRepository";
import { Clothing } from "../models/clothing";
import { CustomError } from "../utils/customError";

export class ClothingService implements IClothingService {
  private repository: IClothingRepository;

  constructor(repository: IClothingRepository) {
    this.repository = repository;
  }

  async createClothing(clothing: Clothing): Promise<Clothing> {
    return this.repository.create(clothing);
  }

  async getAllClothing(color?: string, size?: string): Promise<Clothing[]> {
    if (color || size) {
      return this.repository.findByFilters({ color, size });
    }
    return this.repository.findAll();
  }

  async getClothingById(id: string): Promise<Clothing | null> {
    return this.repository.findById(id);
  }

  async getOutOfStockClothing(): Promise<Clothing[]> {
    return this.repository.findOutOfStock();
  }

  async getLessFiveStockClothing(): Promise<Clothing[]> {
    return this.repository.findLowStock();
  }

  async updateClothing(
    id: string,
    clothing: Partial<Clothing>
  ): Promise<Clothing> {
    return this.repository.update(id, clothing);
  }

  async deleteClothing(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async addClothingStock(id: string, quantity: number): Promise<Clothing> {
    return this.repository.addStock(id, quantity);
  }

  async reduceClothingStock(id: string, quantity: number): Promise<Clothing> {
    const updatedClothing = await this.repository.reduceStock(id, quantity);

    if (!updatedClothing) {
      throw new CustomError("Insufficient stock or clothing not found", 400);
    }

    return updatedClothing;
  }
}
