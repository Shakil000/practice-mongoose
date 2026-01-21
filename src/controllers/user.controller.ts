import express, { Request, Response } from 'express';
import { User } from '../App/models/user.model';
export const userRoutes = express.Router();


// @ user create route
userRoutes.post('/create-user', async(req: Request, res: Response) => {
    const body = req.body;
    const user = await User.create(body);

    res.status(201).json({
        success: true,
        message: "User Create Successfully",
        user,
    })
})
// @  get user route
userRoutes.get('/', async(req: Request, res: Response) => {
    const users = await User.find();

    res.status(201).json({
        success: true,
        message: "All user retrived data Successfully",
        users,
    })
})
// @ Get single user data route
userRoutes.get('/:userId', async(req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    res.status(201).json({
        success: true,
        message: "Single user data retrived Successfully",
        user,
    })
})
// @ Update user data route
userRoutes.patch('/:userId', async(req: Request, res: Response) => {
    const userId = req.params.userId;
    const updateBody = req.body 
    const user = await User.findByIdAndUpdate(userId, updateBody, {new: true});

    res.status(201).json({
        success: true,
        message: "User data updated Successfully",
        user,
    })
})
// @ Update user data route
userRoutes.delete('/:userId', async(req: Request, res: Response) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);

    res.status(201).json({
        success: true,
        message: "User data deleted Successfully",
        user,
    })
})
