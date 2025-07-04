import { Request, Response } from 'express';
import { DeleteTodo } from '../../../application/todo/deleteTodo';

export const deleteTodoController = (usecase: DeleteTodo) => {
    return async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const success = await usecase.execute(id); 
            if (!success) {
                return res.status(404).json({ error: 'Todo not found' });
            }

            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Something went wrong.' });
        }
    };
};