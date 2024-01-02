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
    res.send("Hellow World");
    res.json({ accessToken, refreshToken });
  } catch (error: unknown) {
    const specificError = error as Error;
    res.status(400).json({ error: specificError.message });
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
  } catch (error: unknown) {
    const specificError = error as Error;
    res.status(401).json({ error: specificError.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required." });
    }

    const { accessToken } = await authService.refresh(refreshToken);
    res.json({ accessToken });
  } catch (error: unknown) {
    const specificError = error as Error;
    res.status(401).json({ error: specificError.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const userId = 1;

    // Basic input validation (optional for logout)
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    await authService.logout(userId);
    res.json({ message: "Logout successful" });
  } catch (error: unknown) {
    const specificError = error as Error;
    res.status(500).json({ error: specificError.message });
  }
};
