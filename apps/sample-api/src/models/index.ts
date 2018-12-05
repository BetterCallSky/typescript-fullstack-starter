import mongoose from 'mongoose';
import config from 'config';

import UserSchema from './User';
import { typedModel } from 'ts-mongoose';

// const conn = mongoose.connect(config.MONGODB_URL).connection;

// export const

export const User = typedModel('User', UserSchema);
