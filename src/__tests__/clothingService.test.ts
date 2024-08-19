import { ClothingService } from '../services/clothingService';
import { IClothingRepository } from '../interfaces/IClothingRepository';
import { Clothing } from '../models/clothing';
import { CustomError } from '../utils/customError';

const mockRepository: jest.Mocked<IClothingRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findOutOfStock: jest.fn(),
  findLowStock: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByFilters: jest.fn(),
  addStock: jest.fn(),
  reduceStock: jest.fn(),
};

describe('ClothingService', () => {
  let service: ClothingService;

  beforeEach(() => {
    service = new ClothingService(mockRepository);
    jest.clearAllMocks();
  });

  describe('createClothing', () => {
    it('should create a new clothing item', async () => {
      const clothingData: Clothing = {
        title: 'Jaket Gojek',
        color: 'Red',
        size: 'M',
        price: 20000,
        stock: 100,
      };

      const createdClothing: Clothing = { id: 'randomuuid', ...clothingData };

      mockRepository.create.mockResolvedValue(createdClothing);

      const result = await service.createClothing(clothingData);

      expect(mockRepository.create).toHaveBeenCalledWith(clothingData);
      expect(result).toEqual(createdClothing);
    });
  });

  describe('getAllClothing', () => {
    it('should return all clothing when no filters are provided', async () => {
      const mockClothing: Clothing[] = [
        { id: 'cloth-001', title: 'Baju Muslim', color: 'Red', size: 'M', price: 15000, stock: 10 },
        { id: 'cloth-002', title: 'Baju Partai', color: 'Blue', size: 'L', price: 35000, stock: 5 },
      ];

      mockRepository.findAll.mockResolvedValue(mockClothing);

      const result = await service.getAllClothing();

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockClothing);
    });

    it('should return filtered clothing when color filter is provided', async () => {
      const mockClothing: Clothing[] = [
        { id: 'cloth-002', title: 'Baju Partai', color: 'Red', size: 'M', price: 35000, stock: 10 },
      ];

      mockRepository.findByFilters.mockResolvedValue(mockClothing);

      const result = await service.getAllClothing('Red');

      expect(mockRepository.findByFilters).toHaveBeenCalledWith({ color: 'Red', size: undefined });
      expect(result).toEqual(mockClothing);
    });
  });

  describe('getOutOfStockClothing', () => {
    it('should return all out of stock clothing', async () => {
      const mockOutOfStock: Clothing[] = [
        { id: 'cloth-001', title: 'Baju Muslim', color: 'Red', size: 'M', price: 15000, stock: 0 },
        { id: 'cloth-002', title: 'Baju Partai', color: 'Blue', size: 'L', price: 35000, stock: 0 },
      ];

      mockRepository.findOutOfStock.mockResolvedValue(mockOutOfStock);

      const result = await service.getOutOfStockClothing();

      expect(mockRepository.findOutOfStock).toHaveBeenCalled();
      expect(result).toEqual(mockOutOfStock);
    });
  });

  describe('getLessFiveStockClothing', () => {
    it('should return all low stock clothing', async () => {
      const mockLowStock: Clothing[] = [
        { id: 'cloth-001', title: 'Baju Muslim', color: 'Red', size: 'M', price: 15000, stock: 3 },
        { id: 'cloth-002', title: 'Baju Partai', color: 'Blue', size: 'L', price: 35000, stock: 2 },
      ];

      mockRepository.findLowStock.mockResolvedValue(mockLowStock);

      const result = await service.getLessFiveStockClothing();

      expect(mockRepository.findLowStock).toHaveBeenCalled();
      expect(result).toEqual(mockLowStock);
    });
  });

  describe('reduceClothingStock', () => {
    it('should reduce stock successfully', async () => {
      const mockClothing: Clothing = { id: 'cloth-001', title: 'Baju Muslim', color: 'Red', size: 'M', price: 15000, stock: 8 };

      mockRepository.reduceStock.mockResolvedValue(mockClothing);

      const result = await service.reduceClothingStock('cloth-001', 2);

      expect(mockRepository.reduceStock).toHaveBeenCalledWith('cloth-001', 2);
      expect(result).toEqual(mockClothing);
    });

    it('should throw an error when stock reduction fails', async () => {
      mockRepository.reduceStock.mockResolvedValue(null);

      await expect(service.reduceClothingStock('cloth-001', 10)).rejects.toThrow(CustomError);
      expect(mockRepository.reduceStock).toHaveBeenCalledWith('cloth-001', 10);
    });
  });
});