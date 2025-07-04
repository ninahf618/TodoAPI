import { TodoRepository } from '../../domain//repositories/TodoRepository';

export class DeleteTodo {
    constructor(private repo: TodoRepository) {}

    async execute(id: string): Promise<boolean> {
        const existing = await this.repo.findById(id);
        if (!existing) {
            return false;
        }

        await this.repo.delete(id);
        return true;
    }
}