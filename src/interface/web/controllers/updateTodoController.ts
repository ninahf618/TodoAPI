import { Request, Response } from 'express';
import { UpdateTodo } from '../../../application/todo/updateTodo';

export const updateTodoController = (usecase: UpdateTodo) => {
    return async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, body, due_date, completed } = req.body;

        if (title !== undefined && title.trim() === '') {
            return res.status(400).json({ error: 'Title cannot be empty' });
        }
        try {
            const updated = await usecase.execute({
                id,
                title,
                body,
                due_date: due_date ? new Date(due_date) : undefined,   
                completed_at: completed ? new Date() : undefined,
            });

            if (!updated) {
                return res.status(404).json({ error: 'Todo not found' });
            }

            res.json(updated);
        }catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong.' });
        }
    };
};