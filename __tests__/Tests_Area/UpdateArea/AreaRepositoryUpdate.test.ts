import AreaRepository from '../../../repositories/AreaRepository';
import UpdateArea from '../../../Dto/UpdateAreaDto';
import db from '../../../config/config-db';
import { MySQLError } from '../../../types/errors';

// Mock de la base de datos
jest.mock('../../../config/config-db', () => ({
  execute: jest.fn()
}));

describe('AreaRepository.update', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('update debería ejecutar la consulta SQL correcta y devolver los datos', async () => {
    // Datos de prueba que la base de datos debería devolver
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
    (db.execute as jest.Mock).mockResolvedValue([mockResult]);
    
    // Ejecutar el repositorio
    const result = await AreaRepository.update(updateAreaDto);
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'UPDATE zonas_de_trabajo SET nombre_zona_trabajo = ?, descripcion = ? WHERE id_zona_de_trabajo = ?',
      ['Zona Actualizada', 'Descripción actualizada', '1']
    );
    
    // Verificar que el resultado es el esperado
    expect(result).toEqual(mockResult);
  });

  test('update debería devolver affectedRows=0 cuando el área no existe', async () => {
    // Simulación de resultado cuando no se encuentra el área
    const mockNoMatchResult = {
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
    (db.execute as jest.Mock).mockResolvedValue([mockNoMatchResult]);
    
    // Ejecutar el repositorio
    const result = await AreaRepository.update(updateAreaDto);
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'UPDATE zonas_de_trabajo SET nombre_zona_trabajo = ?, descripcion = ? WHERE id_zona_de_trabajo = ?',
      ['Zona No Existente', 'Descripción no existente', '999']
    );
    
    // Verificar que el resultado indica que no se actualizó ningún registro
    expect(result.affectedRows).toBe(0);
  });

  test('update debería propagar errores de la base de datos', async () => {
    // Crear un error para la prueba
    const dbError = new Error('Error de base de datos') as MySQLError;
    dbError.code = 'ER_BAD_DB_ERROR';
    dbError.sqlMessage = 'Database error';
    
    // Crear objeto UpdateArea para la prueba
    const updateAreaDto = new UpdateArea('1', 'Zona Actualizada', 'Descripción actualizada');
    
    // Configurar el mock para rechazar la promesa
    (db.execute as jest.Mock).mockRejectedValue(dbError);
    
    // Verificar que el repositorio propaga el error
    await expect(AreaRepository.update(updateAreaDto)).rejects.toThrow('Error de base de datos');
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      'UPDATE zonas_de_trabajo SET nombre_zona_trabajo = ?, descripcion = ? WHERE id_zona_de_trabajo = ?',
      ['Zona Actualizada', 'Descripción actualizada', '1']
    );
  });
});