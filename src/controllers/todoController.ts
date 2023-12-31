import { Request, Response } from "express";
import pool from "../db/pool";
import { getTodosQuery, createTodoQuery } from "../db/queries/todoQueries";

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
