import { User } from "../models/userModel";
import pool from "../db/pool";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  signupQuery,
  loginQuery,
  checkEmailQuery,
  checkUsernameQuery,
  getUserQuery,
} from "../db/queries/authQueries";

const generateAccessToken = (user: User): string => {
  return jwt.sign(
    { userId: user.userId, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (): string => {
  return jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

const authService = {
  signUp: async (
    username: string,
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    // if (!username || !email || !password) {
    //   throw new Error("Username, email, and password are required.");
    // }

    // const emailExists = await authService.checkEmailExists(email);
    // if (emailExists) {
    //   throw new Error("Email is already taken.");
    // }

    // const usernameExists = await authService.checkUsernameExists(username);
    // if (usernameExists) {
    //   throw new Error("Username is already taken.");
    // }

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
    const result = await pool.query(loginQuery, [username]);
    const user: User = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new Error("Invalid login credentials");
    }

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

  refresh: async (refreshToken: string): Promise<{ accessToken: string }> => {
    try {
      if (!refreshToken) {
        throw new Error("Refresh token is missing.");
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      ) as {
        userId: number;
        username: string;
      };

      const user = await authService.getUserById(decoded.userId);

      // If validation is successful and user data is retrieved, generate a new access token
      if (user) {
        const accessToken = generateAccessToken(user);
        return { accessToken };
      } else {
        throw new Error("User not found.");
      }
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  },

  getUserById: async (userId: number): Promise<User | null> => {
    try {
      const result = await pool.query(getUserQuery, [userId]);
      return result.rows[0] || null;
    } catch (error: unknown) {
      const specificError = error as Error;
      console.error("Error fetching user by ID:", specificError.message);
      return null;
    }
  },

  logout: async (userId: number): Promise<void> => {
    console.log(`User ${userId} logged out`);
  },
};

export default authService;
