import ClientRepository from "../../../repositories/ClientRepository";
import GetClient from "../../../Dto/GetClientDto";
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

  test("get debería ejecutar la consulta SQL correcta", async () => {
    const mockClient = [{ id_cliente: "1", nombre: "Juan", email: "juan@example.com" }];
    (db.execute as jest.Mock).mockResolvedValue([mockClient, {}]);

    const getClientDto = new GetClient("1");
    const result = await ClientRepository.get(getClientDto);

    expect(db.execute).toHaveBeenCalledWith(
      "SELECT * FROM clientes WHERE id_cliente= ?",
      ["1"]
    );
    expect(result).toEqual(mockClient);
  });

  test("get debería devolver una lista vacía si no se encuentra el cliente", async () => {
    (db.execute as jest.Mock).mockResolvedValue([[], {}]);

    const getClientDto = new GetClient("1");
    const result = await ClientRepository.get(getClientDto);

    expect(result).toEqual([]);
  });

  test("get debería manejar errores de la base de datos", async () => {
    const sqlError = new Error("Error en la base de datos") as MySQLError;
    sqlError.code = "ER_BAD_FIELD_ERROR";

    (db.execute as jest.Mock).mockRejectedValue(sqlError);

    const getClientDto = new GetClient("1");

    await expect(ClientRepository.get(getClientDto)).rejects.toThrow("Error en la base de datos");
  });
});
