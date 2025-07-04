import { Todo } from "../entities/Todo";

export interface TodoRepository {
    findAll(filters: FindTodosFilter): Promise<Todo[]>;

    findById(id: string): Promise<Todo | null>;

    create(data: CreateTodoInput): Promise<Todo>;

    update(data: UpdateTodoInput): Promise<Todo | null>;

    delete(id: string): Promise<void>;
}

export interface FindTodosFilter {
        title?: string;
        body?: string;
        due_date_start?: Date; 
        due_date_end?: Date; 
        completed?: boolean;
}
export interface CreateTodoInput {
    title: string;
    body?: string | null;
    due_date?: Date | null;
    completed_at?: Date | null;
}

export interface UpdateTodoInput {
    id: string;
    title?: string;
    body?: string | null;
    due_date?: Date | null;
    completed_at?: Date | null;
}