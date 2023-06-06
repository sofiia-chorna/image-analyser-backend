import { HttpCode, HttpError, HttpMessage } from '../../common/common.js';
import { user as userRepository } from '../../data/repositories/repositories.js';
import { googleProvider, githubProvider } from '../../providers/providers.js';
import { createToken, cryptCompare, encrypt } from '../../helpers/helpers.js';

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
        const { userRepository, googleProvider, githubProvider } = params;

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

        /**
         * @private
         * @type {function(*)}
         */
        this._githubProvider = githubProvider;
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

    /**
     * Generates the login URL for GitHub Sign-In
     * @returns {string} The GitHub Sign-In URL
     */
    getLoginGitHubUrl() {
        return this._githubProvider.getLoginGitHubUrl();
    }

    /**
     * Obtains user information from the authorization code
     * @param {string} code - The authorization code obtained after the user logs in with GitHub
     * @returns {!Promise<Object>} The user data object
     */
    async loginGitHub(code) {
        // Obtains user information from the authorization code
        const oauthUserData = await this._githubProvider.loginGitHub(code);

        // If user already exists -> return existing one
        const user = await this._userRepository.getUserByField('login', oauthUserData.login);
        if (user) {
            return user;
        }

        // New user -> save to the db
        return await this._userRepository.insertUser(oauthUserData);
    }

    /**
     * @param {{ email: string, password: string }} data
     * @returns {!Promise<Object>}
     */
    async register(data) {
        const { email, password } = data;
        // Check email
        const user = await this._userRepository.getUserByField('email', email);
        if (user) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: HttpMessage.EMAIL_ALREADY_EXISTS,
            });
        }

        // Create user
        await this._userRepository.insertUser({
            ...data,
            password: await encrypt(password)
        });

        // Login
        return await this.login(data);
    }

    /**
     * @param {{ email: string, password:string }} data
     * @returns {!Promise<Object>}
     */
    async login(data) {
        const { email, password } = data;

        // Check email
        const user = await this._userRepository.getUserByField('email', email);
        if (!user) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: HttpMessage.INVALID_LOGIN_DATA,
            });
        }

        // Check password
        const isPasswordCorrect = await cryptCompare(password, user.password);
        if (!isPasswordCorrect) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: HttpMessage.INVALID_LOGIN_DATA,
            });
        }

        // Done
        return {
            token: createToken(user.id),
            user: user
        };
    }
}

// Initialize auth service
export const auth = new Auth({
    userRepository: userRepository,
    googleProvider: googleProvider,
    githubProvider: githubProvider,
});
