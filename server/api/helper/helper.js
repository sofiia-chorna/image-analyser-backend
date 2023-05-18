import * as uuid from 'uuid';

/**
 * @param {!Object} payload
 * @return {!Object}
 */
export function wrapResponse(payload) {
    return { data: payload, size: payload.length };
}

/**
 * @param {!Object} payload
 * @param {boolean} create
 * @return {!Object}
 */
export function wrapPayload(payload, create = true) {
    const key = create ? 'createdAt': 'updatedAt';
    return { ...payload, [key]: new Date().toISOString() };
}
