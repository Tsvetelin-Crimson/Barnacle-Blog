export const enpoints = {
    login: 'auth/login',
    register: 'auth/register',
    validateToken: 'auth/validateToken',
    allPosts: 'posts',
    postById: 'posts/id',
    createPost: 'posts/create',
    recentPosts: 'posts/recent',
    popularPosts: 'posts/popular',
    postOwnership: 'posts/validateOwnership',
    categories: 'categories',
};

interface IEndpoint {
    endpointName: string,
    value: string,
}
