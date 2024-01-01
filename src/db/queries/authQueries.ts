export const signupQuery =
  "INSERT INTO users(username, email, password_hash, salt) VALUES($1, $2, $3, $4) RETURNING *";

export const loginQuery = "SELECT * FROM users WHERE username = $1";

export const checkEmailQuery = "SELECT * FROM users WHERE email = $1";

export const checkUsernameQuery = "SELECT * FROM users WHERE username = $1";
