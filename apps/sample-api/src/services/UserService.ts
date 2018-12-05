import { createContract } from 'defensive';
import { V } from 'veni';
import crypto from 'mz/crypto';
import { User } from '../models';
import { BadRequestError } from '../common/errors';
import config from 'config';
import { createPasswordHash, serializeUser } from '../common/helper';
import { serviceName } from '../common/serviceName';
import { createBearerToken } from './SecurityService';

async function _checkUniq(
  omitId: string | null,
  username: string,
  email: string
) {
  const base = omitId ? { id: { $ne: omitId } } : {};
  const existingEmail = await User.findOne({
    ...base,
    email_lowered: email.toLowerCase(),
  });
  if (existingEmail) {
    throw new BadRequestError('Email address is already registered');
  }
  const existingUsername = await User.findOne({
    ...base,
    username_lowered: username.toLowerCase(),
  });
  if (existingUsername) {
    throw new BadRequestError('Username is already registered');
  }
}

export const register = createContract(serviceName('register'))
  .params('values')
  .schema({
    values: V.object().keys({
      username: V.string()
        .min(3)
        .max(16),
      email: V.string().email(),
      password: V.string().min(4),
    }),
  })
  .fn(async values => {
    await _checkUniq(null, values.username, values.email);
    const buffer = await crypto.randomBytes(config.SECURITY.SALT_LENGTH);
    const salt = buffer.toString('hex');
    const user = await User.create({
      ...values,
      email_lowered: values.email.toLowerCase(),
      username_lowered: values.username.toLowerCase(),
      salt,
      password: await createPasswordHash(values.password, salt),
    });
    return user;
  })
  .express({
    public: true,
    method: 'post',
    path: '/register',
    async json(req) {
      const user = await register(req.body);
      return {
        user: serializeUser(user),
        token: createBearerToken(user.id),
      };
    },
  });
