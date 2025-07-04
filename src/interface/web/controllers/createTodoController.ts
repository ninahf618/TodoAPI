import { Request, Response } from 'express';
import { CreateTodo } from '../../../application/todo/createTodo';

export const createTodoController = (usecase: CreateTodo) => {
    return async (req: Request, res: Response) => {
        try {
            const { title, body, due_date } = req.body;

            if (!title) {
                return res.status(400).json({ error: 'Title is required' });
            }

            const todo = await usecase.execute({
                title,
                body, 
                due_date: due_date ? new Date(due_date) : undefined,
            });

            res.status(201).json(todo);
        } catch (err) {
            res.status(500).json({ error: 'Something went wrong.' });
    }
};
};