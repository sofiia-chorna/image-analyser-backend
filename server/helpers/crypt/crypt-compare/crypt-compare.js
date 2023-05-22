import { compare } from 'bcrypt';

/**
 * @param {string | Buffer} data
 * @param {String} encrypted
 * @return {!Promise<boolean>}
 */
export async function cryptCompare(data, encrypted) {
    return await compare(data, encrypted);
}
