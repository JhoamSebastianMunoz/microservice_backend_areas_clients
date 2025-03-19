import { Request, Response } from "express";
import requestCreateClient from "../../../controllers/clientCreationRequestController/requestCreateClient";
import requestCreateClientService from "../../../services/RequestCreateClientService";
import RequestCreateClientDto from "../../../Dto/RequestCreateClientDto";

// Mock del servicio
jest.mock("../../../services/RequestCreateClientService", () => ({
  request_createClient: jest.fn(),
}));

describe("requestCreateClient Controller", () => {
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
      body: {
        cedula: "123456789",
        nombre_completo_cliente: "Juan Pérez",
        direccion: "Calle Falsa 123",
        telefono: "987654321",
        rut_nit: "123456789-0",
        razon_social: "Empresa S.A.",
        id_zona_de_trabajo: 1
      }
    };

    mockResponse = responseObject;
  });

  test("debería devolver 201 si el cliente se registra correctamente", async () => {
    await requestCreateClient(mockRequest as Request, mockResponse as Response);

    expect(requestCreateClientService.request_createClient).toHaveBeenCalledWith(
      expect.any(RequestCreateClientDto)
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ status: "Cliente registrado con éxito" });
  });

  test("debería manejar errores de clave duplicada", async () => {
    const error = { code: "ER_DUP_ENTRY", sqlMessage: "Duplicado" };
    (requestCreateClientService.request_createClient as jest.Mock).mockRejectedValue(error);

    await requestCreateClient(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorInfo: "Duplicado" });
  });

  test("debería manejar otros errores del servidor", async () => {
    const error = new Error("Error inesperado");
    (requestCreateClientService.request_createClient as jest.Mock).mockRejectedValue(error);

    await requestCreateClient(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      details: "Error inesperado",
    });
  });
});
