import { Request, Response } from "express";
import get_dataClien from "../../controllers/microservicePresaleControllers/getDataClientController";
import MicroservicePresaleService from "../../services/MicroservicePresaleService";

// Mock del servicio
jest.mock("../../services/MicroservicePresaleService", () => ({
  getDataClient: jest.fn(),
}));

describe("get_dataClien Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    jest.clearAllMocks();

    responseObject = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    mockRequest = {
      params: {
        id_client: "1",
      },
    };

    mockResponse = responseObject;
  });

  test("debería devolver 200 y los datos del cliente si se encuentra", async () => {
    (MicroservicePresaleService.getDataClient as jest.Mock).mockResolvedValue({
      razon_social: "Empresa S.A.",
      nombre_completo_cliente: "Juan Pérez",
      direccion: "Calle Falsa 123",
      telefono: "987654321",
      nombre_zona_trabajo: "Zona Centro",
    });

    await get_dataClien(mockRequest as Request, mockResponse as Response);

    expect(MicroservicePresaleService.getDataClient).toHaveBeenCalledWith("1");
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      razon_social: "Empresa S.A.",
      nombre_completo_cliente: "Juan Pérez",
      direccion: "Calle Falsa 123",
      telefono: "987654321",
      zona: "Zona Centro",
    });
  });

  test("debería devolver 404 si el cliente no se encuentra", async () => {
    (MicroservicePresaleService.getDataClient as jest.Mock).mockRejectedValue(
      new Error("Cliente con ID 1 no encontrado")
    );

    await get_dataClien(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Cliente con ID 1 no encontrado" });
  });

  test("debería manejar errores internos con código 500", async () => {
    (MicroservicePresaleService.getDataClient as jest.Mock).mockRejectedValue(new Error("Error inesperado"));

    await get_dataClien(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      details: "Error inesperado",
    });
  });
});
