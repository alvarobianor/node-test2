import { Router } from 'express';
import User from '../../models/User';
import Token from '../../models/Token';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
// initial of a route

interface IUser extends mongoose.Document {
	name: string;
	url?: string;
}

const usersRouter = Router();

const key =
	'AAAAzb42Iro:APA91bHYFIKmDYGPAfEcxWBv9hh4ECFPtfK7RRxn8of-xDXQKXVA1JGKn8XbhjaZZAnkK_d70tQqGNJfg4wCm--D1MGNflXgz1SQBJVTsx11Z-vkjSkHsk0qv1JsAWTpUA3XiAAhCfiB';
// ROUTES

console.log('KEYYY ', process.env.KEY);

usersRouter.post('/token', async (req, res) => {
	const { token } = req.body;

	try {
		const exists = await Token.findOne({ token });
		if (exists) {
			return res.status(200).json({ message: 'Exists' });
		}
		const newToken = await Token.create({ token });
		await newToken.save();
		return res.status(200).json({ message: 'created' });
	} catch (e) {
		console.log(e);
		return res.status(400).json({ message: 'Something wrong' });
	}
});

usersRouter.post('/store', async (req, res) => {
	try {
		console.log(req.body);
		// const user: IUser[] = await (await User.find()).filter(e => e)

		const notification = {
			title: `A notification from ${req.body.name}`,
			text: `A notificatin from ${req.body.name}`,
		};

		const tokens = await Token.find();
		const justTokens = tokens.map(e => e.token);
		console.log(justTokens);

		const bodyNotification = {
			// to: 'topics/topic',
			notification,
			registration_ids: justTokens,
		};

		fetch('https://fcm.googleapis.com/fcm/send', {
			method: 'POST',
			headers: {
				Authorization: 'key=' + key,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(bodyNotification),
		})
			.then(() => {
				return res.status(200).json({ message: 'Success' });
			})
			.catch(e => res.status(400).send('Fails'));

		// return res.status(200).json({ message: 'resp' });
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
