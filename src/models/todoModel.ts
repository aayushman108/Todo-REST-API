export interface Todo {
  todo_id: number;
  user_id: number;
  todo_text: string;
  due_date: Date;
  is_completed: boolean;
  is_favorite: boolean;
  created_at: Date;
}
