import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("Get to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  //console.log(responseBody);

  /*expect(process.env.NODE_ENV).toBe("test");
  console.log(process.env.NODE_ENV);*/

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

test("Verifica se as credenciais do banco foram atribuidas para o ambiente de test", () => {
  const dbCredentials = [
    process.env.POSTGRES_HOST,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    process.env.POSTGRES_DB,
  ];

  dbCredentials.forEach((credential) => {
    expect(credential).toBeDefined();
  });
});
