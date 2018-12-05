import * as R from 'r';
import Path from 'path';
import crypto from 'mz/crypto';
import config from 'config';
import { UserDoc } from '../models';

/**
 * Create password hash with pbkdf2
 * @param {String} password the user password
 * @param {String} salt the salt
 * @returns the password hash
 * @private
 */
export async function createPasswordHash(password: string, salt: string) {
  const hash = await crypto.pbkdf2(
    password,
    salt,
    config.SECURITY.ITERATIONS,
    config.SECURITY.PASSWORD_LENGTH,
    'sha1'
  );
  return hash.toString('hex');
}

/**
 * Serialize user to http response without security information
 */
export function serializeUser(user: UserDoc) {
  return R.omit(user.toJSON(), ['password', 'salt', 'resetPasswordCode']);
}
