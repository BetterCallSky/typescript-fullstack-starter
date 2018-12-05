import { createContract } from 'defensive';
import { V } from 'veni';
import uuid from 'uuid';
import { BearerToken } from '../models';
import { serviceName } from '../common/serviceName';

export const createBearerToken = createContract(
  serviceName('createBearerToken')
)
  .options({
    removeOutput: true,
  })
  .params('userId')
  .schema({
    userId: V.string(),
  })
  .fn(async userId => {
    const token = uuid();
    await BearerToken.create({ userId, _id: token });
    return token;
  });
