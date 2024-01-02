import express from "express";
import * as todoController from "../controllers/todoController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authenticateToken);
router.get("/todos", todoController.getTodos);
router.post("/todos", todoController.createTodo);
router.put("/todos/:todoId", todoController.updateTodo);
router.delete("/todos/:todoId", todoController.deleteTodo);

export default router;
