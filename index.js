import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http'
//import path from 'path'

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express(); 
dotenv.config();
//const __dirname = path.resolve();
// app.get('/', (req,res)=>{
//   res.send('Hello')
// })

// app.get('/', (req,res)=>{
//   res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use("/user", userRouter);
//app.use(express.static(path.join(__dirname, '../client/build')))

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
  () => {console.log('connected to : ', process.env.MONGO_URI)}
  )
// const CONNECTION_URL = process.env.DB_URL||'mongodb:localhost:27017';
const PORT = process.env.PORT|| 8000;

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

app.listen(PORT, () =>{
  console.log('LISTENING ON SERVER', PORT)
})

// app.get('*', (req,res)=>{
//   res.sendFile(path.join(__dirname, '../client/build/index.html'))
// })