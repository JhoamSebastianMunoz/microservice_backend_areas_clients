import AreaRepository from '../../../repositories/AreaRepository';
import GetArea from '../../../Dto/GetAreaDto';
import db from '../../../config/config-db';
import { MySQLError } from '../../../types/errors';

// Mock de la base de datos
jest.mock('../../../config/config-db', () => ({
  execute: jest.fn()
}));

describe('AreaRepository.get', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('get debería ejecutar la consulta SQL correcta y devolver los datos', async () => {
    // Datos de prueba que la base de datos debería devolver
    const mockArea = [
      { id_zona_de_trabajo: 1, nombre_zona_trabajo: 'Zona 1', descripcion: 'Descripción 1' }
    ];
    
    // Crear objeto GetArea para la prueba
    const getAreaDto = new GetArea('1');
    
    // Configurar el mock
    (db.execute as jest.Mock).mockResolvedValue([mockArea]);
    
    // Ejecutar el repositorio
    const result = await AreaRepository.get(getAreaDto);
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'SELECT * FROM  zonas_de_trabajo WHERE id_zona_de_trabajo= ?',
      ['1']
    );
    
    // Verificar que el resultado es el esperado
    expect(result).toEqual(mockArea);
  });

  test('get debería devolver un array vacío cuando el área no existe', async () => {
    // Simular un área que no existe (array vacío)
    (db.execute as jest.Mock).mockResolvedValue([[]]);
    
    // Crear objeto GetArea para la prueba
    const getAreaDto = new GetArea('999'); // ID que no existe
    
    // Ejecutar el repositorio
    const result = await AreaRepository.get(getAreaDto);
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'SELECT * FROM  zonas_de_trabajo WHERE id_zona_de_trabajo= ?',
      ['999']
    );
    
    // Verificar que el resultado es un array vacío
    expect(result).toEqual([]);
  });

  test('get debería propagar errores de la base de datos', async () => {
    // Crear un error para la prueba
    const dbError = new Error('Error de base de datos') as MySQLError;
    dbError.code = 'ER_BAD_DB_ERROR';
    dbError.sqlMessage = 'Database error';
    
    // Crear objeto GetArea para la prueba
    const getAreaDto = new GetArea('1');
    
    // Configurar el mock para rechazar la promesa
    (db.execute as jest.Mock).mockRejectedValue(dbError);
    
    // Verificar que el repositorio propaga el error
    await expect(AreaRepository.get(getAreaDto)).rejects.toThrow('Error de base de datos');
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'SELECT * FROM  zonas_de_trabajo WHERE id_zona_de_trabajo= ?',
      ['1']
    );
  });
});