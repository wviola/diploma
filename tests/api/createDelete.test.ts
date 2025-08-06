import { api } from '../../utils/api-helper';
import { endpoints } from '../../utils/api-endpoints';
import { newPostData, stringId, negativeId, } from '../fixtures/apiData';

let createdPostId: number;
let createdTodoId: number;

describe('JSONPlaceholder API DELETE Tests', () => {
    beforeEach(async () => {

        const response = await api
            .post(endpoints.jsonplaceholder.posts)
            .set('Content-Type', 'application/json')
            .send(newPostData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');

        createdPostId = response.body.id;
        createdTodoId = response.body.id;
    });

    test('DELETE /posts/{id} - Should delete an existing post', async () => {

        const response = await api
            .delete(endpoints.jsonplaceholder.postById(createdPostId));

        expect(response.status).toBe(200);
        expect(Object.keys(response.body).length).toBe(0);
    });

    test('DELETE /todos/{id} - Should delete an existing todo item', async () => {

        const response = await api
            .delete(endpoints.jsonplaceholder.todoById(createdTodoId));

        expect(response.status).toBe(200);
        expect(Object.keys(response.body).length).toBe(0);
    });

    test('DELETE /posts/{id} - Should handle string ID gracefully', async () => {

        const response = await api
            .delete(endpoints.jsonplaceholder.postById(stringId));

        expect(response.status).toBe(200);
        expect(Object.keys(response.body).length).toBe(0);
    });

    test('DELETE /posts/{id} - Should handle negative ID', async () => {

        const response = await api
            .delete(endpoints.jsonplaceholder.postById(negativeId));

        expect(response.status).toBe(200);
        expect(Object.keys(response.body).length).toBe(0);
    });
});