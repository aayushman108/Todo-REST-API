import { Request, Response } from "express";
import pool from "../db/pool";
import {
  getTodosQuery,
  createTodoQuery,
  updateTodoQuery,
  deleteTodoQuery,
} from "../db/queries/todoQueries";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(getTodosQuery);
    res.json(result.rows);
  } catch (error) {
    console.error("Error getting todos", error);
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, todoText, dueDate, isCompleted, isFavorite } = req.body;

  try {
    const result = await pool.query(createTodoQuery, [
      userId,
      todoText,
      dueDate,
      isCompleted,
      isFavorite,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating todo", error);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { todoId } = req.params;
  const { isCompleted, isFavorite, todoText } = req.body;

  try {
    const result = await pool.query(updateTodoQuery, [
      todoText,
      isCompleted,
      isFavorite,
      todoId,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating todo", error);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { todoId } = req.params;

  try {
    const result = await pool.query(deleteTodoQuery, [todoId]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error deleting todo", error);
  }
};
