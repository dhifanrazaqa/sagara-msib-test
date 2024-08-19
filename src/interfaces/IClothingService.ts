import { Clothing } from '../models/clothing';

export interface IClothingService {
  createClothing(clothing: Clothing): Promise<Clothing>;
  getAllClothing(color?: string, size?: string): Promise<Clothing[]>;
  getClothingById(id: string): Promise<Clothing | null>;
  getOutOfStockClothing(): Promise<Clothing[]>;
  getLessFiveStockClothing(): Promise<Clothing[]>;
  updateClothing(id: string, clothing: Partial<Clothing>): Promise<Clothing>;
  deleteClothing(id: string): Promise<void>;
  addClothingStock(id: string, quantity: number): Promise<Clothing>;
  reduceClothingStock(id: string, quantity: number): Promise<Clothing>;
}