export interface Clothing {
  id?: string;
  title: string;
  color: string;
  size: string;
  price: number;
  stock: number;
}

export type CreateClothingDto = Omit<Clothing, "id">;
export type UpdateClothingDto = Partial<CreateClothingDto>;
