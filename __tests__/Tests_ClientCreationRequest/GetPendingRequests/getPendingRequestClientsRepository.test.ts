import Request_createClienteRepository from "../../../repositories/RequestCreateClientRepository";
import db from "../../../config/config-db";

jest.mock("../../../config/config-db", () => ({
  execute: jest.fn(),
}));

describe("RequestCreateClientRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("get debería ejecutar la consulta SQL correcta y devolver los clientes pendientes", async () => {
    const pendingClients = [{ id_cliente: 1, nombre: "Juan", estado: "Pendiente" }];
    (db.execute as jest.Mock).mockResolvedValue([pendingClients]);

    const result = await Request_createClienteRepository.get();

    expect(db.execute).toHaveBeenCalledWith("SELECT * FROM clientes WHERE estado = 'Pendiente'");
    expect(result).toEqual(pendingClients);
  });

  test("get debería manejar errores de la base de datos", async () => {
    const error = new Error("Error en la base de datos");
    (db.execute as jest.Mock).mockRejectedValue(error);

    await expect(Request_createClienteRepository.get()).rejects.toThrow("Error en la base de datos");
  });
});
