import { plugin, Model } from 'mongoose';
import { typedModel } from 'ts-mongoose';
import { BearerTokenSchema } from './BearerToken';
import { UserSchema } from './User';
import { NotFoundError } from '../common/errors';

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
  schema.statics.findByIdOrError = async function findByIdOrError(
    this: Model<any, any>,
    id: any,
    projection: any,
    options?: any
  ) {
    const item = await this.findById(id, projection, options);
    if (!item) {
      console.log(this);
      throw new NotFoundError(`${this.modelName} not found with id=${id}`);
    }
    return item;
  };
});

type ExtractDoc<T> = T extends Model<infer U> ? U : never;

export const User = typedModel('User', UserSchema);
export const BearerToken = typedModel('BearerToken', BearerTokenSchema);

export type UserDoc = ExtractDoc<typeof User>;
export type BearerTokenDoc = ExtractDoc<typeof BearerToken>;

declare module 'mongoose' {
  interface Model<T extends Document, QueryHelpers = {}>
    extends NodeJS.EventEmitter,
      ModelProperties {
    findByIdOrError(
      id: any,
      projection?: any,
      options?: any
    ): DocumentQuery<T, T> & QueryHelpers;
  }
}
