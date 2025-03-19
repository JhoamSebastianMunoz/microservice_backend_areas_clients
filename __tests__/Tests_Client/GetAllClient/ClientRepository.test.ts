import ClientRepository from "../../../repositories/ClientRepository";
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

  test("getAll debería ejecutar la consulta SQL correcta y devolver clientes", async () => {
    const mockClients = [
      { id_cliente: "1", nombre: "Juan", email: "juan@example.com" },
      { id_cliente: "2", nombre: "Ana", email: "ana@example.com" }
    ];
    (db.execute as jest.Mock).mockResolvedValue([mockClients, {}]);

    const result = await ClientRepository.getAll();

    expect(db.execute).toHaveBeenCalledWith("SELECT * FROM clientes");
    expect(result).toEqual(mockClients);
  });

  test("getAll debería devolver un array vacío si no hay clientes", async () => {
    (db.execute as jest.Mock).mockResolvedValue([[], {}]);

    const result = await ClientRepository.getAll();

    expect(result).toEqual([]);
  });

  test("getAll debería manejar errores de la base de datos", async () => {
    const sqlError = new Error("Error en la base de datos") as MySQLError;
    sqlError.code = "ER_BAD_FIELD_ERROR";

    (db.execute as jest.Mock).mockRejectedValue(sqlError);

    await expect(ClientRepository.getAll()).rejects.toThrow("Error en la base de datos");
  });
});
