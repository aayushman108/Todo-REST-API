export interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  salt: string;
}
