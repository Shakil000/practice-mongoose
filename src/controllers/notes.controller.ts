import { Request, Response } from "express"
import express from "express"
import { Note } from "../App/models/notes.model";
import z from "zod";
import { Types } from 'mongoose';
import { isValidObjectId } from "mongoose";
import { User } from "../App/models/user.model";


export const notesRoutes = express.Router();


const createNoteZodSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  category: z.string().optional(),
  pinned: z.boolean().optional(),
  tags: z.object({
    label: z.string(),
    color: z.string(),
  }),
  userId: z.string(),
    
})

notesRoutes.post('/create-note', async(req: Request, res: Response) => {
  try {
    const body = await createNoteZodSchema.parseAsync(req.body)
 console.log("your body",body)
 const note = await Note.create(body)

  res.status(201).json({
    success: true,
    message: "Note Creation Done",
    note,
  })
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
})
notesRoutes.get('/', async(req: Request, res: Response) => {
 const notes = await Note.find().populate('userId') // This 'userId' come from notes.model.ts. populate push user own data in the note by using the id.

  res.status(201).json({
    success: true,
    message: "Hurre I get all notes",
    notes,
  })
})
notesRoutes.get('/:noteId', async(req: Request, res: Response) => {
    const noteId = req.params.noteId;
 const note = await Note.findById(noteId);

  res.status(201).json({
    success: true,
    message: "Hurre I get all notes",
    note,
  })
})
notesRoutes.patch('/:noteId', async(req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const updatedBody = req.body
    const note = await Note.findByIdAndUpdate(noteId, updatedBody, {new: true});

  res.status(201).json({
    success: true,
    message: "Hurre the specific note is updated",
    note,
  })
})
notesRoutes.delete('/:noteId', async(req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const note = await Note.findByIdAndDelete(noteId);

  res.status(201).json({
    success: true,
    message: "Hurre the specific note is Deleted",
    note,
  })
})
