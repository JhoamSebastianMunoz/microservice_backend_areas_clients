import ClientRepository from "../../../repositories/ClientRepository";
import db from "../../../config/config-db";
import UpdateClient from "../../../Dto/UpdateClientDto";
import { MySQLError } from "../../../types/errors";

// Mock de la base de datos
jest.mock("../../../config/config-db", () => ({
  execute: jest.fn()
}));

describe("ClientRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("update debería ejecutar la consulta SQL correcta y actualizar un cliente", async () => {
    const updateClient = new UpdateClient(
      "1",
      "123456789",
      "Juan Pérez",
      "Calle 123",
      "555-5555",
      "12345678",
      "Empresa X",
      "activo",
      String(1)
    );

    (db.execute as jest.Mock).mockResolvedValue([{ affectedRows: 1 }, {}]);

    const result = await ClientRepository.update(updateClient);

    expect(db.execute).toHaveBeenCalledWith(
      "UPDATE clientes SET cedula = ?, nombre_completo_cliente = ?, direccion = ?, telefono =  ?, rut_nit = ?, razon_social = ?, estado = ?, id_zona_de_trabajo = ? WHERE id_cliente = ?",
      [
        updateClient.cedula,
        updateClient.nombre_completo_cliente,
        updateClient.direccion,
        updateClient.telefono,
        updateClient.rut_nit,
        updateClient.razon_social,
        updateClient.estado,
        updateClient.id_zona_de_trabajo,
        updateClient.id_cliente
      ]
    );
    expect(result).toEqual({ affectedRows: 1 });
  });

  test("update debería devolver 0 affectedRows si el cliente no existe", async () => {
    const updateClient = new UpdateClient(
      "1",
      "123456789",
      "Juan Pérez",
      "Calle 123",
      "555-5555",
      "12345678",
      "Empresa X",
      "activo",
      String(1)
    );

    (db.execute as jest.Mock).mockResolvedValue([{ affectedRows: 0 }, {}]);

    const result = await ClientRepository.update(updateClient);

    expect(result).toEqual({ affectedRows: 0 });
  });

  test("update debería manejar errores de la base de datos", async () => {
    const updateClient = new UpdateClient(
      "1",
      "123456789",
      "Juan Pérez",
      "Calle 123",
      "555-5555",
      "12345678",
      "Empresa X",
      "activo",
      String(1)
    );

    const sqlError = new Error("Error en la base de datos") as MySQLError;
    sqlError.code = "ER_BAD_FIELD_ERROR";

    (db.execute as jest.Mock).mockRejectedValue(sqlError);

    await expect(ClientRepository.update(updateClient)).rejects.toThrow("Error en la base de datos");
  });
});
