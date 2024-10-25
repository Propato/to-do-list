import { FieldPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export type ResultSet = [ResultSetHeader | RowDataPacket[] | ResultSetHeader[] | RowDataPacket[][] | ProcedureCallPacket, FieldPacket[]];