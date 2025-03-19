import { Request, Response } from "express";
import get_client from "../../../controllers/clientControllers/get-client-controller";
import ClientService from "../../../services/ClientServices";
import { MySQLError } from "../../../types/errors";

// Mock del servicio
jest.mock("../../../services/ClientServices", () => ({
  getClient: jest.fn()
}));

describe("get_client Controller", () => {
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
      params: { id_cliente: "1" }
    };

    mockResponse = responseObject;
  });

  test("debería devolver un cliente si se encuentra", async () => {
    const mockClient = [{ id_cliente: "1", nombre: "Juan", email: "juan@example.com" }];
    (ClientService.getClient as jest.Mock).mockResolvedValue(mockClient);

    await get_client(mockRequest as Request, mockResponse as Response);

    expect(ClientService.getClient).toHaveBeenCalledWith(expect.objectContaining({ id_cliente: "1" }));
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockClient);
  });

  test("debería devolver 404 si el cliente no se encuentra", async () => {
    (ClientService.getClient as jest.Mock).mockResolvedValue([]);

    await get_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Cliente no encontrado" });
  });

  test("debería manejar error de duplicación en la base de datos", async () => {
    const duplicateError = new Error("Duplicate entry") as MySQLError;
    duplicateError.code = "ER_DUP_ENTRY";
    duplicateError.sqlMessage = "El ID del cliente ya existe";

    (ClientService.getClient as jest.Mock).mockRejectedValue(duplicateError);

    await get_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorInfo: "El ID del cliente ya existe" });
  });

  test("debería manejar errores internos del servidor", async () => {
    const generalError = new Error("Error inesperado");

    (ClientService.getClient as jest.Mock).mockRejectedValue(generalError);

    await get_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      details: "Error inesperado"
    });
  });
});
