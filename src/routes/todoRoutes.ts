import express from "express";

const router = express.Router();

router.get("/todos", (req, res) => {
  res.send("Hellow World");
});

export default router;
