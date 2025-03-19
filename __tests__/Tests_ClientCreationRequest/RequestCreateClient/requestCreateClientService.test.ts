import requestCreateClientService from "../../../services/RequestCreateClientService";
import Request_createClienteRepository from "../../../repositories/RequestCreateClientRepository";
import RequestCreateClientDto from "../../../Dto/RequestCreateClientDto";

// Mock del repositorio
jest.mock("../../../repositories/RequestCreateClientRepository", () => ({
  request: jest.fn(),
}));

describe("RequestCreateClientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("request_createClient debería llamar al repositorio con los datos correctos", async () => {
    const clientDto = new RequestCreateClientDto(
      "123456789",
      "Juan Pérez",
      "Calle Falsa 123",
      "987654321",
      "123456789-0",
      "Empresa S.A.",
      String(1)
    );

    await requestCreateClientService.request_createClient(clientDto);

    expect(Request_createClienteRepository.request).toHaveBeenCalledWith(clientDto);
  });

  test("request_createClient debería manejar errores del repositorio", async () => {
    const error = new Error("Error en la base de datos");
    (Request_createClienteRepository.request as jest.Mock).mockRejectedValue(error);

    await expect(requestCreateClientService.request_createClient(new RequestCreateClientDto(
      "123456789",
      "Juan Pérez",
      "Calle Falsa 123",
      "987654321",
      "123456789-0",
      "Empresa S.A.",
      String(1)
    ))).rejects.toThrow("Error en la base de datos");
  });
});
