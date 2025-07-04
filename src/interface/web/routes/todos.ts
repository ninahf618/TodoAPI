import { Router } from "express";
import { PrismaTodoRepository } from "../../../infrastructure/db/PrismaTodoRepository";

// Controllers
import { listTodosController } from "../../web/controllers/listTodosController";
import { getTodoController } from "../../web/controllers/getTodoController";
import { createTodoController } from "../../web/controllers/createTodoController";
import { updateTodoController } from "../../web/controllers/updateTodoController";
import { deleteTodoController } from "../../web/controllers/deleteTodoController";
import { duplicateTodoController } from "../../web/controllers/duplicateTodoController";

// Use Cases
import { ListTodos } from "../../../application/todo/listTodos";
import { GetTodo } from "../../../application/todo/getTodo";
import { CreateTodo } from "../../../application/todo/createTodo";
import { UpdateTodo } from "../../../application/todo/updateTodo";
import { DeleteTodo } from "../../../application/todo/deleteTodo";
import { DuplicateTodo } from "../../../application/todo/duplicateTodo";

export const createTodosRouter = () => {
  const router = Router();
  const repo = new PrismaTodoRepository();

  const listTodos = new ListTodos(repo);
  const getTodo = new GetTodo(repo);
  const createTodo = new CreateTodo(repo);
  const updateTodo = new UpdateTodo(repo);
  const deleteTodo = new DeleteTodo(repo);
  const duplicateTodo = new DuplicateTodo(repo);

  router.get("/", listTodosController(listTodos));
  router.get("/:id", (req, res, next) => {
    getTodoController(getTodo)(req, res).catch(next);
  });
  router.post("/", (req, res, next) => {
    createTodoController(createTodo)(req, res).catch(next);
  });
  router.patch("/:id", (req, res, next) => {
    updateTodoController(updateTodo)(req, res).catch(next);
  });
  router.delete("/:id", (req, res, next) => {
    deleteTodoController(deleteTodo)(req, res).catch(next);
  });
  router.post("/:id/duplicate", (req, res, next) => {
    duplicateTodoController(duplicateTodo)(req, res).catch(next);
  });

  return router;
};
