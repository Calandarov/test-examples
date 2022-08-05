const request = require("supertest");

const app = require("../../app");
const { expectedFirstUser } = require("../testdata");

describe("Корректный GET запрос определенного пользователя:", function () {
    test("запрос пользователя с id 1.", async function () {
        const response = await request(app).get("/api/users/id/1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedFirstUser);
    });
});

describe("Некорректный GET запрос определенного пользователя по id:", function () {
    test("невалидный URL.", async function () {
        const response = await request(app).get("/api/user/id/3");

        expect(response.status).toBe(404);
    });

    test("запрос несуществующего пользователя с id 0.", async function () {
        const response = await request(app).get("/api/users/id/0");

        expect(response.status).toBe(404);
    });
});
