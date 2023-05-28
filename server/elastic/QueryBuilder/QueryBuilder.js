export class QueryBuilder {
    /**
     * Constructor
     */
    constructor() {
        /**
         * @private
         * @type {!Object}
         */
        this.bool = { must: [] };
    };

    /**
     * @param {string} field
     * @param {*} value
     * @return {boolean}
     */
    checkInput(field, value) {
        if (value === undefined || value === null) {
            console.log(`Field ${field}: the value is empty, omitting`);
            return false;
        }
        return true;
    }

    /**
     * @param {string} field
     * @param {string} value
     * @param {boolean=} caseInsensitive
     * @return {!QueryBuilder}
     */
    regex(field, value, caseInsensitive = true) {
        if (this.checkInput(field, value)) {
            this.bool.must.push({
                regexp: {
                    [field]: {
                        value: value,
                        flags: 'ALL',
                        case_insensitive: caseInsensitive,
                    },
                },
            });
        }
        return this;
    }

    /**
     * @param {string} field
     * @param {string} value
     * @param {boolean=} caseInsensitive
     * @return {!QueryBuilder}
     */
    wildcard(field, value, caseInsensitive = true) {
        if (this.checkInput(field, value)) {
            this.bool.must.push({
                wildcard: {
                    [field]: {
                        value: value,
                        case_insensitive: caseInsensitive,
                    },
                },
            });
        }
        return this;
    }

    /**
     * @param {string} field
     * @param {number} min
     * @param {number} max
     * @return {!QueryBuilder}
     */
    range(field, min, max) {
        if (this.checkInput(field, min) && this.checkInput(field, max)) {
            this.bool.must.push({
                range: {
                    [field]: {
                        gte: min,
                        lte: max,
                    },
                }
            });
        }
        return this;
    }

    /**
     * @param {string} field
     * @param {string} value
     * @return {!QueryBuilder}
     */
    match(field, value) {
        if (this.checkInput(field, value)) {
            this.bool.must.push({
                match: {
                    [field]: value
                }
            });
        }
        return this;
    }

    /**
     * @param {string} field
     * @param {!Array<string>} values
     * @return {!QueryBuilder}
     */
    terms(field, values) {
        if (this.checkInput(field, values)) {
            this.bool.must.push({
                terms: {
                    [`doc.${field}`]: values
                }
            });
        }
        return this;
    }

    /**
     * @param {string} field
     * @param {string} value
     * @param {number=} fuzziness
     * @return {!QueryBuilder}
     */
    fuzzy(field, value, fuzziness = 1) {
        if (this.checkInput(field, value)) {
            this.bool.must.push({
                fuzzy: {
                    [`doc.${field}`]: {
                        value: value,
                        fuzziness: fuzziness
                    },
                }
            });
        }
        return this;
    }
}
