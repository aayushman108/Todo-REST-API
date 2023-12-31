import { Todo } from "../models/todoModel";
import pool from "../db/pool";

import {
  getTodosQuery,
  createTodoQuery,
  updateTodoQuery,
  deleteTodoQuery,
} from "../db/queries/todoQueries";

const todoService = {
  getTodos: async (userId: number): Promise<Todo[]> => {
    const result = await pool.query(getTodosQuery, [userId]);
    return result.rows;
  },

  createTodo: async (
    userId: number,
    todoText: string,
    dueDate: Date,
    isCompleted: boolean,
    isFavorite: boolean
  ): Promise<Todo> => {
    const result = await pool.query(createTodoQuery, [
      userId,
      todoText,
      dueDate,
      isCompleted,
      isFavorite,
    ]);
    return result.rows[0];
  },

  updateTodo: async (
    todoId: number,
    todoText: string,
    isCompleted: boolean,
    isFavorite: boolean
  ): Promise<Todo> => {
    const result = await pool.query(updateTodoQuery, [
      todoText,
      isCompleted,
      isFavorite,
      todoId,
    ]);
    return result.rows[0];
  },

  deleteTodo: async (todoId: number): Promise<void> => {
    await pool.query(deleteTodoQuery, [todoId]);
  },
};

export default todoService;
