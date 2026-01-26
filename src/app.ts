//const express = require('express')
import express, { Application, Request, Response } from 'express';
import { notesRoutes } from './controllers/notes.controller';
import { userRoutes } from './controllers/user.controller';


const app : Application = express();
app.use(express.json());
app.use('/notes', notesRoutes)
app.use('/users', userRoutes);



app.get('/', (req: Request, res: Response) => {
  // console.log({req, res})
  res.send('Welcome to Note app')
})



export default app;