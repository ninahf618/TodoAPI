import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { ListTodosDTO } from "./dto/ListTodosDTO";
import { Todo } from "../../domain/entities/Todo";

export class ListTodos {
    constructor(private repo: TodoRepository) {}

    async execute(filters: ListTodosDTO): Promise<Todo[]> {
        return this.repo.findAll(filters);
    }
}