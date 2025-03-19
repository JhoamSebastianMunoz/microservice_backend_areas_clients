import MicroserviceUserService from "../../../services/MicorserviceUserService";
import MicroserviceUserRepository from "../../../repositories/MicroserviceUser";

jest.mock("../../../repositories/MicroserviceUser");

describe("MicroserviceUserService", () => {
    it("debería devolver la lista de clientes si existen", async () => {
        const mockClients = [{ id: 1, nombre: "Cliente 1" }];
        (MicroserviceUserRepository.getClientByIdArea as jest.Mock).mockResolvedValue(mockClients);

        const result = await MicroserviceUserService.getClientArea(2);

        expect(result).toEqual(mockClients);
    });

    it("debería devolver null si no hay clientes en la zona", async () => {
        (MicroserviceUserRepository.getClientByIdArea as jest.Mock).mockResolvedValue(null);

        const result = await MicroserviceUserService.getClientArea(3);

        expect(result).toBeNull();
    });

    it("debería manejar errores y propagarlos", async () => {
        (MicroserviceUserRepository.getClientByIdArea as jest.Mock).mockRejectedValue(new Error("DB error"));

        await expect(MicroserviceUserService.getClientArea(4)).rejects.toThrow("DB error");
    });
});
