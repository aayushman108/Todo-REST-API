import { Todo } from "../models/todoModel";
import pool from "../db/pool";

import {
  getTodosQuery,
  createTodoQuery,
  updateTodoQuery,
  deleteTodoQuery,
} from "../db/queries/todoQueries";

const todoService = {
  getTodos: async (user_id: number): Promise<Todo[]> => {
    const result = await pool.query(getTodosQuery, [user_id]);
    return result.rows;
  },

  createTodo: async (
    user_id: number,
    todo_text: string,
    due_date: Date,
    is_completed: boolean,
    is_favorite: boolean
  ): Promise<Todo> => {
    const result = await pool.query(createTodoQuery, [
      user_id,
      todo_text,
      due_date,
      is_completed,
      is_favorite,
    ]);
    return result.rows[0];
  },

  updateTodo: async (
    todo_id: number,
    todo_text: string,
    is_completed: boolean,
    is_favorite: boolean
  ): Promise<Todo> => {
    const result = await pool.query(updateTodoQuery, [
      todo_text,
      is_completed,
      is_favorite,
      todo_id,
    ]);
    return result.rows[0];
  },

  deleteTodo: async (todo_id: number): Promise<void> => {
    await pool.query(deleteTodoQuery, [todo_id]);
  },
};

export default todoService;
