import AreaRepository from '../../../repositories/AreaRepository';
import DeleteArea from '../../../Dto/DeleteAreaDto';
import db from '../../../config/config-db';

// Definir interfaz para errores de MySQL
interface MySQLError extends Error {
  code?: string;
  sqlMessage?: string;
}

// Mock de la base de datos
jest.mock('../../../config/config-db', () => ({
  execute: jest.fn()
}));

describe('AreaRepository.delete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('delete debería ejecutar la consulta SQL correcta y devolver el número de filas afectadas', async () => {
    // Datos de prueba que la base de datos debería devolver
    const mockResult = {
      affectedRows: 1,
      fieldCount: 0,
      info: '',
      insertId: 0,
      serverStatus: 2,
      warningStatus: 0
    };
    
    // Crear objeto DeleteArea para la prueba
    const deleteAreaDto = new DeleteArea('1');
    
    // Configurar el mock
    (db.execute as jest.Mock).mockResolvedValue([mockResult]);
    
    // Ejecutar el repositorio
    const result = await AreaRepository.delete(deleteAreaDto);
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'DELETE FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?',
      ['1']
    );
    
    // Verificar que el resultado es el esperado
    expect(result).toBe(1);
  });

  test('delete debería devolver 0 cuando el área no existe', async () => {
    // Simulación de resultado cuando no se encuentra el área
    const mockNoMatchResult = {
      affectedRows: 0,
      fieldCount: 0,
      info: '',
      insertId: 0,
      serverStatus: 2,
      warningStatus: 0
    };
    
    // Crear objeto DeleteArea para la prueba con ID que no existe
    const deleteAreaDto = new DeleteArea('999');
    
    // Configurar el mock
    (db.execute as jest.Mock).mockResolvedValue([mockNoMatchResult]);
    
    // Ejecutar el repositorio
    const result = await AreaRepository.delete(deleteAreaDto);
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'DELETE FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?',
      ['999']
    );
    
    // Verificar que el resultado indica que no se eliminó ningún registro
    expect(result).toBe(0);
  });

  test('delete debería propagar error de clave externa', async () => {
    // Crear un error de restricción de clave externa para la prueba
    const foreignKeyError = new Error('Foreign key constraint fails') as MySQLError;
    foreignKeyError.code = 'ER_ROW_IS_REFERENCED';
    foreignKeyError.sqlMessage = 'Cannot delete or update a parent row: a foreign key constraint fails';
    
    // Crear objeto DeleteArea para la prueba
    const deleteAreaDto = new DeleteArea('1');
    
    // Configurar el mock para rechazar la promesa
    (db.execute as jest.Mock).mockRejectedValue(foreignKeyError);
    
    // Verificar que el repositorio propaga el error
    await expect(AreaRepository.delete(deleteAreaDto)).rejects.toThrow('Foreign key constraint fails');
    
    // Verificar que el error tiene el código correcto
    await expect(AreaRepository.delete(deleteAreaDto)).rejects.toHaveProperty('code', 'ER_ROW_IS_REFERENCED');
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'DELETE FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?',
      ['1']
    );
  });

  test('delete debería propagar otros errores de la base de datos', async () => {
    // Crear un error general para la prueba
    const dbError = new Error('Error de base de datos') as MySQLError;
    dbError.code = 'ER_BAD_DB_ERROR';
    dbError.sqlMessage = 'Database error';
    
    // Crear objeto DeleteArea para la prueba
    const deleteAreaDto = new DeleteArea('1');
    
    // Configurar el mock para rechazar la promesa
    (db.execute as jest.Mock).mockRejectedValue(dbError);
    
    // Verificar que el repositorio propaga el error
    await expect(AreaRepository.delete(deleteAreaDto)).rejects.toThrow('Error de base de datos');
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'DELETE FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?',
      ['1']
    );
  });
});