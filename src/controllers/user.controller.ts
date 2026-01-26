import express, { Request, Response } from "express";
import { User } from "../App/models/user.model";
import z from "zod";
import bcrypt from "bcryptjs";

export const userRoutes = express.Router();

const createUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.email(),
  password: z.string(),
  role: z.string().optional(),
  address: z.object({
    city: z.string(),
    state: z.string(),
    zip: z.number(),
  }),
});

// @ user create route
userRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = await createUserZodSchema.parseAsync(req.body);
    const hashedPassword = await bcrypt.hash(body.password, 10)
    const user = await User.create({...body, password: hashedPassword});
    console.log(body, "Zod body")
    console.log(user, "Zod body with hashed password")
    res.status(201).json({
      success: true,
      message: "User Create Successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
// @  get user route
userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "All user retrived data Successfully",
    users,
  });
});
// @ Get single user data route
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "Single user data retrived Successfully",
    user,
  });
});
// @ Update user data route
userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updateBody = req.body;
  const user = await User.findByIdAndUpdate(userId, updateBody, { new: true });

  res.status(201).json({
    success: true,
    message: "User data updated Successfully",
    user,
  });
});
// @ Update user data route
userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  res.status(201).json({
    success: true,
    message: "User data deleted Successfully",
    user,
  });
});
