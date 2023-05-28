import axios from 'axios';
import queryString from 'query-string';
import { ENV, HttpMethod } from '../../common/common.js';

/**
 * GitHub Provider helper class
 */
class GitHubProvider {
    constructor() { /* empty */ }

    /**
     * Generates the login URL for GitHub authorization
     * @returns {string} The GitHub authorization URL
     */
    getLoginGitHubUrl() {
        return {
            url: `https://github.com/login/oauth/authorize?client_id=${ENV.GITHUB.CLIENT_ID}&redirect_uri=${ENV.GITHUB.REDIRECT_URL}`,
        };
    }

    async getAccessTokenFromCode(code) {
        const { data } = await axios({
            url: 'https://github.com/login/oauth/access_token',
            method: HttpMethod.GET,
            params: {
                client_id: ENV.GITHUB.CLIENT_ID,
                client_secret: ENV.GITHUB.CLIENT_SECRET,
                redirect_uri: ENV.GITHUB.REDIRECT_URL,
                code: code,
            },
        });

        // GitHub returns data as a string we must parse.
        const parsedData = queryString.parse(data);

        // Get access token
        return parsedData.access_token;
    };

    async getGitHubUserData(accessToken) {
        const { data } = await axios({
            url: 'https://api.github.com/user',
            method: 'get',
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });
        return data;
    };

    /**
     * Obtains user information from the authorization code
     * @param {string} code - The authorization code obtained after the user logs in with GitHub
     * @returns {!Promise<Object>} The user data object
     */
    async loginGitHub(code) {
        // Exchange the authorization code for an access token
        const accessToken = await this.getAccessTokenFromCode(code);

        // Get the authenticated user's information
        return await this.getGitHubUserData(accessToken);
    }
}

export const githubProvider = new GitHubProvider();
