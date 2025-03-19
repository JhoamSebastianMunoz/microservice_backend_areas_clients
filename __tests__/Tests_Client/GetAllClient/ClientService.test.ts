import ClientService from "../../../services/ClientServices";
import ClientRepository from "../../../repositories/ClientRepository";

// Mock del repositorio
jest.mock("../../../repositories/ClientRepository", () => ({
  getAll: jest.fn()
}));

describe("ClientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getClients debería llamar al repositorio correctamente", async () => {
    const mockClients = [
      { id_cliente: "1", nombre: "Juan", email: "juan@example.com" },
      { id_cliente: "2", nombre: "Ana", email: "ana@example.com" }
    ];
    (ClientRepository.getAll as jest.Mock).mockResolvedValue(mockClients);

    const result = await ClientService.getClients();

    expect(ClientRepository.getAll).toHaveBeenCalled();
    expect(result).toEqual(mockClients);
  });

  test("getClients debería devolver un array vacío si no hay clientes", async () => {
    (ClientRepository.getAll as jest.Mock).mockResolvedValue([]);

    const result = await ClientService.getClients();

    expect(result).toEqual([]);
  });

  test("getClients debería propagar errores del repositorio", async () => {
    const error = new Error("Error en la base de datos");
    (ClientRepository.getAll as jest.Mock).mockRejectedValue(error);

    await expect(ClientService.getClients()).rejects.toThrow("Error en la base de datos");
  });
});
