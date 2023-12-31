export const getTodosQuery = "SELECT * FROM todos";

export const createTodoQuery =
  "INSERT INTO todos (user_id, todo_text, due_date, is_completed, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *";

export const updateTodoQuery =
  "UPDATE todos SET todo_text = $1, is_completed = $2, is_favorite = $3 WHERE todo_id = $4 RETURNING *";

export const deleteTodoQuery =
  "DELETE FROM todos WHERE todoId = $1 RETURNING *";
