import { Request, Response } from "express";
import get_clients from "../../../controllers/clientControllers/get-clients-controller";
import ClientService from "../../../services/ClientServices";
import { MySQLError } from "../../../types/errors";

// Mock del servicio
jest.mock("../../../services/ClientServices", () => ({
  getClients: jest.fn()
}));

describe("get_clients Controller", () => {
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

  test("debería devolver todos los clientes con código 200", async () => {
    const mockClients = [
      { id_cliente: "1", nombre: "Juan", email: "juan@example.com" },
      { id_cliente: "2", nombre: "Ana", email: "ana@example.com" }
    ];
    (ClientService.getClients as jest.Mock).mockResolvedValue(mockClients);

    await get_clients(mockRequest as Request, mockResponse as Response);

    expect(ClientService.getClients).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockClients);
  });

  test("debería devolver un array vacío si no hay clientes", async () => {
    (ClientService.getClients as jest.Mock).mockResolvedValue([]);

    await get_clients(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith([]);
  });

  test("debería manejar error de duplicación en la base de datos", async () => {
    const duplicateError = new Error("Duplicate entry") as MySQLError;
    duplicateError.code = "ER_DUP_ENTRY";
    duplicateError.sqlMessage = "Registro duplicado";

    (ClientService.getClients as jest.Mock).mockRejectedValue(duplicateError);

    await get_clients(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorInfo: "Registro duplicado" });
  });

  test("debería manejar errores internos del servidor", async () => {
    const generalError = new Error("Error inesperado");

    (ClientService.getClients as jest.Mock).mockRejectedValue(generalError);

    await get_clients(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      details: "Error inesperado"
    });
  });
});
