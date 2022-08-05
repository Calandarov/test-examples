const request = require("supertest");

const app = require("../../app");
const { expectedDeletedFirstUser } = require("../testData");

describe("Корректный DELETE запрос на удаление пользователя:", function () {
    test("удаление пользователя с id 1.", async function () {
        const response = await request(app).delete("/api/users/id/1");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedDeletedFirstUser);
    });
});

describe("Некорректный DELETE запрос на удаление пользователя:", function () {
    test("невалидный URL.", async function () {
        const response = await request(app).delete("/api/user/id/3");

        expect(response.status).toBe(404);
    });

    test("удаление несуществующего пользователя с id 0.", async function () {
        const response = await request(app).delete("/api/users/id/0");

        expect(response.status).toBe(404);
    });
});
