import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { Todo } from "../../domain/entities/Todo";

export class DuplicateTodo {
    constructor(private repo: TodoRepository) {}

    async execute(id: string): Promise<Todo | null> {
        const existing = await this.repo.findById(id);
        if (!existing) {
            return null;
        }

        return this.repo.create({
            title: `${existing.title}のコピー`, 
            body: existing.body, 
            due_date: null, 
            completed_at: null,
        });
    }
}