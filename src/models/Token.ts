import mongoose from 'mongoose';

interface IToken extends mongoose.Document {
	token: string;
}

const tokenSchema = new mongoose.Schema(
	{
		token: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

const User: mongoose.Model<IToken> = mongoose.model('Token', tokenSchema);

export default User;
