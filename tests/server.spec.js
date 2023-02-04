const request = require("supertest");
const server = require("../index");
const cafes = [{
    "id": 5,
    "nombre": "Cortado"
}]
describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200", async () => {
        const response = await request(server).get("/cafes").send(cafes);
        const status = response.statusCode;
        expect(status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });
    it("Obteniendo un 404", async () => {
        const response = await request(server).get("/cafe").send(cafes);
        const status = response.statusCode;
        expect(status).toBe(404);
    });
    it("Obteniendo un 404", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = 4
        const { body: productos } = await request(server)
            .delete(`/cafes/${idDeProductoAEliminar}`)
            .set("Authorization", jwt)
            .send();
        const ids = productos.map(p => p.id)
        expect(ids).not.toContain(idDeProductoAEliminar);
    });

    it("Obteniendo un 201", async () => {
        
        const response= await request(server).post("/cafes").send(cafes);
        const status = response.statusCode;
        expect(status).toBe(201);
    });
    it("Obteniendo un 400", async () => {
        const param = 1 
        const response= await request(server).put(`/cafes/${param}`).send(cafes);
        const status = response.statusCode;
        expect(status).toBe(400);
    });
});
