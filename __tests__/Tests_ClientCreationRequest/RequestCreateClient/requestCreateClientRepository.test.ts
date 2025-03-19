import Request_createClienteRepository from "../../../repositories/RequestCreateClientRepository";
import db from "../../../config/config-db";
import RequestCreateClientDto from "../../../Dto/RequestCreateClientDto";

// Mock de la base de datos
jest.mock("../../../config/config-db", () => ({
  execute: jest.fn(),
}));

describe("RequestCreateClientRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("request debería ejecutar la consulta SQL correcta", async () => {
    const clientDto = new RequestCreateClientDto(
      "123456789",
      "Juan Pérez",
      "Calle Falsa 123",
      "987654321",
      "123456789-0",
      "Empresa S.A.",
      String(1)
    );

    (db.execute as jest.Mock).mockResolvedValue([{ insertId: 1 }]);

    await Request_createClienteRepository.request(clientDto);

    expect(db.execute).toHaveBeenCalledWith(
      "INSERT INTO clientes (cedula, nombre_completo_cliente, direccion, telefono, rut_nit, razon_social, estado, id_zona_de_trabajo ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        "123456789",
        "Juan Pérez",
        "Calle Falsa 123",
        "987654321",
        "123456789-0",
        "Empresa S.A.",
        "Pendiente",
        String(1)
      ]
    );
  });

  test("request debería manejar errores de la base de datos", async () => {
    const clientDto = new RequestCreateClientDto(
      "123456789",
      "Juan Pérez",
      "Calle Falsa 123",
      "987654321",
      "123456789-0",
      "Empresa S.A.",
      String(1)
    );

    const error = new Error("Error en la base de datos");
    (db.execute as jest.Mock).mockRejectedValue(error);

    await expect(Request_createClienteRepository.request(clientDto)).rejects.toThrow("Error en la base de datos");
  });
});
