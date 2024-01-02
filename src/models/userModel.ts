export interface User {
  userId: number;
  username: string;
  email: string;
  password_hash: string;
  isAdmin: boolean;
  createdAt: Date;
  salt: string;
}
