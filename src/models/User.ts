import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
	name: string;
}

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

const User: mongoose.Model<IUser> = mongoose.model('User', UserSchema);

export default User;
