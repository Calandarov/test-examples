const request = require("supertest");

const app = require("../../app");
const { initialData } = require("../testdata");

describe("Корректный GET запрос всех пользователей:", function () {
    test("тело ответа содержит валидное кол-во пользователей.", async function () {
        const response = await request(app).get("/api/users");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(5);
    });

    test("тело ответа содержит массив со всеми пользователями.", async function () {
        const response = await request(app).get("/api/users");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(initialData);
    });
});

describe("Некорректный GET запрос всех пользователей:", function () {
    test("невалидный URL.", async function () {
        const response = await request(app).get("/api/user");

        expect(response.status).toBe(404);
    });
});
