import { Request, Response } from 'express';
import update_area from '../../../controllers/areaControllers/update-area-controller';
import AreaService from '../../../services/AreaServices';
import UpdateArea from '../../../Dto/UpdateAreaDto';
import { MySQLError } from '../../../types/errors';

// Mock del servicio
jest.mock('../../../services/AreaServices', () => ({
  updateArea: jest.fn()
}));

describe('update_area Controller', () => {
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
      },
      body: {
        nombre_zona_trabajo: 'Zona Actualizada',
        descripcion: 'Descripción actualizada'
      }
    };
    
    mockResponse = responseObject;
  });

  test('debería actualizar un área existente correctamente', async () => {
    // Datos de prueba que el servicio debería devolver
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
      fieldCount: 0,
      info: '',
      insertId: 0,
      serverStatus: 2,
      warningStatus: 0
    };
    
    // Configurar el mock para simular éxito
    (AreaService.updateArea as jest.Mock).mockResolvedValue(mockResult);
    
    // Ejecutar la función
    await update_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar que el servicio fue llamado con los parámetros correctos
    expect(AreaService.updateArea).toHaveBeenCalledWith(
      expect.objectContaining({
        id_zona_de_trabajo: '1',
        nombre_zona_trabajo: 'Zona Actualizada',
        descripcion: 'Descripción actualizada'
      })
    );
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      status: 'ok, Zona de trabajo actualizado con éxito'
    });
  });

  test('debería devolver 404 cuando el área no existe', async () => {
    // Simular un área que no existe (affectedRows = 0)
    const mockResult = {
      affectedRows: 0,
      changedRows: 0,
      fieldCount: 0,
      info: '',
      insertId: 0,
      serverStatus: 2,
      warningStatus: 0
    };
    
    (AreaService.updateArea as jest.Mock).mockResolvedValue(mockResult);
    
    // Ejecutar la función
    await update_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      error: 'Zona de trabajo no encontrado.' 
    });
  });

  test('debería manejar error general', async () => {
    // Configurar el mock para simular error genérico
    const generalError = new Error('Error general');
    
    (AreaService.updateArea as jest.Mock).mockRejectedValue(generalError);
    
    // Ejecutar la función
    await update_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      error: 'Internal Server Error', 
      details: 'Error general' 
    });
  });
});