import requestCreateClientService from "../../../services/RequestCreateClientService";
import Request_createClienteRepository from "../../../repositories/RequestCreateClientRepository";

// Mock del repositorio
jest.mock("../../../repositories/RequestCreateClientRepository", () => ({
  get: jest.fn(),
}));

describe("RequestCreateClientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getPendingRequests debería devolver una lista de clientes pendientes", async () => {
    const pendingClients = [{ id_cliente: 1, nombre: "Juan", estado: "Pendiente" }];
    (Request_createClienteRepository.get as jest.Mock).mockResolvedValue(pendingClients);

    const result = await requestCreateClientService.getPendingRequests();

    expect(Request_createClienteRepository.get).toHaveBeenCalled();
    expect(result).toEqual(pendingClients);
  });

  test("getPendingRequests debería manejar errores correctamente", async () => {
    const error = new Error("Error en la base de datos");
    (Request_createClienteRepository.get as jest.Mock).mockRejectedValue(error);

    await expect(requestCreateClientService.getPendingRequests()).rejects.toThrow("Error en la base de datos");
  });
});
