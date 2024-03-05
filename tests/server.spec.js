const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  test("REQ 1. devuelve status 200 y arreglo al menos 1 elemento", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
  test("REQ 2. devuelve status 404 al eliminar ID inexistente", async()=>{
    const response = await request(server).delete("/cafes/IDnone").set("Authorization","token");
    expect(response.status).toBe(404);
  });
  test("REQ 3. devuelve status 201 al agregar un nuevo cafe", async()=>{
    const response = await request(server).post("/cafes").send({id: 5, nombre: "Latte"});
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(4);
  });
});
