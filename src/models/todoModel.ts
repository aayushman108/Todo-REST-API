export interface Todo {
  todoId: number;
  userId: number;
  todoText: string;
  dueDate: Date;
  isCompleted: boolean;
  isFavorite: boolean;
  createdAt: Date;
}
