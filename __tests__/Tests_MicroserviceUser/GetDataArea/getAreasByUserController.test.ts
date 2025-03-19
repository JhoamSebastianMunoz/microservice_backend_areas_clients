import { Request, Response } from 'express';
import get_areasByUser from '../../../controllers/microserviceUserController/get_dataArea';
import MicorserviceUserService from '../../../services/MicorserviceUserService';

// Mock del servicio
jest.mock('../../../services/MicorserviceUserService', () => ({
  getDataArea: jest.fn()
}));

// Mock para console.error y console.log para evitar ruido en los tests
console.error = jest.fn();
console.log = jest.fn();

describe('get_areasByUser Controller', () => {
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

  test('debería obtener una zona correctamente', async () => {
    // Datos de prueba que el servicio debería devolver
    const mockZona = {
      id_zona_de_trabajo: 1,
      nombre_zona_trabajo: 'Zona Test',
      descripcion: 'Descripción de la zona test'
    };
    
    // Configurar el mock para simular éxito
    (MicorserviceUserService.getDataArea as jest.Mock).mockResolvedValue(mockZona);
    
    // Ejecutar la función
    await get_areasByUser(mockRequest as Request, mockResponse as Response);
    
    // Verificar que el servicio fue llamado con los parámetros correctos
    expect(MicorserviceUserService.getDataArea).toHaveBeenCalledWith(1);
    
    // Verificar que console.log fue llamado
    expect(console.log).toHaveBeenCalledWith('ID ZONA', '1');
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockZona);
  });

  test('debería devolver 404 cuando la zona no existe', async () => {
    // Simular que no existe la zona
    (MicorserviceUserService.getDataArea as jest.Mock).mockResolvedValue(null);
    
    // Ejecutar la función
    await get_areasByUser(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Zona no encontrada" });
  });

  test('debería manejar errores internos', async () => {
    // Configurar el mock para simular error
    const error = new Error('Error de prueba');
    (MicorserviceUserService.getDataArea as jest.Mock).mockRejectedValue(error);
    
    // Ejecutar la función
    await get_areasByUser(mockRequest as Request, mockResponse as Response);
    
    // Verificar que console.error fue llamado
    expect(console.error).toHaveBeenCalledWith("Error obteniendo zona:", "Error de prueba");
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Error interno del servidor" });
  });
});