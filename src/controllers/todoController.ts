import { Request, Response } from "express";
import todoService from "../services/todoService";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = 1;
    const todos = await todoService.getTodos(userId);
    res.json(todos);
  } catch (error) {
    console.error("Error getting todos", error);
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = 1;
    const { todoText, dueDate, isCompleted, isFavorite } = req.body;
    const todo = await todoService.createTodo(
      userId,
      todoText,
      dueDate,
      isCompleted,
      isFavorite
    );
    res.json(todo);
  } catch (error) {
    console.error("Error creating todo", error);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const todoId = +req.params.todoId;
    const { isCompleted, isFavorite, todoText } = req.body;
    const todo = await todoService.updateTodo(
      todoId,
      todoText,
      isCompleted,
      isFavorite
    );
    res.json(todo);
  } catch (error) {
    console.error("Error updating todo", error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todoId = +req.params.todoId;
    await todoService.deleteTodo(todoId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo", error);
  }
};
