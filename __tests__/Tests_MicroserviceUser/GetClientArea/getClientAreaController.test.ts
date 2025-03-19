import { Request, Response } from 'express';
import get_clientArea from '../../../controllers/microserviceUserController/get_clientArea';
import MicorserviceUserService from '../../../services/MicorserviceUserService';

// Mock del servicio
jest.mock('../../../services/MicorserviceUserService', () => ({
  getClientArea: jest.fn()
}));

// Mock para console.error y console.log para evitar ruido en los tests
console.error = jest.fn();
console.log = jest.fn();

describe('get_clientArea Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    // Reiniciar mocks entre pruebas
    jest.clearAllMocks();
    
    // Configurar request y response mock
    responseObject = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };
    
    mockRequest = {
      params: {
        id_area: '1'
      }
    };
    
    mockResponse = responseObject;
  });

  test('debería obtener clientes de un área correctamente', async () => {
    // Datos de prueba que el servicio debería devolver
    const mockClientes = [
      { id_cliente: 1, nombre: 'Cliente 1', id_zona_de_trabajo: 1 },
      { id_cliente: 2, nombre: 'Cliente 2', id_zona_de_trabajo: 1 }
    ];
    
    // Configurar el mock para simular éxito
    (MicorserviceUserService.getClientArea as jest.Mock).mockResolvedValue(mockClientes);
    
    // Ejecutar la función
    await get_clientArea(mockRequest as Request, mockResponse as Response);
    
    // Verificar que el servicio fue llamado con los parámetros correctos
    expect(MicorserviceUserService.getClientArea).toHaveBeenCalledWith(1);
    
    // Verificar que console.log fue llamado
    expect(console.log).toHaveBeenCalledWith('ID ZONA', '1');
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockClientes);
  });

  test('debería devolver 404 cuando no hay clientes en el área', async () => {
    // Simular que no hay clientes en el área
    (MicorserviceUserService.getClientArea as jest.Mock).mockResolvedValue([]);
    
    // Ejecutar la función
    await get_clientArea(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "No hay clientes en esta zona" });
  });

  test('debería devolver 404 cuando el servicio devuelve null', async () => {
    // Simular que el servicio devuelve null
    (MicorserviceUserService.getClientArea as jest.Mock).mockResolvedValue(null);
    
    // Ejecutar la función
    await get_clientArea(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "No hay clientes en esta zona" });
  });

  test('debería manejar errores internos', async () => {
    // Configurar el mock para simular error
    const error = new Error('Error de prueba');
    (MicorserviceUserService.getClientArea as jest.Mock).mockRejectedValue(error);
    
    // Ejecutar la función
    await get_clientArea(mockRequest as Request, mockResponse as Response);
    
    // Verificar que console.error fue llamado
    expect(console.error).toHaveBeenCalledWith("Error obteniendo zona:", "Error de prueba");
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Error interno del servidor" });
  });
});