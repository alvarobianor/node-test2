import { Router } from 'express';
import User from '../../models/User';
import mongoose from 'mongoose';
// initial of a route

interface IUser extends mongoose.Document {
	name: string;
	url?: string;
}
const adminRouter = Router();

// ROUTES

adminRouter.post('/', async (req, res) => {
	try {
		const { name, url = '' } = req.body;

		const exists: IUser = (await User.findOne({ name })) as IUser;

		if (exists) {
			return res.status(400).json({ message: 'name already exists' });
		}

		const user = await User.create({ name, url });
		await user.save();

		return res.status(201).json({ message: 'created', user });
	} catch (error) {
		console.log(error);
	}
});

export default adminRouter;
