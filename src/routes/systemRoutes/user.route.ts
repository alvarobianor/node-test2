import { Router } from 'express';
import User from '../../models/User';
import mongoose from 'mongoose';
// initial of a route

interface IUser extends mongoose.Document {
	name: string;
	url?: string;
}

const usersRouter = Router();

// ROUTES

usersRouter.post('/store', async (req, res) => {
	try {
		// const user: IUser[] = await (await User.find()).filter(e => e)

		return res.status(200).json({ message: 'resp' });
	} catch (error) {
		console.log(error);
	}
});

usersRouter.get('/', async (req, res) => {
	try {
		const user: IUser[] = await (await User.find()).filter(e => e);

		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
});

usersRouter.get('/:name', async (req, res) => {
	try {
		const { name } = req.params;

		if (name === 'adm') {
			const user: IUser[] = await (await User.find()).filter(e => e);

			return res.status(200).json(user);
		}

		const user: IUser = (await User.findOne({ name })) as IUser;

		if (!user) {
			return res.status(400).json({ message: `User don't exists` });
		}

		return res.status(200).json({ message: 'Ok', user });
	} catch (error) {
		console.log(error);
	}
});

export default usersRouter;
