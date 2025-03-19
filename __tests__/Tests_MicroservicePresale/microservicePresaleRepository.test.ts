import MicroservicePresaleRepository from "../../repositories/MicroservicePresaleRepository";
import db from "../../config/config-db";

// Mock de la base de datos
jest.mock("../../config/config-db", () => ({
  execute: jest.fn(),
}));

describe("MicroservicePresaleRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getDataClient debería ejecutar la consulta SQL correcta", async () => {
    const mockClientData = [{
      razon_social: "Empresa S.A.",
      nombre_completo_cliente: "Juan Pérez",
      direccion: "Calle Falsa 123",
      telefono: "987654321",
      nombre_zona_trabajo: "Zona Centro",
    }];

    (db.execute as jest.Mock).mockResolvedValue([mockClientData]);

    const result = await MicroservicePresaleRepository.getDataClient("1");

    expect(result).toEqual(mockClientData);
    expect(db.execute).toHaveBeenCalledWith(
      `SELECT c.razon_social, c.nombre_completo_cliente, c.direccion, c.telefono, z.nombre_zona_trabajo FROM clientes c INNER JOIN zonas_de_trabajo z ON c.id_zona_de_trabajo = z.id_zona_de_trabajo WHERE id_cliente = ?;`,
      ["1"]
    );
  });

  test("getDataClient debería devolver un array vacío si no se encuentra el cliente", async () => {
    (db.execute as jest.Mock).mockResolvedValue([[]]);

    const result = await MicroservicePresaleRepository.getDataClient("1");

    expect(result).toEqual([]);
  });

  test("getDataClient debería manejar errores de la base de datos", async () => {
    const error = new Error("Error en la base de datos");
    (db.execute as jest.Mock).mockRejectedValue(error);

    await expect(MicroservicePresaleRepository.getDataClient("1")).rejects.toThrow("Error en la base de datos");
  });
});
