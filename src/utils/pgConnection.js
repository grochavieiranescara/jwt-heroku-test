import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

export async function executeDB(queryCommand) {
  console.log("inicio do pool");
  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  const queryResult = await pool.query(queryCommand);
  await pool.end();
  console.log("fim do pool");

  return queryResult;
}
