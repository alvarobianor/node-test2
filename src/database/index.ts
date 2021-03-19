// const mongoose = require('mongoose');

import mongoose from 'mongoose';

class Database {
	constructor() {
		this.init();
	}

	init() {
		try {
			mongoose.connect(process.env.MONGO_URL as string, {
				useCreateIndex: true,
				useNewUrlParser: true,
				useFindAndModify: true,
				useUnifiedTopology: true,
			});

			console.log('Database connected!');
		} catch (e) {
			console.log("Database didn't connect!");
		}
	}
}

module.exports = new Database();
