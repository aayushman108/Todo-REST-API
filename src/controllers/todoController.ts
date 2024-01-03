import { Request, Response, NextFunction } from "express";
import todoService from "../services/todoService";
import { todoSchema } from "../schemas/todoSchema";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const user_id = 1;
    const todos = await todoService.getTodos(user_id);
    res.json(todos);
  } catch (error) {
    console.error("Error getting todos", error);
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = 1;
    const { todo_text, due_date, is_completed, is_favorite } = req.body;

    const input = { todo_text, due_date, is_completed, is_favorite };
    const { error } = todoSchema.validate(input);

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const todo = await todoService.createTodo(
      user_id,
      todo_text,
      due_date,
      is_completed,
      is_favorite
    );
    res.json(todo);
  } catch (error) {
    console.error("Error creating todo", error);
    next(error);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todo_id = +req.params.todoId;
    const { is_completed, is_favorite, todo_text } = req.body;
    const todo = await todoService.updateTodo(
      todo_id,
      todo_text,
      is_completed,
      is_favorite
    );
    res.json(todo);
  } catch (error) {
    console.error("Error updating todo", error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo_id = +req.params.todoId;
    await todoService.deleteTodo(todo_id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo", error);
  }
};
