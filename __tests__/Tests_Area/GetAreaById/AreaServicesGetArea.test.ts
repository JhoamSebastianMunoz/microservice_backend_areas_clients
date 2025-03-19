import AreaService from '../../../services/AreaServices';
import AreaRepository from '../../../repositories/AreaRepository';
import GetArea from '../../../Dto/GetAreaDto';

// Mock del repositorio
jest.mock('../../../repositories/AreaRepository', () => ({
  get: jest.fn()
}));

describe('AreaService.getArea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getArea debería llamar al repositorio correctamente', async () => {
    // Datos de prueba que el repositorio debería devolver
    const mockArea = [
      { id_zona_de_trabajo: 1, nombre_zona_trabajo: 'Zona 1', descripcion: 'Descripción 1' }
    ];
    
    // Crear objeto GetArea para la prueba
    const getAreaDto = new GetArea('1');
    
    // Configurar el mock
    (AreaRepository.get as jest.Mock).mockResolvedValue(mockArea);
    
    // Ejecutar el servicio
    const result = await AreaService.getArea(getAreaDto);
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(AreaRepository.get).toHaveBeenCalledWith(getAreaDto);
    
    // Verificar que el resultado es el esperado
    expect(result).toEqual(mockArea);
  });

  test('getArea debería devolver un array vacío cuando el área no existe', async () => {
    // Simular un área que no existe (array vacío)
    (AreaRepository.get as jest.Mock).mockResolvedValue([]);
    
    // Crear objeto GetArea para la prueba
    const getAreaDto = new GetArea('999'); // ID que no existe
    
    // Ejecutar el servicio
    const result = await AreaService.getArea(getAreaDto);
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(AreaRepository.get).toHaveBeenCalledWith(getAreaDto);
    
    // Verificar que el resultado es un array vacío
    expect(result).toEqual([]);
  });

  test('getArea debería propagar errores del repositorio', async () => {
    // Crear un error para la prueba
    const testError = new Error('Error al obtener el área');
    
    // Crear objeto GetArea para la prueba
    const getAreaDto = new GetArea('1');
    
    // Configurar el mock para rechazar la promesa
    (AreaRepository.get as jest.Mock).mockRejectedValue(testError);
    
    // Verificar que el servicio propaga el error
    await expect(AreaService.getArea(getAreaDto)).rejects.toThrow('Error al obtener el área');
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(AreaRepository.get).toHaveBeenCalledWith(getAreaDto);
  });
});