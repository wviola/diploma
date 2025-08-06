import { api } from '../../utils/api-helper';
import { endpoints } from '../../utils/api-endpoints';
import { updatedPostData, partialTitle } from '../fixtures/apiData';

let createdPostId: number;
let createdTodoId: number;

describe('JSONPlaceholder API PUT Tests', () => {

    let idToUpdate: number;

    beforeEach(() => {
        idToUpdate = Math.floor(Math.random() * 20) + 1;
    });

    test('PUT /posts/{id} - Should fully update a post', async () => {

        const response = await api
            .put(endpoints.jsonplaceholder.postById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send(updatedPostData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(response.body.title).toBe(updatedPostData.title);
        expect(response.body.body).toBe(updatedPostData.body);
        expect(response.body.userId).toBe(updatedPostData.userId);
    });

    test('PUT /posts/{id} - Should replace title in post', async () => {

        const response = await api
            .put(endpoints.jsonplaceholder.postById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send(partialTitle);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(response.body.title).toBe(partialTitle.title);
        expect(response.body).not.toHaveProperty('body');
        expect(response.body).not.toHaveProperty('userId');
    });

    test('PUT /posts/{id} - Should update with empty request body', async () => {

        const response = await api
            .put(endpoints.jsonplaceholder.postById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send({});

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(Object.keys(response.body).length).toBe(1);
    });

    test('PUT /todos/{id} - Should fully update a todo item', async () => {

        const response = await api
            .put(endpoints.jsonplaceholder.todoById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send(updatedPostData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(response.body.title).toBe(updatedPostData.title);
        expect(response.body.body).toBe(updatedPostData.body);
    });

    test('PUT /todos/{id} - Should replace title in todos', async () => {

        const response = await api
            .put(endpoints.jsonplaceholder.todoById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send(partialTitle);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(response.body.title).toBe(partialTitle.title);
        expect(response.body).not.toHaveProperty('body');
        expect(response.body).not.toHaveProperty('userId');
    });
});