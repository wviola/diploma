export interface Post {
    userId: number;
    id?: number;
    title: string;
    body?: string;
}

export interface Todo {
    userId: number;
    id?: number;
    title: string;
    completed: boolean;
}

export interface PostID {
    userId: string;
    id?: number;
    title: string;
    body?: string;
}

export interface Put {
    userId: number;
    id?: number;
    title: string;
    body?: string;
}


export const newPostData: Post = {
    userId: 1,
    title: "My New Test Post",
    body: "This is the body of my new post"
};


export const newTodoData: Todo = {
    userId: 1,
    title: "Learn Jest and Superagent",
    completed: false
};

export const postWithoutBody: Post = {
    userId: 5,
    title: "No Body Post"
};

export const stringUserId: PostID = {
    userId: "1",
    title: "My New Test Post",
    body: "This is the body of my new post"
};

export const updatedPostData: Post = {
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
