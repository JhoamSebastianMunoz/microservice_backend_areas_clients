// AreaService.test.ts
import AreaService from '../../../services/AreaServices';
import AreaRepository from '../../../repositories/AreaRepository';
import Area from '../../../Dto/AreaDto';


// Mock del repositorio
jest.mock('../../../repositories/AreaRepository', () => ({
    add: jest.fn()
  }));
  
  describe('AreaService', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('register_area debería llamar al repositorio correctamente', async () => {
      // Configurar el mock
      (AreaRepository.add as jest.Mock).mockResolvedValue({});
      
      // Crear objeto Area para la prueba
      const areaTest = new Area('Zona Test', 'Descripción de prueba');
      
      // Ejecutar el servicio
      await AreaService.register_area(areaTest);
      
      // Verificar que el repositorio fue llamado con los parámetros correctos
      expect(AreaRepository.add).toHaveBeenCalledWith(areaTest);
    });
  });