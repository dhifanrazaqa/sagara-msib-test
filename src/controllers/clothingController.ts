import { NextFunction, Request, Response } from "express";
import { IClothingService } from "../interfaces/IClothingService";
import { CustomError } from "../utils/customError";

export class ClothingController {
  private service: IClothingService;

  constructor(service: IClothingService) {
    this.service = service;
  }

  async createClothing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const clothing = await this.service.createClothing(req.body);

      res.status(201).json({
        status: "success",
        message: "Clothing created successfully",
        data: clothing,
      });
    } catch (error) {
      next(new CustomError("Failed to create clothing", 500));
    }
  }

  async getAllClothing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { color, size } = req.query;
      const clothing = await this.service.getAllClothing(
        color as string | undefined,
        size as string | undefined
      );

      res.status(200).json({
        status: "success",
        data: clothing,
      });
    } catch (error) {
      next(new CustomError("Failed to get all clothing", 500));
    }
  }

  async getClothById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const clothing = await this.service.getClothingById(id);

      if (!clothing) {
        return next(new CustomError("Clothing not found", 404));
      }

      res.status(200).json({
        status: "success",
        data: clothing,
      });
    } catch (error) {
      next(new CustomError("Failed to get clothing", 500));
    }
  }

  async getOutOfStockClothing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const clothing = await this.service.getOutOfStockClothing();
      res.status(200).json({
        status: "success",
        data: clothing,
      });
    } catch (error) {
      next(new CustomError("Failed to get clothing", 500));
    }
  }

  async getLessFiveStockClothing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const clothing = await this.service.getLessFiveStockClothing();
      res.status(200).json({
        status: "success",
        data: clothing,
      });
    } catch (error) {
      next(new CustomError("Failed to create clothing", 500));
    }
  }

  async updateClothing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const updateClothing = req.body;

      const isClothingExist = await this.service.getClothingById(id);

      if (!isClothingExist) {
        return next(new CustomError("Clothing not found", 404));
      }

      const clothing = await this.service.updateClothing(id, updateClothing);

      res.status(200).json({
        status: "success",
        message: "Clothing updated successfully",
        data: clothing,
      });
    } catch (error) {
      next(new CustomError("Failed to update clothing", 500));
    }
  }

  async addStock(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const isClothingExist = await this.service.getClothingById(id);

      if (!isClothingExist) {
        return next(new CustomError("Clothing not found", 404));
      }

      const clothing = await this.service.addClothingStock(id, quantity);

      res.status(200).json({
        status: "success",
        message: "Stock added successfully",
        data: clothing,
      });
    } catch (error) {
      next(new CustomError("Failed to add stock", 500));
    }
  }

  async reduceStock(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const isClothingExist = await this.service.getClothingById(id);

      if (!isClothingExist) {
        return next(new CustomError("Clothing not found", 404));
      }

      const clothing = await this.service.reduceClothingStock(id, quantity);
      res.status(200).json({
        status: "success",
        message: "Stock reduced successfully",
        data: clothing,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        return next(error);
      }
      next(new CustomError("Failed to reduce stock", 500));
    }
  }

  async deleteClothing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      const isClothingExist = await this.service.getClothingById(id);

      if (!isClothingExist) {
        return next(new CustomError("Clothing not found", 404));
      }

      await this.service.deleteClothing(id);

      res.status(200).json({
        status: "success",
        message: "Clothing deleted successfully",
      });
    } catch (error) {
      next(new CustomError("Failed to create clothing", 500));
    }
  }
}
