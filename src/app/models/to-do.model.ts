export interface ToDoList {
    id?: string,
    collection?: string,
    createdAt?: Date,
    items: string[],
}


export interface ToDoLoggedIn {
    id?: string,
    user?:string,
    title: string,
    color: string,
    tasks: Task[],
    metadata?: ToDoListMetadata;

}

export interface Task {
    category: 'daily' | 'weekly' | 'monthly';
    id?: string; 
    title: string;
    completed: boolean;
  }

  export interface ToDoListMetadata {
    shared: boolean;
    likesCount?: number;
    likedBy?: string[];
    dislikesCount?: number;
    comments?: string[];
  }
  export interface Comment {
    user: string;   
    text: string;  
    createdAt: Date;
}