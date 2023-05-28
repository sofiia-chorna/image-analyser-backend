import { AuthApiPath, ControllerHook, HttpMethod } from '../../common/common.js';

const initAuth = (fastify, opts, done) => {
    // Retrieve services
    const { auth: authService } = opts.services;

    // REGISTER
    fastify.route({
        method: HttpMethod.POST,
        url: AuthApiPath.REGISTER,

        // Handle request
        [ControllerHook.HANDLER]: async (request) => {
            return await authService.register(request.body);
        },
    });

    // LOGIN
    fastify.route({
        method: HttpMethod.POST,
        url: AuthApiPath.LOGIN,

        // Handle request
        [ControllerHook.HANDLER]: async (request) => {
            return await authService.login(request.body);
        },
    });

    // GOOGLE LINK
    fastify.route({
        method: HttpMethod.GET,
        url: AuthApiPath.GOOGLE,

        // Handle request
        [ControllerHook.HANDLER]: async (request) => {
            return await authService.getLoginGoogleUrl(request.query);
        },
    });

    // GOOGLE LOGIN
    fastify.route({
        method: HttpMethod.POST,
        url: AuthApiPath.GOOGLE,

        // Handle request
        [ControllerHook.HANDLER]: async (request) => {
            return await authService.loginGoogle(request.body.code);
        },
    });

    // GITHUB LINK
    fastify.route({
        method: HttpMethod.GET,
        url: AuthApiPath.GITHUB,

        // Handle request
        [ControllerHook.HANDLER]: async (request) => {
            return await authService.getLoginGitHubUrl(request.query);
        },
    });

    // GITHUB LOGIN
    fastify.route({
        method: HttpMethod.POST,
        url: AuthApiPath.GITHUB,

        // Handle request
        [ControllerHook.HANDLER]: async (request) => {
            return await authService.loginGitHub(request.body.code);
        },
    });

    done();
};

export { initAuth };
