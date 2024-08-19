import { Clothing } from '../models/clothing';

export interface IClothingRepository {
  create(clothing: Clothing): Promise<Clothing>;
  findAll(): Promise<Clothing[]>;
  findById(id: string): Promise<Clothing | null>;
  findOutOfStock(): Promise<Clothing[]>;
  findLowStock(): Promise<Clothing[]>;
  update(id: string, clothing: Partial<Clothing>): Promise<Clothing>;
  delete(id: string): Promise<void>;
  findByFilters(filters: { color?: string; size?: string }): Promise<Clothing[]>;
  addStock(id: string, quantity: number): Promise<Clothing>;
  reduceStock(id: string, quantity: number): Promise<Clothing | null>;
}