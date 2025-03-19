export interface MySQLError extends Error {
    code?: string;
    sqlMessage?: string;
  }