import MicroservicePresaleService from "../../services/MicroservicePresaleService";
import MicroservicePresaleRepository from "../../repositories/MicroservicePresaleRepository";

// Mock del repositorio
jest.mock("../../repositories/MicroservicePresaleRepository", () => ({
  getDataClient: jest.fn(),
}));

describe("MicroservicePresaleService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getDataClient debería devolver los datos del cliente si existe", async () => {
    const mockClientData = [{
      razon_social: "Empresa S.A.",
      nombre_completo_cliente: "Juan Pérez",
      direccion: "Calle Falsa 123",
      telefono: "987654321",
      nombre_zona_trabajo: "Zona Centro",
    }];

    (MicroservicePresaleRepository.getDataClient as jest.Mock).mockResolvedValue(mockClientData);

    const result = await MicroservicePresaleService.getDataClient("1");

    expect(result).toEqual(mockClientData[0]);
    expect(MicroservicePresaleRepository.getDataClient).toHaveBeenCalledWith("1");
  });

  test("getDataClient debería lanzar un error si el cliente no existe", async () => {
    (MicroservicePresaleRepository.getDataClient as jest.Mock).mockResolvedValue([]);

    await expect(MicroservicePresaleService.getDataClient("1")).rejects.toThrow("Cliente con ID 1 no encontrado");
  });

  test("getDataClient debería manejar errores inesperados", async () => {
    const error = new Error("Error en la base de datos");
    (MicroservicePresaleRepository.getDataClient as jest.Mock).mockRejectedValue(error);

    await expect(MicroservicePresaleService.getDataClient("1")).rejects.toThrow("Error en la base de datos");
  });
});
