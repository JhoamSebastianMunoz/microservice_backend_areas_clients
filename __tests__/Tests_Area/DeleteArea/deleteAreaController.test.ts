import { Request, Response } from 'express';
import delete_area from '../../../controllers/areaControllers/delete-area-controller';
import AreaService from '../../../services/AreaServices';
import DeleteArea from '../../../Dto/DeleteAreaDto';
import { MySQLError } from '../../../types/errors';

// Mock del servicio
jest.mock('../../../services/AreaServices', () => ({
  deleteArea: jest.fn()
}));

describe('delete_area Controller', () => {
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

  test('debería eliminar un área existente correctamente', async () => {
    // Configurar el mock para simular éxito (1 fila afectada)
    (AreaService.deleteArea as jest.Mock).mockResolvedValue(1);
    
    // Ejecutar la función
    await delete_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar que el servicio fue llamado con los parámetros correctos
    expect(AreaService.deleteArea).toHaveBeenCalledWith(
      expect.objectContaining({
        id_zona_de_trabajo: '1'
      })
    );
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      message: "Zona de trabajo eliminado con éxito" 
    });
  });

  test('debería devolver 404 cuando el área no existe', async () => {
    // Simular un área que no existe (0 filas afectadas)
    (AreaService.deleteArea as jest.Mock).mockResolvedValue(0);
    
    // Ejecutar la función
    await delete_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      error: "Zona de trabajo no encontrado." 
    });
  });

  test('debería manejar error de referencias existentes', async () => {
    // Configurar el mock para simular error de restricción de clave externa
    const referenceError = new Error('Foreign key constraint') as MySQLError;
    referenceError.code = 'ER_ROW_IS_REFERENCED';
    
    (AreaService.deleteArea as jest.Mock).mockRejectedValue(referenceError);
    
    // Ejecutar la función
    await delete_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      error: "No se puede eliminar la Zona de trabajo debido a referencias existentes en otros registros." 
    });
  });

  test('debería manejar error general', async () => {
    // Configurar el mock para simular error genérico
    const generalError = new Error('Error general');
    
    (AreaService.deleteArea as jest.Mock).mockRejectedValue(generalError);
    
    // Ejecutar la función
    await delete_area(mockRequest as Request, mockResponse as Response);
    
    // Verificar respuesta de error
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ 
      error: "Error interno del servidor", 
      details: "Error general" 
    });
  });
});