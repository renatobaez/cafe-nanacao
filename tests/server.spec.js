const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  //REQ 1.
  test("GET -> status 200 y trae un arreglo con al menos 1 elemento", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });
  //REQ 2.
  test("DELETE -> status 404 al eliminar ID inexistente", async()=>{
    const response = await request(server).delete("/cafes/IDnone").set("Authorization","token");
    expect(response.status).toBe(404);
  });
  //REQ 3.
  test("POST ->status 201 al agregar uno nuevo", async()=>{
    const response = await request(server).post("/cafes").send({id: 5, nombre: "Latte"});
    expect(response.status).toBe(201);
    expect(response.body.length).toBeGreaterThan(4);
  });
  //REQ 4.
  test("PUT -> status 400 al actualizar con ID en los parametros distinto al del payload", async()=>{
    const response = await request(server).put("/cafes/5").send({id: 100, nombre: "Espresso"});
    expect(response.status).toBe(400);
  });
});
