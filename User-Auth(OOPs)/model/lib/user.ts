import mongoose from 'mongoose';
import { IModel } from './interface';

const User = new mongoose.Schema<IModel>({
    oName: {
        sFirstName: { type: String, required: [true, 'First name is missing'] },
        sLastName: { type: String, required: [true, 'Last name is missing'] },
    },
    sWalletAddress: {
        type: String,
        required: [true, 'Wallet address is missing'],
    },
    sEmail: { type: String, required: [true, 'Email id is missing'] },
    sPassword:  { type: String, required: [true, 'Password is missing'] },
    sGender: {
        type: String,
        required: [true, 'Gender is missing'],
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not supported',
        },
    },
    sToken: String
});

export default mongoose.model<IModel>('users', User);
