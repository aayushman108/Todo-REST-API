import { Pool } from "pg";

const pool = new Pool({
  user: "my_user",
  host: "localhost",
  database: "todo-app_data",
  password: "P@ssword123",
  port: 5432,
});

export default pool;
