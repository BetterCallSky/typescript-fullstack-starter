import { createSchema, Type } from 'ts-mongoose';

export const BearerTokenSchema = createSchema({
  _id: Type.string(),
  userId: Type.objectId(),
});
