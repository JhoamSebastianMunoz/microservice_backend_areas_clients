import AreaRepository from '../../../repositories/AreaRepository';
import Area from '../../../Dto/AreaDto';
import db from '../../../config/config-db';
import { MySQLError } from '../../../types/errors';
// Mock de la base de datos
jest.mock('../../../config/config-db', () => ({
  execute: jest.fn()
}));

describe('AreaRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('add debería ejecutar la consulta SQL correcta', async () => {
    // Configurar el mock
    (db.execute as jest.Mock).mockResolvedValue([{}, {}]);
    
    // Crear objeto Area para la prueba
    const areaTest = new Area('Zona Test', 'Descripción de prueba');
    
    // Ejecutar el repositorio
    await AreaRepository.add(areaTest);
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'INSERT INTO zonas_de_trabajo (nombre_zona_trabajo, descripcion) VALUES (?, ?)',
      ['Zona Test', 'Descripción de prueba']
    );
  });

  test('add debería manejar errores de SQL', async () => {
    const sqlError = new Error('Error de SQL') as MySQLError;
    sqlError.code = 'ER_BAD_FIELD_ERROR';
  
    (db.execute as jest.Mock).mockRejectedValue(sqlError);
  
    await expect(AreaRepository.add(new Area('Zona Test', 'Descripción de prueba')))
      .rejects.toThrow('Error de SQL');
  });  
});