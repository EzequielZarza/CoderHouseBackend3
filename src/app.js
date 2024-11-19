import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from "./routes/mocks.router.js"; 

import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;
const isTesting = process.env.TESTING  === 'true';
const DB = isTesting ? 'AdoptMeTEST' : 'AdoptMe';

const connection = mongoose.connect('mongodb+srv://coderUser:coderPass@cluster0.y3pgk.mongodb.net', {
  dbName: DB,
  useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) :
	console.log('Connected to the database'));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use("/api/mocks", mocksRouter); 


app.listen(PORT,()=> { 
  console.log(`Listening on ${PORT}`);
  console.log(`Connected to ${DB} database`);
})
