import { Request, Response } from "express";
import acceptOrRejectController from "../../../controllers/clientCreationRequestController/acceptOrRejectController";
import Request_createClienteRepository from "../../../repositories/RequestCreateClientRepository";

// Mock del repositorio
jest.mock("../../../repositories/RequestCreateClientRepository", () => ({
  updateRequest: jest.fn()
}));

describe("acceptOrRejectController", () => {
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
      params: { id_client: "1" }
    };
    mockResponse = responseObject;
  });

  test("debería activar un cliente con éxito y devolver código 200", async () => {
    (Request_createClienteRepository.updateRequest as jest.Mock).mockResolvedValue({ affectedRows: 1 });

    await acceptOrRejectController(mockRequest as Request, mockResponse as Response);

    expect(Request_createClienteRepository.updateRequest).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Cliente activado con éxito",
    });
  });

  test("debería devolver 404 si el cliente no existe o ya está activado", async () => {
    (Request_createClienteRepository.updateRequest as jest.Mock).mockResolvedValue(null);

    await acceptOrRejectController(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Cliente no encontrado o ya activado." });
  });

  test("debería manejar error de duplicación en la base de datos", async () => {
    const duplicateError = new Error("Duplicate entry") as any;
    duplicateError.code = "ER_DUP_ENTRY";
    duplicateError.sqlMessage = "Registro duplicado";

    (Request_createClienteRepository.updateRequest as jest.Mock).mockRejectedValue(duplicateError);

    await acceptOrRejectController(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorInfo: "Registro duplicado" });
  });

  test("debería manejar errores internos del servidor", async () => {
    const generalError = new Error("Error inesperado");

    (Request_createClienteRepository.updateRequest as jest.Mock).mockRejectedValue(generalError);

    await acceptOrRejectController(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      details: "Error inesperado"
    });
  });
});
