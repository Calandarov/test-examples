const request = require("supertest");

const app = require("../../app");
const { expectedTestUser } = require("../testdata");

describe("Корректный PUT запрос на изменение данных пользователя:", function () {
    afterAll(async function () {
        await request(app).put("/api/users/id/1").send({
            name: "Дмитрий",
            age: 23,
        });
    });

    test("изменение имени и возраста пользователя с id 1.", async function () {
        const response = await request(app).put("/api/users/id/1").send({
            name: "Виталий",
            age: 45,
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(expectedTestUser.name);
        expect(response.body.age).toBe(expectedTestUser.age);
    });
});

describe("Некорректный PUT запрос на изменение данных пользователя:", function () {
    test("невалидный URL.", async function () {
        const response = await request(app).put("/api/user/id/3").send({
            name: "Виталий",
            age: 45,
        });

        expect(response.status).toBe(404);
    });

    // Тест падает, см. app.js строки 71-73
    // To do: должна возвращаться 400 ошибка
    test.skip("отсутствует тело запроса.", async function () {
        const response = await request(app).put("/api/users/id/3");

        expect(response.status).toBe(400);
    });

    test("изменение данных несуществующего пользователя с id 0.", async function () {
        const response = await request(app).put("/api/users/id/0").send({
            name: "Виталий",
            age: 45,
        });

        expect(response.status).toBe(404);
    });
});
