import Joi from "joi";

export const todoSchema = Joi.object({
  todo_text: Joi.string().required(),
  due_date: Joi.date().iso().required(),
  is_completed: Joi.boolean().default(false),
  is_favorite: Joi.boolean().default(false),
});
