export const endpoints = {
    jsonplaceholder: {
        posts: '/posts',
        postById: (postId: number | string) => `/posts/${postId}`,
        postComments: (postId: number | string) => `/posts/${postId}/comments`,
        todos: '/todos',
        todoById: (todoId: number | string) => `/todos/${todoId}`,
        users: '/users',
        userById: (userId: number | string) => `/users/${userId}`,
    }
};