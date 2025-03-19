import AreasService from '../../../services/AreaServices';
import AreaRepository from '../../../repositories/AreaRepository';

// Mock del repositorio
jest.mock('../../../repositories/AreaRepository', () => ({
  getAll: jest.fn()
}));

describe('AreasService.getAreas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAreas debería llamar al repositorio correctamente', async () => {
    // Datos de prueba que el repositorio debería devolver
    const mockAreas = [
      { id: 1, nombre_zona_trabajo: 'Zona 1', descripcion: 'Descripción 1' },
      { id: 2, nombre_zona_trabajo: 'Zona 2', descripcion: 'Descripción 2' }
    ];
    
    // Configurar el mock
    (AreaRepository.getAll as jest.Mock).mockResolvedValue(mockAreas);
    
    // Ejecutar el servicio
    const result = await AreasService.getAreas();
    
    // Verificar que el repositorio fue llamado
    expect(AreaRepository.getAll).toHaveBeenCalled();
    
    // Verificar que el resultado es el esperado
    expect(result).toEqual(mockAreas);
  });

  test('getAreas debería propagar errores del repositorio', async () => {
    // Crear un error para la prueba
    const testError = new Error('Error al obtener áreas');
    
    // Configurar el mock para rechazar la promesa
    (AreaRepository.getAll as jest.Mock).mockRejectedValue(testError);
    
    // Verificar que el servicio propaga el error
    await expect(AreasService.getAreas()).rejects.toThrow('Error al obtener áreas');
    
    // Verificar que el repositorio fue llamado
    expect(AreaRepository.getAll).toHaveBeenCalled();
  });
});