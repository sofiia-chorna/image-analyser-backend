/**
 * @param {!Object} payload
 * @return {!Object}
 */
export function wrapPayload(payload) {
    return { data: payload, size: payload.length };
}
