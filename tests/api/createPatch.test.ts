import { api } from '../../utils/api-helper';
import { endpoints } from '../../utils/api-endpoints';
import { partialTitle, partialBody, patchTodoData } from '../fixtures/apiData';

let createdPostId: number;
let createdTodoId: number;
let idToUpdate: number;

describe('JSONPlaceholder API PATCH Tests', () => {

    let idToPatch: number;

    beforeEach(() => {
        idToUpdate = Math.floor(Math.random() * 20) + 1;
    });

    test('PATCH /posts/{id} - Should update a title', async () => {

        const response = await api
            .patch(endpoints.jsonplaceholder.postById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send(partialTitle);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(response.body.title).toBe(partialTitle.title);
    });

    test('PATCH /posts/{id} - Should update a body', async () => {

        const response = await api
            .patch(endpoints.jsonplaceholder.postById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send(partialBody);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(response.body.body).toBe(partialBody.body);

    });

    test('PATCH /posts/{id} - Should patching with empty request body', async () => {

        const response = await api
            .patch(endpoints.jsonplaceholder.postById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send({});

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(Object.keys(response.body).length).toBe(4);
    });

    test('PATCH /todos/{id} - Should update a todo item', async () => {

        const response = await api
            .patch(endpoints.jsonplaceholder.todoById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send(patchTodoData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(response.body.completed).toBe(patchTodoData.completed);
    });

    test('PATCH /todos/{id} - Should update a todo item', async () => {

        const response = await api
            .patch(endpoints.jsonplaceholder.todoById(idToUpdate))
            .set('Content-Type', 'application/json')
            .send(partialTitle);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', idToUpdate);
        expect(response.body.title).toBe(partialTitle.title);
    });

});