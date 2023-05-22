import { hashSync } from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '../../../common/constants/constants.js';

/**
 * @param {string | Buffer} data
 * @return {string}
 */
export function encryptSync(data) {
    return hashSync(data, USER_PASSWORD_SALT_ROUNDS);
}
