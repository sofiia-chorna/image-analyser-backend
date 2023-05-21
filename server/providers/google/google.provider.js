import { google } from 'googleapis';
import { ENV } from '../../common/app/env.enum.js';

/**
 * Google Provider helper class
 */
class GoogleProvider {
    constructor() {
        /**
         * Represents the OAuth2 client for Google Sign-In
         * @private
         * @type {import('googleapis').OAuth2Client}
         */
        this.googleClient = new google.auth.OAuth2(
            ENV.GOOGLE.CLIENT_ID,
            ENV.GOOGLE.CLIENT_SECRET,
            ENV.GOOGLE.REDIRECT_URL,
        );
    }

    /**
     * Generates the login URL for Google Sign-In
     * @returns {string} The Google Sign-In URL
     */
    getLoginGoogleUrl() {
        return {
            url: this.googleClient.generateAuthUrl({
                access_type: 'offline',
                scope: ['profile', 'email', 'openid'],
                prompt: 'consent',
            })
        };
    }

    /**
     * Obtains user information from the authorization code
     * @param {string} code - The authorization code obtained after the user logs in
     * @returns {!Promise<Object>} The user data object
     */
    async loginGoogle(code) {
        // Extract OAuth2 token
        const { tokens } = await this.googleClient.getToken(code);
        this.googleClient.setCredentials(tokens);

        // Get user information using the userinfo endpoint
        const { data } = await google.oauth2('v2').userinfo.get({ auth: this.googleClient });

        // Return all info
        return data;
    }
}

export const googleProvider = new GoogleProvider();
