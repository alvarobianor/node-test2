import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
	name: string;
	url?: string;
}

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		url: { type: String, required: false },
	},
	{
		timestamps: true,
	},
);

const User: mongoose.Model<IUser> = mongoose.model('User', UserSchema);

export default User;
