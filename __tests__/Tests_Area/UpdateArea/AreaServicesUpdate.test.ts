import AreaService from '../../../services/AreaServices';
import AreaRepository from '../../../repositories/AreaRepository';
import UpdateArea from '../../../Dto/UpdateAreaDto';

// Mock del repositorio
jest.mock('../../../repositories/AreaRepository', () => ({
  update: jest.fn()
}));

describe('AreaService.updateArea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('updateArea debería llamar al repositorio correctamente', async () => {
    // Datos de prueba que el repositorio debería devolver
    const mockResult = {
      affectedRows: 1,
      changedRows: 1,
      fieldCount: 0,
      info: '',
      insertId: 0,
      serverStatus: 2,
      warningStatus: 0
    };
    
    // Crear objeto UpdateArea para la prueba
    const updateAreaDto = new UpdateArea('1', 'Zona Actualizada', 'Descripción actualizada');
    
    // Configurar el mock
    (AreaRepository.update as jest.Mock).mockResolvedValue(mockResult);
    
    // Ejecutar el servicio
    const result = await AreaService.updateArea(updateAreaDto);
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(AreaRepository.update).toHaveBeenCalledWith(updateAreaDto);
    
    // Verificar que el resultado es el esperado
    expect(result).toEqual(mockResult);
  });

  test('updateArea debería devolver el resultado cuando el área no existe', async () => {
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
    
    // Crear objeto UpdateArea para la prueba con ID que no existe
    const updateAreaDto = new UpdateArea('999', 'Zona No Existente', 'Descripción no existente');
    
    // Configurar el mock
    (AreaRepository.update as jest.Mock).mockResolvedValue(mockResult);
    
    // Ejecutar el servicio
    const result = await AreaService.updateArea(updateAreaDto);
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(AreaRepository.update).toHaveBeenCalledWith(updateAreaDto);
    
    // Verificar que el resultado indica que no se actualizó ninguna fila
    expect(result.affectedRows).toBe(0);
  });

  test('updateArea debería propagar errores del repositorio', async () => {
    // Crear un error para la prueba
    const testError = new Error('Error al actualizar el área');
    
    // Crear objeto UpdateArea para la prueba
    const updateAreaDto = new UpdateArea('1', 'Zona Actualizada', 'Descripción actualizada');
    
    // Configurar el mock para rechazar la promesa
    (AreaRepository.update as jest.Mock).mockRejectedValue(testError);
    
    // Verificar que el servicio propaga el error
    await expect(AreaService.updateArea(updateAreaDto)).rejects.toThrow('Error al actualizar el área');
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(AreaRepository.update).toHaveBeenCalledWith(updateAreaDto);
  });
});