import { Request, Response } from "express";
import update_client from "../../../controllers/clientControllers/update-client-controller";
import ClientService from "../../../services/ClientServices";
import UpdateClient from "../../../Dto/UpdateClientDto";
import { MySQLError } from "../../../types/errors";

// Mock del servicio
jest.mock("../../../services/ClientServices", () => ({
  updateClient: jest.fn()
}));

describe("update_client Controller", () => {
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
      params: { id_cliente: "1" },
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

  test("debería actualizar un cliente con éxito y devolver código 200", async () => {
    (ClientService.updateClient as jest.Mock).mockResolvedValue({ affectedRows: 1 });

    await update_client(mockRequest as Request, mockResponse as Response);

    expect(ClientService.updateClient).toHaveBeenCalledWith(
      expect.any(UpdateClient)
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "ok, Cliente actualizado con éxito",
    });
  });

  test("debería devolver 404 si el cliente no existe", async () => {
    (ClientService.updateClient as jest.Mock).mockResolvedValue({ affectedRows: 0 });

    await update_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Cliente no encontrado." });
  });

  test("debería manejar error de duplicación en la base de datos", async () => {
    const duplicateError = new Error("Duplicate entry") as MySQLError;
    duplicateError.code = "ER_DUP_ENTRY";
    duplicateError.sqlMessage = "Registro duplicado";

    (ClientService.updateClient as jest.Mock).mockRejectedValue(duplicateError);

    await update_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorInfo: "Registro duplicado" });
  });

  test("debería manejar errores internos del servidor", async () => {
    const generalError = new Error("Error inesperado");

    (ClientService.updateClient as jest.Mock).mockRejectedValue(generalError);

    await update_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
      details: "Error inesperado"
    });
  });
});
