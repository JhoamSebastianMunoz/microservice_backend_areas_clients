import AreaService from '../../../services/AreaServices';
import AreaRepository from '../../../repositories/AreaRepository';
import DeleteArea from '../../../Dto/DeleteAreaDto';

// Mock del repositorio
jest.mock('../../../repositories/AreaRepository', () => ({
  delete: jest.fn()
}));

describe('AreaService.deleteArea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deleteArea debería llamar al repositorio correctamente y devolver el número de filas afectadas', async () => {
    // Configurar el mock para devolver 1 fila afectada
    (AreaRepository.delete as jest.Mock).mockResolvedValue(1);
    
    // Crear objeto DeleteArea para la prueba
    const deleteAreaDto = new DeleteArea('1');
    
    // Ejecutar el servicio
    const result = await AreaService.deleteArea(deleteAreaDto);
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(AreaRepository.delete).toHaveBeenCalledWith(deleteAreaDto);
    
    // Verificar que el resultado es el esperado
    expect(result).toBe(1);
  });

  test('deleteArea debería devolver 0 cuando el área no existe', async () => {
    // Configurar el mock para devolver 0 filas afectadas
    (AreaRepository.delete as jest.Mock).mockResolvedValue(0);
    
    // Crear objeto DeleteArea para la prueba con ID que no existe
    const deleteAreaDto = new DeleteArea('999');
    
    // Ejecutar el servicio
    const result = await AreaService.deleteArea(deleteAreaDto);
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(AreaRepository.delete).toHaveBeenCalledWith(deleteAreaDto);
    
    // Verificar que el resultado indica que no se eliminó ninguna fila
    expect(result).toBe(0);
  });

  test('deleteArea debería propagar errores del repositorio', async () => {
    // Crear un error para la prueba
    const testError = new Error('Error al eliminar el área');
    
    // Crear objeto DeleteArea para la prueba
    const deleteAreaDto = new DeleteArea('1');
    
    // Configurar el mock para rechazar la promesa
    (AreaRepository.delete as jest.Mock).mockRejectedValue(testError);
    
    // Verificar que el servicio propaga el error
    await expect(AreaService.deleteArea(deleteAreaDto)).rejects.toThrow('Error al eliminar el área');
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(AreaRepository.delete).toHaveBeenCalledWith(deleteAreaDto);
  });
});