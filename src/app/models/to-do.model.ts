export interface ToDoList {
    id?: string,
    collection?: string,
    createdAt?: Date,
    items: string[],
}


export interface ToDoLoggedIn {
    id?: string,
    title: string,
    color: string, // Hex color for identification
    tasks: Task[],
    category: 'daily' | 'weekly' | 'monthly';
}

export interface Task {
    id?: string; 
    title: string;
    completed: boolean;
  }