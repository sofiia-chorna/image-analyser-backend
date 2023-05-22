import { hash } from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '../../../common/constants/constants.js';

/**
 * @param {string | Buffer} data
 * @return {!Promise<string>}
 */
export async function encrypt(data) {
    return await hash(data, USER_PASSWORD_SALT_ROUNDS);
}
