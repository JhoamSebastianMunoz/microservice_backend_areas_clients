import ClientService from "../../../services/ClientServices";
import ClientRepository from "../../../repositories/ClientRepository";
import GetClient from "../../../Dto/GetClientDto";

// Mock del repositorio
jest.mock("../../../repositories/ClientRepository", () => ({
  get: jest.fn()
}));

describe("ClientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getClient debería llamar al repositorio correctamente", async () => {
    const mockClient = [{ id_cliente: "1", nombre: "Juan", email: "juan@example.com" }];
    (ClientRepository.get as jest.Mock).mockResolvedValue(mockClient);

    const getClientDto = new GetClient("1");
    const result = await ClientService.getClient(getClientDto);

    expect(ClientRepository.get).toHaveBeenCalledWith(getClientDto);
    expect(result).toEqual(mockClient);
  });

  test("getClient debería devolver una lista vacía si el cliente no se encuentra", async () => {
    (ClientRepository.get as jest.Mock).mockResolvedValue([]);

    const getClientDto = new GetClient("1");
    const result = await ClientService.getClient(getClientDto);

    expect(result).toEqual([]);
  });

  test("getClient debería propagar errores del repositorio", async () => {
    const error = new Error("Error en la base de datos");
    (ClientRepository.get as jest.Mock).mockRejectedValue(error);

    const getClientDto = new GetClient("1");

    await expect(ClientService.getClient(getClientDto)).rejects.toThrow("Error en la base de datos");
  });
});
