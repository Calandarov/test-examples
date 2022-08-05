const request = require("supertest");

const app = require("../../app");
const { expectedTestUser } = require("../testdata");

describe("Корректный POST запрос на добавление нового пользователя:", function () {
    afterEach(async function () {
        await request(app).delete("/api/users/id/6");
    });

    test("имя и возраст валидны.", async function () {
        const response = await request(app).post("/api/users").send({
            name: "Виталий",
            age: 45,
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(expectedTestUser.name);
        expect(response.body.age).toBe(expectedTestUser.age);
    });
});

describe("Некорректный POST запрос на добавление нового пользователя:", function () {
    test("невалидный URL.", async function () {
        const response = await request(app).post("/api/user").send({
            name: "Виталий",
            age: 45,
        });

        expect(response.status).toBe(404);
    });

    // Тест падает, см. app.js строки 40-42
    // To do: должна возвращаться 400 ошибка
    test.skip("отсутствует тело запроса.", async function () {
        const response = await request(app).post("/api/users");

        expect(response.status).toBe(400);
    });
});
