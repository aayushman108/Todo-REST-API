import { Request, Response } from "express";
import authService from "../services/authService";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const { accessToken, refreshToken } = await authService.signUp(
      username,
      email,
      password
    );
    res.json({ accessToken, refreshToken });
  } catch (error) {
    //res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { accessToken, refreshToken } = await authService.login(
      username,
      password
    );
    res.json({ accessToken, refreshToken });
  } catch (error) {
    //res.status(401).json({ error: error.message });
  }
};
