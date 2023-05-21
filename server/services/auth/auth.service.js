import { user as userRepository } from '../../data/repositories/repositories.js';
import { googleProvider } from '../../providers/google/google.provider.js';

/**
 * Auth service helper class
 */
class Auth {
    /**
     * @param {!Object} params
     * @return {Collection}
     */
    constructor(params) {
        // Get repositories from params
        const { userRepository, googleProvider } = params;

        /**
         * @private
         * @type {function(*)}
         */
        this._userRepository = userRepository;

        /**
         * @private
         * @type {function(*)}
         */
        this._googleProvider = googleProvider;
    }

    /**
     * Generates the login URL for Google Sign-In
     * @returns {string} The Google Sign-In URL
     */
    getLoginGoogleUrl() {
        return this._googleProvider.getLoginGoogleUrl();
    }

    /**
     * @param {string} code - The authorization code obtained after the user logs in
     * @returns {!Promise<Object>}
     */
    async loginGoogle(code) {
        // Obtains user information from the authorization code
        const oauthUserData = await this._googleProvider.loginGoogle(code);

        // If user already exists -> return existing one
        const user = await this._userRepository.getUserByField('email', oauthUserData.email);
        if (user) {
            return user;
        }

        // New user -> save to the db
        return await this._userRepository.insertUser(oauthUserData);
    }
}

// Initialize auth service
export const auth = new Auth({
    userRepository: userRepository,
    googleProvider: googleProvider,
});
