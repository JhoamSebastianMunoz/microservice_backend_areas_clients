import MicroserviceUserRepository from "../../../repositories/MicroserviceUser";
import db from "../../../config/config-db";

jest.mock("../../../config/config-db");

describe("MicroserviceUserRepository", () => {
    it("debería ejecutar la consulta SQL correcta y devolver clientes", async () => {
        const mockClients = [{ id: 1, nombre: "Cliente 1" }];
        (db.execute as jest.Mock).mockResolvedValue([mockClients]);

        const result = await MicroserviceUserRepository.getClientByIdArea(2);

        expect(db.execute).toHaveBeenCalledWith(
            "SELECT * FROM clientes WHERE id_zona_de_trabajo = ?",
            [2]
        );
        expect(result).toEqual(mockClients);
    });

    it("debería devolver null si no hay clientes", async () => {
        (db.execute as jest.Mock).mockResolvedValue([[]]);

        const result = await MicroserviceUserRepository.getClientByIdArea(3);

        expect(result).toBeNull();
    });

    it("debería manejar errores de la base de datos", async () => {
        (db.execute as jest.Mock).mockRejectedValue(new Error("DB error"));

        await expect(MicroserviceUserRepository.getClientByIdArea(4)).rejects.toThrow("DB error");
    });
});
