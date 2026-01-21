import { Request, Response } from "express"
import express from "express"
import { Note } from "../App/models/notes.model";



export const notesRoutes = express.Router();

notesRoutes.post('/create-note', async(req: Request, res: Response) => {
const body = req.body
    // ! notesRoutesroch-1 of store data in database
//   const myNote = new Note({
//     title: "Learning Mongoose",
//     tags: {label: "Database"}
//     // content: "Mongoose",
//     // category: "Study",
//     // pinned: true,
//   })
//   await myNote.save();

 // ! notesRoutesroch-2 of store data in database using API
 
 console.log("your body",body)
 const note = await Note.create(body)

  res.status(201).json({
    success: true,
    message: "Note Creation Done",
    note,
  })
})
notesRoutes.get('/', async(req: Request, res: Response) => {
 const notes = await Note.find()

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
