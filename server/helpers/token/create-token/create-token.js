import jwt from 'jsonwebtoken';
import { ENV } from '../../../common/common.js';

/**
 * @param {!Object} data
 * @return {string}
 */
export function createToken(data) {
    return jwt.sign(data, ENV.JWT.SECRET);
}
