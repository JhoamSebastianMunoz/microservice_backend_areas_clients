import ClientRepository from "../../../repositories/ClientRepository";
import db from "../../../config/config-db";
import Client from "../../../Dto/ClientDto";
import { MySQLError } from "../../../types/errors";

// Mock de la base de datos
jest.mock("../../../config/config-db", () => ({
  execute: jest.fn()
}));

describe("ClientRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("add debería ejecutar la consulta SQL correcta y registrar un cliente", async () => {
    const client = new Client(
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

    const result = await ClientRepository.add(client);

    expect(db.execute).toHaveBeenCalledWith(
      "INSERT INTO clientes (cedula, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        client.cedula,
        client.nombre_completo_cliente,
        client.direccion,
        client.telefono,
        client.rut_nit,
        client.razon_social,
        client.estado,
        client.id_zona_de_trabajo
      ]
    );
    expect(result).toEqual([{ affectedRows: 1 }, {}]);
  });

  test("add debería manejar errores de la base de datos", async () => {
    const client = new Client(
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

    await expect(ClientRepository.add(client)).rejects.toThrow("Error en la base de datos");
  });
});
