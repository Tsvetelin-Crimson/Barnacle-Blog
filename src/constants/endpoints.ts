export const enpoints = {
    login: 'auth/login',
    register: 'auth/register',
    validateToken: 'auth/validateToken',
    allPosts: 'posts',
    createPost: 'posts/create',
    recentPosts: 'posts/recent',
    popularPosts: 'posts/popular',
    categories: 'categories',
};

interface IEndpoint {
    endpointName: string,
    value: string,
}
