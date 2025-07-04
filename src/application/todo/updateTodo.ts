import { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo } from '../../domain/entities/Todo';

interface UpdateTodoInput {
    id: string;
    title?: string;
    body?: string | null;
    due_date?: Date | null;
    completed_at?: Date | null;
}

export class UpdateTodo {
    constructor(private repo: TodoRepository) {}

    async execute(input: UpdateTodoInput): Promise<Todo | null> {
        const existing = await this.repo.findById(input.id);
        if (!existing) {
            return null;
        }

        return this.repo.update({
            id: input.id, 
            title: input.title ?? existing.title, 
            body: input.body ?? existing.body, 
            due_date: input.due_date ?? existing.due_date, 
            completed_at: input.completed_at ?? existing.completed_at, 
        });
    }
}