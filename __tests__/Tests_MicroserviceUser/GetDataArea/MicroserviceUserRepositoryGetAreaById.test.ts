import MicroserviceUserRepository from '../../../repositories/MicroserviceUser';
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

describe('MicroserviceUserRepository.getAreaById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAreaById debería ejecutar la consulta SQL correcta y devolver la zona', async () => {
    // Datos de prueba que la base de datos debería devolver
    const mockZonas = [
      {
        id_zona_de_trabajo: 1,
        nombre_zona_trabajo: 'Zona Test',
        descripcion: 'Descripción de la zona test'
      }
    ];
    
    // Configurar el mock
    (db.execute as jest.Mock).mockResolvedValue([mockZonas]);
    
    // Ejecutar el repositorio
    const result = await MicroserviceUserRepository.getAreaById(1);
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      "SELECT * FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?",
      [1]
    );
    
    // Verificar que el resultado es el esperado (el primer elemento del array)
    expect(result).toEqual(mockZonas[0]);
  });

  test('getAreaById debería devolver null cuando la zona no existe', async () => {
    // Simular que no existe la zona (array vacío)
    (db.execute as jest.Mock).mockResolvedValue([[]]);
    
    // Ejecutar el repositorio
    const result = await MicroserviceUserRepository.getAreaById(999);
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      "SELECT * FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?",
      [999]
    );
    
    // Verificar que el resultado es null
    expect(result).toBeNull();
  });

  test('getAreaById debería propagar errores de la base de datos', async () => {
    // Crear un error para la prueba
    const dbError = new Error('Error de base de datos') as MySQLError;
    dbError.code = 'ER_BAD_DB_ERROR';
    dbError.sqlMessage = 'Database error';
    
    // Configurar el mock para rechazar la promesa
    (db.execute as jest.Mock).mockRejectedValue(dbError);
    
    // Verificar que el repositorio propaga el error
    await expect(MicroserviceUserRepository.getAreaById(1)).rejects.toThrow('Error de base de datos');
    
    // Verificar que execute fue llamado con los parámetros correctos
    expect(db.execute).toHaveBeenCalledWith(
      "SELECT * FROM zonas_de_trabajo WHERE id_zona_de_trabajo = ?",
      [1]
    );
  });
});