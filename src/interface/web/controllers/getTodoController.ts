import { Request, Response } from "express";
import { GetTodo } from "../../../application/todo/getTodo";

export const getTodoController = (useCase: GetTodo) => {
  return async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const todo = await useCase.execute(id);

      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };
};
