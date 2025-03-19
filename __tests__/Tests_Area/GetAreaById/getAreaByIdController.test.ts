import { Request, Response } from 'express';
import get_area from '../../../controllers/areaControllers/get-area-controller';
import AreaService from '../../../services/AreaServices';
import GetArea from '../../../Dto/GetAreaDto';
import { MySQLError } from '../../../types/errors';


// Mock del servicio
jest.mock('../../../services/AreaServices', () => ({
  getArea: jest.fn()
}));

describe('get_area Controller', () => {
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
        id_zona_de_trabajo: '1'
      }
    };
    
    mockResponse = responseObject;
  });

  test('debería obtener un área existente correctamente', async () => {
    // Datos de prueba que el servicio debería devolver
    const mockArea = [
      { id_zona_de_trabajo: 1, nombre_zona_trabajo: 'Zona 1', descripcion: 'Descripción 1' }
    ];
    
    // Configurar el mock para simular éxito
    (AreaService.getArea as jest.Mock).mockResolvedValue(mockArea);
    
    // Ejecutar la función
    await get_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar que el servicio fue llamado con los parámetros correctos
    expect(AreaService.getArea).toHaveBeenCalledWith(
      expect.objectContaining({
        id_zona_de_trabajo: '1'
      })
    );
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockArea);
  });

  test('debería devolver 404 cuando el área no existe', async () => {
    // Simular un área que no existe (array vacío)
    (AreaService.getArea as jest.Mock).mockResolvedValue([]);
    
    // Ejecutar la función
    await get_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Zona de trabajo no encontrada' });
  });

  test('debería manejar error de entrada duplicada', async () => {
    // Configurar el mock para simular error de duplicado
    const duplicateError = new Error('Duplicate entry') as MySQLError;
    duplicateError.code = 'ER_DUP_ENTRY';
    duplicateError.sqlMessage = 'Entrada duplicada';
    
    (AreaService.getArea as jest.Mock).mockRejectedValue(duplicateError);
    
    // Ejecutar la función
    await get_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorInfo: 'Entrada duplicada' });
  });

  test('debería manejar error general', async () => {
    // Configurar el mock para simular error genérico
    const generalError = new Error('Error general');
    
    (AreaService.getArea as jest.Mock).mockRejectedValue(generalError);
    
    // Ejecutar la función
    await get_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      error: 'Internal Server Error', 
      details: 'Error general' 
    });
  });
});