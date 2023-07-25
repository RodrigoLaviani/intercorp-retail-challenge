import express from 'express';
import cors from 'cors';
//middlewares

const app = express();

app.use(cors());

//routes

export default app;