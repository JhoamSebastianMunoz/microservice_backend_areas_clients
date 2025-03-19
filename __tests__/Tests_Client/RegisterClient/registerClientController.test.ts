import { Request, Response } from "express";
import register_client from "../../../controllers/clientControllers/register-client-controller";
import ClientService from "../../../services/ClientServices";
import Client from "../../../Dto/ClientDto";
import { MySQLError } from "../../../types/errors";

// Mock del servicio
jest.mock("../../../services/ClientServices", () => ({
  register_client: jest.fn()
}));

describe("register_client Controller", () => {
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
        direccion: "Calle 123",
        telefono: "555-5555",
        rut_nit: "12345678",
        razon_social: "Empresa X",
        estado: "activo",
        id_zona_de_trabajo: 1
      }
    };
    mockResponse = responseObject;
  });

  test("debería registrar un cliente con éxito y devolver código 201", async () => {
    (ClientService.register_client as jest.Mock).mockResolvedValue(true);

    await register_client(mockRequest as Request, mockResponse as Response);

    expect(ClientService.register_client).toHaveBeenCalledWith(
      expect.any(Client)
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "Cliente registrado con éxito",
    });
  });

  test("debería manejar error de duplicación en la base de datos", async () => {
    const duplicateError = new Error("Duplicate entry") as MySQLError;
    duplicateError.code = "ER_DUP_ENTRY";
    duplicateError.sqlMessage = "Registro duplicado";

    (ClientService.register_client as jest.Mock).mockRejectedValue(duplicateError);

    await register_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorInfo: "Registro duplicado" });
  });

  test("debería manejar errores internos del servidor", async () => {
    const generalError = new Error("Error inesperado");

    (ClientService.register_client as jest.Mock).mockRejectedValue(generalError);

    await register_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      details: "Error inesperado"
    });
  });
});
