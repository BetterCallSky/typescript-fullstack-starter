import { plugin, Model } from 'mongoose';
import { typedModel } from 'ts-mongoose';
import { BearerTokenSchema } from './BearerToken';
import { UserSchema } from './User';

plugin((schema: any) => {
  schema.options.toJSON = {
    transform: (doc: any, ret: any) => {
      const id = ret._id;
      delete ret._id;
      delete ret.__v;
      return {
        id,
        ...ret,
      };
    },
  };
});

type ExtractDoc<T> = T extends Model<infer U> ? U : never;

export const User = typedModel('User', UserSchema);
export const BearerToken = typedModel('BearerToken', BearerTokenSchema);

export type UserDoc = ExtractDoc<typeof User>;
export type BearerTokenDoc = ExtractDoc<typeof BearerToken>;
