import mongoose from 'mongoose';
import { typedModel } from 'ts-mongoose';
import { BearerTokenSchema } from './BearerToken';
import { UserSchema } from './User';

type ExtractDoc<T> = T extends mongoose.Model<infer U> ? U : never;

export const User = typedModel('User', UserSchema);
export const BearerToken = typedModel('BearerToken', BearerTokenSchema);

export type UserDoc = ExtractDoc<typeof User>;
export type BearerTokenDoc = ExtractDoc<typeof BearerToken>;
