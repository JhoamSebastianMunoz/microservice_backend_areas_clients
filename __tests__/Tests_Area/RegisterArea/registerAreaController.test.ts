import { Request, Response } from 'express';
import register_area from '../../../controllers/areaControllers/register-area-controller'; 
import AreaService from '../../../services/AreaServices';
import Area from '../../../Dto/AreaDto';
import { MySQLError } from '../../../types/errors';

// Mock del servicio
jest.mock('../../../services/AreaServices', () => ({
  register_area: jest.fn()
}));

describe('register_area Controller', () => {
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
      body: {
        nombre_zona_trabajo: 'Zona Test',
        descripcion: 'Descripción de prueba'
      }
    };
    
    mockResponse = responseObject;
  });

  test('debería registrar un área correctamente', async () => {
    // Configurar el mock para simular éxito
    (AreaService.register_area as jest.Mock).mockResolvedValue({});
    
    // Ejecutar la función
    await register_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar que el servicio fue llamado con los parámetros correctos
    expect(AreaService.register_area).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre_zona_trabajo: 'Zona Test',
        descripcion: 'Descripción de prueba'
      })
    );
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ status: 'Zona registrada con éxito' });
  });

  test('debería manejar error de entrada duplicada', async () => {
    // Configurar el mock para simular error de duplicado
    const duplicateError = new Error('Duplicate entry') as MySQLError;
    duplicateError.code = 'ER_DUP_ENTRY';
    duplicateError.sqlMessage = 'Entrada duplicada';
    
    (AreaService.register_area as jest.Mock).mockRejectedValue(duplicateError);
    
    // Ejecutar la función
    await register_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorInfo: 'Entrada duplicada' });
  });

  test('debería manejar error general', async () => {
    // Configurar el mock para simular error genérico
    const generalError = new Error('Error general');
    
    (AreaService.register_area as jest.Mock).mockRejectedValue(generalError);
    
    // Ejecutar la función
    await register_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      error: 'Internal Server Error', 
      details: 'Error general' 
    });
  });

  test('debería manejar datos faltantes', async () => {
    mockRequest = { body: {} }; // Falta la data
  
    await register_area(mockRequest as Request, mockResponse as Response);
  
    expect(mockResponse.status).toHaveBeenCalledWith(400); // Debería devolver error 400
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Datos inválidos' });
  });  
});