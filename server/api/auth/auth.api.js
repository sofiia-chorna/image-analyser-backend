import { AuthApiPath, ControllerHook, HttpMethod } from '../../common/common.js';

const initAuth = (fastify, opts, done) => {
    // Retrieve services
    const { auth: authService } = opts.services;

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

    done();
};

export { initAuth };
