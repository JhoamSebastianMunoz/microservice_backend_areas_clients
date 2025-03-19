import { Request, Response } from "express";
import get_pendingRequestClients from "../../../controllers/clientCreationRequestController/getPendingRequests";
import requestCreateClientService from "../../../services/RequestCreateClientService";

// Mock del servicio
jest.mock("../../../services/RequestCreateClientService", () => ({
  getPendingRequests: jest.fn(),
}));

describe("get_pendingRequestClients Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    jest.clearAllMocks();

    responseObject = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    mockRequest = {};
    mockResponse = responseObject;
  });

  test("debería devolver 200 y la lista de clientes pendientes", async () => {
    const pendingClients = [
      { id_cliente: 1, nombre: "Juan", estado: "Pendiente" },
    ];
    (requestCreateClientService.getPendingRequests as jest.Mock).mockResolvedValue(pendingClients);

    await get_pendingRequestClients(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(pendingClients);
  });

  test("debería devolver 404 si no hay solicitudes pendientes", async () => {
    (requestCreateClientService.getPendingRequests as jest.Mock).mockResolvedValue([]);

    await get_pendingRequestClients(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "No hay solicitudes pendientes" });
  });

  test("debería manejar errores internos del servidor", async () => {
    const error = new Error("Error inesperado");
    (requestCreateClientService.getPendingRequests as jest.Mock).mockRejectedValue(error);

    await get_pendingRequestClients(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      details: "Error inesperado",
    });
  });
});
