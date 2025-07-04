import { Request, Response } from 'express';
import { DuplicateTodo } from '../../../application/todo/duplicateTodo';

export const duplicateTodoController = (usecase: DuplicateTodo) => {
    return async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const newTodo = await usecase.execute(id);
            if (!newTodo) {
                return res.status(404).json({ error: 'Todo not found' });
            }

            res.status(201).json(newTodo);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong.' });
        }
    };
};