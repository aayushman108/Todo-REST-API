import express from "express";
import * as todoController from "../controllers/todoController";

const router = express.Router();

router.get("/todos", todoController.getTodos);
router.post("/todos", todoController.createTodo);
router.put("/todos/:todoId", todoController.updateTodo);
router.delete("/todos/:todoId", todoController.deleteTodo);

export default router;
