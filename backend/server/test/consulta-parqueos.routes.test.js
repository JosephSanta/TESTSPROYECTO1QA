const request = require("supertest");
const app = require("../src/app"); // 
const token = require("../src/controllers/token");

// Mockear el middleware de verificación de token
jest.mock('../src/controllers/token', () => ({
    verifyToken: (req, res, next) => next(), 
}));

describe("Pruebas de rutas de parqueos", () => {
    it("GET /get-all debería retornar un status 200", async () => {
        const response = await request(app).get("/get-all");
        expect(response.statusCode).toBe(200);
    });

    it("GET /get-all/combo-box debería retornar un status 200", async () => {
        const response = await request(app).get("/get-all/combo-box");
        expect(response.statusCode).toBe(200);
    });

    it("GET /findByID/:mongo_id debería retornar un parqueo", async () => {
        const mongo_id = "id_valido_de_prueba"; 
        const response = await request(app).get(`/findByID/${mongo_id}`);
        expect(response.statusCode).toBe(200);
        
    });

    it("PUT /updateByID/:mongo_id debería actualizar un parqueo", async () => {
        const mongo_id = "id_valido_de_prueba"; 
        const parqueoActualizado = {
            _id_parqueo: "Parqueo Actualizado",
            tipo: "Actualizado",
            capacidad_total: 60,
            capacidad_actual: 20,
            horario: [
                { dia: "Martes", hora_entrada: "08:00", hora_salida: "21:00" }
            ],
            espacios_jefatura: 15,
            espacios_VOficiales: 12,
            espacios_asignados: 14,
            espacios_visitantes: 10,
            espacios_NEspeciales: 9,
            direccion: "Dirección actualizada",
            id_contrato: "54321",
            contacto: "Nuevo contacto",
        };

        const response = await request(app)
            .put(`/updateByID/${mongo_id}`)
            .send(parqueoActualizado); 

        expect(response.statusCode).toBe(200);
        
    });

    it("DELETE /deleteByID/:mongo_id debería eliminar un parqueo", async () => {
        const mongo_id = "id_valido_de_prueba"; 
        const response = await request(app).delete(`/deleteByID/${mongo_id}`);
        expect(response.statusCode).toBe(200);
    });
});
