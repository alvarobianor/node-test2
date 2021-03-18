// const mongoose = require('mongoose');

import mongoose from 'mongoose';

class Database {
	constructor() {
		this.init();
	}

	init() {
		try {
			mongoose.connect(
				'mongodb+srv://Alvim:etUOmgCeSIZwCdV0@cluster0.lhum7.mongodb.net/Reaach?retryWrites=true&w=majority',
				{
					useCreateIndex: true,
					useNewUrlParser: true,
					useFindAndModify: true,
					useUnifiedTopology: true,
				},
			);

			console.log('Database connected!');
		} catch (e) {
			console.log("Database didn't connect!");
		}
	}
}

module.exports = new Database();
