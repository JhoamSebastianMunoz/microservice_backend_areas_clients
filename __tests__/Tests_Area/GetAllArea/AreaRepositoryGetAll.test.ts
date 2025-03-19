import AreaRepository from '../../../repositories/AreaRepository';
import db from '../../../config/config-db';
import GetArea from '../../../Dto/GetAreaDto'; // Asegúrate de que esta ruta sea correcta

// Definir interfaz para errores de MySQL
interface MySQLError extends Error {
  code?: string;
  sqlMessage?: string;
}

// Mock de la base de datos
jest.mock('../../../config/config-db', () => ({
  execute: jest.fn()
}));

describe('AreaRepository.getAll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll debería ejecutar la consulta SQL correcta y devolver los datos', async () => {
    // Datos de prueba que la base de datos debería devolver
    const mockRows = [
      { id: 1, nombre_zona_trabajo: 'Zona 1', descripcion: 'Descripción 1' },
      { id: 2, nombre_zona_trabajo: 'Zona 2', descripcion: 'Descripción 2' }
    ];
    
    // Configurar el mock
    (db.execute as jest.Mock).mockResolvedValue([mockRows]);
    
    // Ejecutar el repositorio
    const result = await AreaRepository.getAll();
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith('SELECT * FROM zonas_de_trabajo');
    
    // Verificar que el resultado es el esperado
    expect(result).toEqual(mockRows);
  });

  test('getAll debería propagar errores de la base de datos', async () => {
    // Crear un error para la prueba
    const dbError = new Error('Error de base de datos') as MySQLError;
    dbError.code = 'ER_BAD_DB_ERROR';
    dbError.sqlMessage = 'Database error';
    
    // Configurar el mock para rechazar la promesa
    (db.execute as jest.Mock).mockRejectedValue(dbError);
    
    // Verificar que el repositorio propaga el error
    await expect(AreaRepository.getAll()).rejects.toThrow('Error de base de datos');
    
    // Verificar que execute fue llamado
    expect(db.execute).toHaveBeenCalledWith('SELECT * FROM zonas_de_trabajo');
  });
});