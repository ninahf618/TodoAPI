import { Request, Response } from 'express';
import { ListTodosDTO } from '../../../application/todo/dto/ListTodosDTO';
import { ListTodos } from '../../../application/todo/listTodos';


export const listTodosController = (usecase: ListTodos) => {
    return async (req: Request, res: Response) => {
        try {
            const { title, body, due_date_start, due_date_end, completed } = req.query;
            const filters: ListTodosDTO = {
                title: title as string, 
                body: body as string,
                due_date_start: due_date_start ? new Date(String(due_date_start)) : undefined,
                due_date_end: due_date_end ? new Date(String(due_date_end)) : undefined,
                completed: completed !== undefined ? completed === 'true' : undefined,
            };

            const todos = await usecase.execute(filters);
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ error: "Something went wrong." });
        }
    };
};

