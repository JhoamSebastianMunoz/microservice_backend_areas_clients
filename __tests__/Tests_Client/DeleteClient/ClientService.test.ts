import ClientService from "../../../services/ClientServices";
import ClientRepository from "../../../repositories/ClientRepository";
import DeleteClient from "../../../Dto/DeleteClientDto";

// Mock del repositorio
jest.mock("../../../repositories/ClientRepository", () => ({
  delete: jest.fn()
}));

describe("ClientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deleteClient debería llamar al repositorio correctamente", async () => {
    (ClientRepository.delete as jest.Mock).mockResolvedValue(1);

    const deleteClientDto = new DeleteClient("1");
    const result = await ClientService.deleteClient(deleteClientDto);

    expect(ClientRepository.delete).toHaveBeenCalledWith(deleteClientDto);
    expect(result).toBe(1);
  });

  test("deleteClient debería devolver 0 si el cliente no se encuentra", async () => {
    (ClientRepository.delete as jest.Mock).mockResolvedValue(0);

    const deleteClientDto = new DeleteClient("1");
    const result = await ClientService.deleteClient(deleteClientDto);

    expect(result).toBe(0);
  });

  test("deleteClient debería propagar errores del repositorio", async () => {
    const error = new Error("Error en la base de datos");
    (ClientRepository.delete as jest.Mock).mockRejectedValue(error);

    const deleteClientDto = new DeleteClient("1");

    await expect(ClientService.deleteClient(deleteClientDto)).rejects.toThrow("Error en la base de datos");
  });
});
