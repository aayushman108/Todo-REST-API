export const getTodosQuery = "SELECT * FROM todos";

export const createTodoQuery =
  "INSERT INTO todos (user_id, todo_text, due_date, is_completed, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *";
