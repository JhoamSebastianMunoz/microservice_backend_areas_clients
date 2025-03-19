import { Request, Response } from "express";
import delete_client from "../../../controllers/clientControllers/delete-client-controller";
import ClientService from "../../../services/ClientServices";
import { MySQLError } from "../../../types/errors";

// Mock del servicio
jest.mock("../../../services/ClientServices", () => ({
  deleteClient: jest.fn()
}));

describe("delete_client Controller", () => {
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

  test("debería eliminar un cliente correctamente", async () => {
    (ClientService.deleteClient as jest.Mock).mockResolvedValue(1); // 1 fila afectada

    await delete_client(mockRequest as Request, mockResponse as Response);

    expect(ClientService.deleteClient).toHaveBeenCalledWith(expect.objectContaining({ id_cliente: "1" }));
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: "Cliente eliminado con éxito" });
  });

  test("debería devolver 404 si el cliente no se encuentra", async () => {
    (ClientService.deleteClient as jest.Mock).mockResolvedValue(0); // 0 filas afectadas

    await delete_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Cliente no encontrado." });
  });

  test("debería manejar error de referencia en la base de datos", async () => {
    const referenceError = new Error("Foreign key constraint fails") as MySQLError;
    referenceError.code = "ER_ROW_IS_REFERENCED";

    (ClientService.deleteClient as jest.Mock).mockRejectedValue(referenceError);

    await delete_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "No se puede eliminar el cliente debido a referencias existentes en otros registros."
    });
  });

  test("debería manejar errores internos del servidor", async () => {
    const generalError = new Error("Error inesperado");

    (ClientService.deleteClient as jest.Mock).mockRejectedValue(generalError);

    await delete_client(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Error interno del servidor",
      details: "Error inesperado"
    });
  });
});
