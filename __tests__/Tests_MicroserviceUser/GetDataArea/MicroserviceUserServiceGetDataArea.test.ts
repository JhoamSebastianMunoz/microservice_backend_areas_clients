import MicorserviceUserService from '../../../services/MicorserviceUserService';
import MicroserviceUserRepository from '../../../repositories/MicroserviceUser';

// Mock del repositorio
jest.mock('../../../repositories/MicroserviceUser', () => ({
  getAreaById: jest.fn()
}));

describe('MicorserviceUserService.getDataArea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getDataArea debería llamar al repositorio correctamente', async () => {
    // Datos de prueba que el repositorio debería devolver
    const mockZona = {
      id_zona_de_trabajo: 1,
      nombre_zona_trabajo: 'Zona Test',
      descripcion: 'Descripción de la zona test'
    };
    
    // Configurar el mock
    (MicroserviceUserRepository.getAreaById as jest.Mock).mockResolvedValue(mockZona);
    
    // Ejecutar el servicio
    const result = await MicorserviceUserService.getDataArea(1);
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(MicroserviceUserRepository.getAreaById).toHaveBeenCalledWith(1);
    
    // Verificar que el resultado es el esperado
    expect(result).toEqual(mockZona);
  });

  test('getDataArea debería devolver null cuando la zona no existe', async () => {
    // Simular que no existe la zona
    (MicroserviceUserRepository.getAreaById as jest.Mock).mockResolvedValue(null);
    
    // Ejecutar el servicio
    const result = await MicorserviceUserService.getDataArea(999);
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(MicroserviceUserRepository.getAreaById).toHaveBeenCalledWith(999);
    
    // Verificar que el resultado es null
    expect(result).toBeNull();
  });

  test('getDataArea debería propagar errores del repositorio', async () => {
    // Crear un error para la prueba
    const testError = new Error('Error al obtener la zona');
    
    // Configurar el mock para rechazar la promesa
    (MicroserviceUserRepository.getAreaById as jest.Mock).mockRejectedValue(testError);
    
    // Verificar que el servicio propaga el error
    await expect(MicorserviceUserService.getDataArea(1)).rejects.toThrow('Error al obtener la zona');
    
    // Verificar que el repositorio fue llamado con los parámetros correctos
    expect(MicroserviceUserRepository.getAreaById).toHaveBeenCalledWith(1);
  });
});