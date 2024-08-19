import { Router } from 'express';
import { ClothingController } from '../controllers/clothingController';
import { createClothingValidator, updateClothingValidator } from '../validators/clothingValidator';
import { validateRequest } from '../middleware/validateReques';

export function clothingRoutes(controller: ClothingController): Router {
  const router = Router();

  router.get('/', controller.getAllClothing.bind(controller));
  router.get('/out-of-stock', controller.getOutOfStockClothing.bind(controller));
  router.get('/below-five-stock', controller.getLessFiveStockClothing.bind(controller));
  router.get('/:id', controller.getClothById.bind(controller));

  router.post('/', createClothingValidator, validateRequest, controller.createClothing.bind(controller));
  router.post('/add-stock/:id', controller.addStock.bind(controller));
  router.post('/reduce-stock/:id', controller.reduceStock.bind(controller));
  
  router.delete('/:id', controller.deleteClothing.bind(controller));

  router.put('/:id', updateClothingValidator, validateRequest, controller.updateClothing.bind(controller));
  
  return router;
}