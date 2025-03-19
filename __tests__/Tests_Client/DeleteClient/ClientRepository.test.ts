import ClientRepository from "../../../repositories/ClientRepository";
import DeleteClient from "../../../Dto/DeleteClientDto";
import db from "../../../config/config-db";
import { MySQLError } from "../../../types/errors";

// Mock de la base de datos
jest.mock("../../../config/config-db", () => ({
  execute: jest.fn()
}));

describe("ClientRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("delete debería ejecutar la consulta SQL correcta", async () => {
    (db.execute as jest.Mock).mockResolvedValue([{ affectedRows: 1 }, {}]);

    const deleteClientDto = new DeleteClient("1");
    const result = await ClientRepository.delete(deleteClientDto);

    expect(db.execute).toHaveBeenCalledWith(
      "DELETE FROM clientes WHERE id_cliente = ?",
      ["1"]
    );
    expect(result).toBe(1);
  });

  test("delete debería devolver 0 si no se eliminó ningún cliente", async () => {
    (db.execute as jest.Mock).mockResolvedValue([{ affectedRows: 0 }, {}]);

    const deleteClientDto = new DeleteClient("1");
    const result = await ClientRepository.delete(deleteClientDto);

    expect(result).toBe(0);
  });

  test("delete debería manejar errores de la base de datos", async () => {
    const sqlError = new Error("Error en la base de datos") as MySQLError;
    sqlError.code = "ER_BAD_FIELD_ERROR";

    (db.execute as jest.Mock).mockRejectedValue(sqlError);

    const deleteClientDto = new DeleteClient("1");

    await expect(ClientRepository.delete(deleteClientDto)).rejects.toThrow("Error en la base de datos");
  });
});
