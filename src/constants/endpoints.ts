export const enpoints = {
    login: 'auth/login',
    register: 'auth/register',
    validateToken: 'auth/validateToken',

    // {
    //     endpointName: 'login',
    //     value: 'auth/login'
    // },
    // {
    //     endpointName: 'register',
    //     value: 'auth/register'
    // },
    // {
    //     endpointName: 'logout',
    //     value: 'logout'
    // },
};

interface IEndpoint {
    endpointName: string,
    value: string,
}
