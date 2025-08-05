import { api } from '../../utils/api-helper';
import { endpoints } from '../../utils/api-endpoints';
import {
    newPostData, updatedPostData, newTodoData,
    postWithoutBody, stringUserId, stringId,
    negativeId, postWithExtraField, partialTitle,
    partialBody, patchTodoData
} from '../../fixtures/jsonplaceholderData';
import superagent from 'superagent';

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

        console.log(createdPostId)
        const response = await api
            .get(endpoints.jsonplaceholder.postById(createdPostId));

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdPostId);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('body');
        expect(response.body).toHaveProperty('userId');
    });

    test('GET /posts/{id}/comments - Should return comments for a specific post', async () => {

        console.log(createdPostId)
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
            .send(stringUserId);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('userId', stringUserId.userId);
    });
});


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

    describe('JSONPlaceholder API DELETE Tests', () => {
        beforeEach(async () => {

            const response = await api
                .post(endpoints.jsonplaceholder.posts)
                .set('Content-Type', 'application/json')
                .send(newPostData);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');

            createdPostId = response.body.id;
            createdTodoId = response.body.id; // добавит в делете бефоре
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
});