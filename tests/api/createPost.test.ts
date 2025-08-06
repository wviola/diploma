import { api } from '../../utils/api-helper';
import { endpoints } from '../../utils/api-endpoints';
import { newPostData, newTodoData, postWithoutBody, requestWithInvalidUserId, postWithExtraField } from '../fixtures/apiData';

let createdPostId: number;
let createdTodoId: number;

describe('JSONPlaceholder API POST tests', () => {

    test('POST /posts - Should create a new post successfully', async () => {

        const response = await api
            .post(endpoints.jsonplaceholder.posts)
            .set('Content-Type', 'application/json')
            .send(newPostData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(newPostData.title);
        expect(response.body.body).toBe(newPostData.body);
        expect(response.body.userId).toBe(newPostData.userId);
    });

    test('POST /todos - Should create a new todo item', async () => {

        const response = await api
            .post(endpoints.jsonplaceholder.todos)
            .set('Content-Type', 'application/json')
            .send(newTodoData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(newTodoData.title);
        expect(response.body.completed).toBe(newTodoData.completed);
        expect(response.body.userId).toBe(newTodoData.userId);

    });

    test('POST /posts - Should create a new post without "body" ', async () => {

        const response = await api
            .post(endpoints.jsonplaceholder.posts)
            .set('Content-Type', 'application/json')
            .send(postWithoutBody);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe(postWithoutBody.title);
        expect(response.body.body).toBeUndefined();
    });

    test('POST /posts - Should handle extra fields in request body', async () => {

        const response = await api
            .post(endpoints.jsonplaceholder.posts)
            .set('Content-Type', 'application/json')
            .send(postWithExtraField);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('extraField', 'some_value');
    });

    test('POST /posts - Should create post with string userId', async () => {

        const response = await api
            .post(endpoints.jsonplaceholder.posts)
            .set('Content-Type', 'application/json')
            .send(requestWithInvalidUserId);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('userId', requestWithInvalidUserId.userId);
    });
});