import { User } from "../models/userModel";
import pool from "../db/pool";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  signupQuery,
  loginQuery,
  checkEmailQuery,
  checkUsernameQuery,
} from "../db/queries/authQueries";

const generateAccessToken = (user: User): string => {
  return jwt.sign(
    { userId: user.userId, username: user.username },
    "your-secret-key",
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (): string => {
  return jwt.sign({}, "your-refresh-secret-key", { expiresIn: "7d" });
};

const authService = {
  signUp: async (
    username: string,
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    // Basic input validation
    if (!username || !email || !password) {
      throw new Error("Username, email, and password are required.");
    }

    const emailExists = await authService.checkEmailExists(email);
    if (emailExists) {
      throw new Error("Email is already taken.");
    }

    const usernameExists = await authService.checkUsernameExists(username);
    if (usernameExists) {
      throw new Error("Username is already taken.");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await pool.query(signupQuery, [
      username,
      email,
      hashedPassword,
      salt,
    ]);
    const user: User = result.rows[0];

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    return { accessToken, refreshToken };
  },

  login: async (
    username: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    // Implement user login logic
    const result = await pool.query(loginQuery, [username]);
    const user: User = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password + user.salt))) {
      throw new Error("Invalid login credentials");
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    return { accessToken, refreshToken };
  },

  checkEmailExists: async (email: string): Promise<boolean> => {
    const result = await pool.query(checkEmailQuery, [email]);
    return result.rows.length > 0;
  },

  checkUsernameExists: async (username: string): Promise<boolean> => {
    const result = await pool.query(checkUsernameQuery, [username]);
    return result.rows.length > 0;
  },
};

export default authService;
