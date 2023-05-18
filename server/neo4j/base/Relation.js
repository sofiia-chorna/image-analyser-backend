export class Relation {
    /**
     * @type {{ origin: string, destination: string }} params
     */
    constructor(params) {
        /**
         * @private
         * @type {string}
         */
        this.name = `${params.origin}_${params.destination}`;

        /**
         * @protected
         * @type {string}
         */
        this.origin = params.origin;

        /**
         * @protected
         * @type {string}
         */
        this.destination = params.destination;
    }

    /**
     * @public
     * @type {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @public
     * @type {string}
     */
    getOrigin() {
        return this.origin;
    }

    /**
     * @public
     * @type {string}
     */
    getDestination() {
        return this.destination;
    }
}
