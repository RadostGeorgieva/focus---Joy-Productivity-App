export interface ToDoList {
    id?: string,
    collection: string,
    createdAt: Date,
    items: string[],
}

export interface ToDoItem {
    text: string,
}

