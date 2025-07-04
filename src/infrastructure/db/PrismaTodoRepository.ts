import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { Todo } from "../../domain/entities/Todo";
import { PrismaClient, Todo as PrismaTodo } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaTodoRepository implements TodoRepository {

    private mapToDomain(prismaTodo: PrismaTodo): Todo {
        return {
            id: prismaTodo.id.toString(),
            title: prismaTodo.title,
            body: prismaTodo.body,
            due_date: prismaTodo.due_date,
            completed_at: prismaTodo.completed_at,
            created_at: prismaTodo.created_at,
        };
    }

    async findAll(filters?: {
        title?: string;
        body?: string;
        due_date_start?: Date; 
        due_date_end?: Date;
        completed?: boolean;
    }): Promise<Todo[]> {
        const todos = await prisma.todo.findMany({
            where: {
                ...(filters?.title && { title: { contains: filters.title } }),
                ...(filters?.body && { body: { contains: filters.body } }),
                ...(filters?.due_date_start || filters?.due_date_end
                    ? {
                        due_date: {
                            ...(filters?.due_date_start && { gte: filters.due_date_start }),
                            ...(filters?.due_date_end && { lte: filters.due_date_end }),
                        },
                    }
                    : {}),
                ...(filters?.completed !== undefined && {
                    completed_at: filters.completed ? { not: null } : null,
                }),
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return todos.map(this.mapToDomain);
    }

    async findById(id: string): Promise<Todo | null> {
        const todo = await prisma.todo.findUnique({
            where: { id },
        });
        return todo ? this.mapToDomain(todo) : null;
    }

    async create(todo: {
        title: string;
        body?: string | null;
        due_date?: Date | null;
        completed_at?: Date | null;
    }): Promise<Todo> {
        const created = await prisma.todo.create({
            data: todo,
        });
        return this.mapToDomain(created);
    }

    async update(todo: {
        id: string;
        title?: string;
        body?: string | null;
        due_date?: Date | null;
        completed_at?: Date | null;
    }): Promise<Todo | null> {
        const updated = await prisma.todo.update({
            where: { id: todo.id },
            data: {
                title: todo.title,
                body: todo.body,
                due_date: todo.due_date,
                completed_at: todo.completed_at,
            },
        });
        return updated ? this.mapToDomain(updated) : null;
    }

    async delete(id: string): Promise<void> {
        await prisma.todo.delete({
            where: { id },
        });
    }
}
