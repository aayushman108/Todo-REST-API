import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:'\"<>,./?])\\S{8,}$"
      )
    )
    .required()
    .message(
      "Password must be at least 8 characters long and include at least one special character and one capital letter"
    ),
  email: Joi.string().email().required(),
});
