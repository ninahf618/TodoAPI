import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { Todo } from "../../domain/entities/Todo";

export class GetTodo {
    constructor(private repo: TodoRepository) {}

    async execute(id: string): Promise<Todo | null> {
        return this.repo.findById(id);
    }
}