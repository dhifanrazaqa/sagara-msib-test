import express, { Express } from "express";
import dotenv from "dotenv";
import { clothingRoutes } from './routes/clothingRoutes';
import { createDIContainer } from './config/di-container';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();
const { controller } = createDIContainer();

app.use(express.json());

app.use("/api/v1/clothing", clothingRoutes(controller));

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});