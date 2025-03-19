import ClientService from "../../../services/ClientServices";
import ClientRepository from "../../../repositories/ClientRepository";
import UpdateClient from "../../../Dto/UpdateClientDto";

// Mock del repositorio
jest.mock("../../../repositories/ClientRepository", () => ({
  update: jest.fn()
}));

describe("ClientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("updateClient debería llamar al repositorio correctamente", async () => {
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

    (ClientRepository.update as jest.Mock).mockResolvedValue({ affectedRows: 1 });

    const result = await ClientService.updateClient(updateClient);

    expect(ClientRepository.update).toHaveBeenCalledWith(updateClient);
    expect(result).toEqual({ affectedRows: 1 });
  });

  test("updateClient debería propagar errores del repositorio", async () => {
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

    const error = new Error("Error en la base de datos");
    (ClientRepository.update as jest.Mock).mockRejectedValue(error);

    await expect(ClientService.updateClient(updateClient)).rejects.toThrow("Error en la base de datos");
  });
});
