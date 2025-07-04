import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { Todo } from "../../domain/entities/Todo";

interface CreateTodoInput {
    title: string;
    body?: string | null;
    due_date?: Date | null;
}

export class CreateTodo {
    constructor(private repo: TodoRepository) {}

    async execute(data: CreateTodoInput): Promise<Todo> {
        return this.repo.create(data);
    }
}