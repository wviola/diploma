import { api } from '../../utils/api-helper';
import { endpoints } from '../../utils/api-endpoints';
import { newPostData } from '../fixtures/apiData';

let createdPostId: number;
let createdTodoId: number;

describe('JSONPlaceholder API GET Tests', () => {

    beforeEach(async () => {

        const response = await api
            .post(endpoints.jsonplaceholder.posts)
            .set('Content-Type', 'application/json')
            .send(newPostData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('userId');

        createdPostId = response.body.userId;
    });

    test('GET /posts - Should return all posts', async () => {

        const response = await api
            .get(endpoints.jsonplaceholder.posts);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('userId');
    });

    test('GET /posts/{id} - Should return a single post by ID', async () => {

        const response = await api
            .get(endpoints.jsonplaceholder.postById(createdPostId));

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdPostId);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('body');
        expect(response.body).toHaveProperty('userId');
    });

    test('GET /posts/{id}/comments - Should return comments for a specific post', async () => {

        const response = await api
            .get(endpoints.jsonplaceholder.postComments(createdPostId));

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('postId', createdPostId);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('email');
        expect(response.body[0]).toHaveProperty('body');
    });

    test('GET /todos - Should return all todos', async () => {

        const response = await api
            .get(endpoints.jsonplaceholder.todos);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('userId');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('completed');
    });

    test('GET /users - Should return all users', async () => {

        const response = await api
            .get(endpoints.jsonplaceholder.users);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('email');
    });
});