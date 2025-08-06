export interface PostData {
    userId: number;
    id?: number;
    title: string;
    body?: string;
}

export interface TodoRequestData {
    userId: number;
    id?: number;
    title: string;
    completed: boolean;
}

export interface PostDataID {
    userId: string;
    id?: number;
    title: string;
    body?: string;
}

export const newPostData: PostData = {
    userId: 1,
    title: "My New Test Post",
    body: "This is the body of my new post"
};


export const newTodoData: TodoRequestData = {
    userId: 1,
    title: "Learn Jest and Superagent",
    completed: false
};

export const postWithoutBody: PostData = {
    userId: 5,
    title: "No Body Post"
};

export const requestWithInvalidUserId: PostDataID = {
    userId: "1",
    title: "My New Test Post",
    body: "This is the body of my new post"
};

export const updatedPostData: PostData = {
    id: 1,
    userId: 1,
    title: "Updated Test Post",
    body: "This is the updated body of thepost."
};

export const stringId = "12";
export const negativeId = -1;
export const postWithExtraField = { ...newPostData, extraField: 'some_value' };
export const partialTitle = { title: 'Only Title Updated' };
export const partialBody = { body: 'Only' };
export const patchTodoData = { completed: true };
