import { createSchema, Type } from 'ts-mongoose';

export const UserSchema = createSchema({
  email: Type.string(),
  email_lowered: Type.string({ index: true, unique: true }),
  username: Type.string(),
  username_lowered: Type.string({ index: true, unique: true }),
  password: Type.string(),
  salt: Type.string(),
  resetPasswordCode: Type.optionalString({ index: true }),
  resetPasswordExpiration: Type.optionalDate(),
});
