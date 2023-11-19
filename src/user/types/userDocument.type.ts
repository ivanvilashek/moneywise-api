import { Document } from 'mongoose';
import { User } from '../models/user.schema';

export type UserDocument = User & Document;
