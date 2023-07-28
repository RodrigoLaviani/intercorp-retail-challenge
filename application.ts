import express from 'express';
import cors from 'cors';
import petRoutes from './src/routes/pet.routes';
import bodyParser from 'body-parser';
//middlewares

const app = express();

// input values
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10mb' }));

// cors
app.use(cors());

//routes
app.use("/api/v3/pet", petRoutes);

export default app;