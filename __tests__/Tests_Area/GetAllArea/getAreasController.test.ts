import { Request, Response } from 'express';
import get_Areas from '../../../controllers/areaControllers/get-areas-controller'; 
import AreasService from '../../../services/AreaServices';
import { MySQLError } from '../../../types/errors';

// Mock del servicio
jest.mock('../../../services/AreaServices', () => ({
  getAreas: jest.fn()
}));

describe('get_Areas Controller', () => {
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
    
    mockRequest = {};
    mockResponse = responseObject;
  });

  test('debería obtener todas las áreas correctamente', async () => {
    // Datos de prueba que el servicio debería devolver
    const mockAreas = [
      { id: 1, nombre_zona_trabajo: 'Zona 1', descripcion: 'Descripción 1' },
      { id: 2, nombre_zona_trabajo: 'Zona 2', descripcion: 'Descripción 2' }
    ];
    
    // Configurar el mock para simular éxito
    (AreasService.getAreas as jest.Mock).mockResolvedValue(mockAreas);
    
    // Ejecutar la función
    await get_Areas(mockRequest as Request, mockResponse as Response);
    
    // Verificar que el servicio fue llamado
    expect(AreasService.getAreas).toHaveBeenCalled();
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockAreas);
  });

  test('debería manejar error de entrada duplicada', async () => {
    // Configurar el mock para simular error de duplicado
    const duplicateError = new Error('Duplicate entry') as MySQLError;
    duplicateError.code = 'ER_DUP_ENTRY';
    duplicateError.sqlMessage = 'Entrada duplicada';
    
    (AreasService.getAreas as jest.Mock).mockRejectedValue(duplicateError);
    
    // Ejecutar la función
    await get_Areas(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ errorInfo: 'Entrada duplicada' });
  });

  test('debería manejar error general', async () => {
    // Configurar el mock para simular error genérico
    const generalError = new Error('Error general');
    
    (AreasService.getAreas as jest.Mock).mockRejectedValue(generalError);
    
    // Ejecutar la función
    await get_Areas(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      error: 'Internal Server Error', 
      details: 'Error general' 
    });
  });
});