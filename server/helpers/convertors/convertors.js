/**
 * @param {string | Object} data
 * @param {string | Object=} defaultValue
 * @return {Object}
 */
export function getAsJSON(data, defaultValue = null) {
    try {
        if (data === undefined) {
            return defaultValue;
        }
        return (typeof data === 'string') ? JSON.parse(data) : data;
    } catch (_) {
        return defaultValue;
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
