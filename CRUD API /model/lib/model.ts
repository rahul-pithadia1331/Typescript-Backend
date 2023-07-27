import mongoose from 'mongoose';
import { IModel } from './interface';

const Model = new mongoose.Schema<IModel>({
    sName: { type: String, required: true },
    sEmail: { type: String, required: true },
    sWalletAddress: String,
    nAge: Number,
});



export default mongoose.model<IModel>('model', Model);
