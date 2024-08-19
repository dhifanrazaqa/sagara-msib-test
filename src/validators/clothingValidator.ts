import { body } from 'express-validator';

export const createClothingValidator = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('color').isString().notEmpty().withMessage('Color is required'),
  body('size').isString().notEmpty().withMessage('Size is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

export const updateClothingValidator = [
  body('title').optional().isString().notEmpty().withMessage('Title must be a non-empty string'),
  body('color').optional().isString().notEmpty().withMessage('Color must be a non-empty string'),
  body('size').optional().isString().notEmpty().withMessage('Size must be a non-empty string'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

export const addStock = [
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];

export const reduceStock = [
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
];