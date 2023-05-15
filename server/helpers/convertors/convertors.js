/**
 * @param {string | Object} data
 * @return {Object}
 */
export function getAsJSON(data) {
    try {
        if (data === undefined) {
            return {};
        }
        return (typeof data === 'string') ? JSON.parse(data) : data;
    } catch (_) {
        return {};
    }
}

/**
 * @param {string} value
 * @return {string | null}
 */
export function getAsISODate(value) {
    const date = new Date(value);
    if (!isNaN(date)) {
        return date.toISOString();
    }

    // If the input is not a valid date string, return null or handle accordingly
    console.error(`Invalid date string: ${date}`);
    return null;
}
