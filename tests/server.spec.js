import request from "supertest";
import server from "../index.js";

describe("Operaciones CRUD de cafes", () => {
    // Requerimiento 01
    it("Obteniendo respuesta de GET /cafes un 200 OK + Tipo dato + Lenght > 1", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(typeof response.body[0]).toBe('object');
    });

    // Requerimiento 03
    it("Agregar nuevo Café /cafes un 201 OK ", async () => {
        const response = await request(server).post("/cafes").send();
        const id = Math.floor(Math.random() * 999); 
        const cafe = { id, nombre: "Expresso" };
        const { body: cafes } = await request(server)
            .post("/cafes")
            .send(cafe);
        const status = response.statusCode;    
        expect(status).toBe(201);
        expect(cafes).toContainEqual(cafe);
    });

    // Requerimiento 02
    it("Eliminar café inexistente /cafes un 404 OK ", async () => {
        const response = await request(server)
        .delete('/cafes/8')
        .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiSmF2aWVyIiwiZW1haWwiOiJqYXZpZXJAbGZpLmNsZSIsImlhdCI6MTUxNjIzOTAyMn0.Bbxkk4EOqz722gUrNEA4D89_Urwt8ym_QDrUfJ1fgqE`);
      expect(response.statusCode).toBe(404);
    });

    // Requerimiento 04
    it("Actualizar con id distinto a payload", async () => {
        const cafeId = '2';
        const datosCafe = {
          id: '69', 
          nombre: 'Gringo'
        };
        const response = await request(server)
          .put(`/cafes/${cafeId}`)
          .send(datosCafe);
        expect(response.statusCode).toBe(400);
    });
});
