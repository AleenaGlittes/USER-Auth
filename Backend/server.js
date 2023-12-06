import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/auth.js';


dotenv.config();
const app= express();

app.use(express.json())
app.use(cors());

//routes
app.use('/api/users',userRoutes);
app.use('/api/login',authRoutes )



connectDB();
const port = process.env.PORT ||5001;
app.listen(port,()=>console.log(`Listening on port ${port}`))
