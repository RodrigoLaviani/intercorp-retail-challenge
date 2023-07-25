import express from 'express';
import cors from 'cors';
import petRoutes from './src/routes/pet.routes';
//middlewares

const app = express();

app.use(cors());

//routes
app.use("/api/v3/pet", petRoutes);

export default app;