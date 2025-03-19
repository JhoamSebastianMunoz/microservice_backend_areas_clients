import ClientService from "../../../services/ClientServices";
import ClientRepository from "../../../repositories/ClientRepository";
import Client from "../../../Dto/ClientDto";

// Mock del repositorio
jest.mock("../../../repositories/ClientRepository", () => ({
  add: jest.fn()
}));

describe("ClientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("register_client debería llamar al repositorio correctamente", async () => {
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

    (ClientRepository.add as jest.Mock).mockResolvedValue(true);

    const result = await ClientService.register_client(client);

    expect(ClientRepository.add).toHaveBeenCalledWith(client);
    expect(result).toBe(true);
  });

  test("register_client debería propagar errores del repositorio", async () => {
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

    const error = new Error("Error en la base de datos");
    (ClientRepository.add as jest.Mock).mockRejectedValue(error);

    await expect(ClientService.register_client(client)).rejects.toThrow("Error en la base de datos");
  });
});
