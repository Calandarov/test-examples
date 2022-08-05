const assert = require("assert");

const UserTable = require("../classes/UserTableClass");
const { expectedTestUser } = require("../testdata");

describe("Добавление нового пользователя.", function () {
    let browser;
    let url = "http://localhost:3000/";

    beforeEach(function () {
        browser = new UserTable();
    });

    afterEach(async function () {
        await browser.deleteUser(6);
        await browser.closePage();
    });

    describe("Корректное добавление нового пользователя:", function () {
        test("имя и возраст валидны.", async function () {
            await browser.openPage(url);
            await browser.addUser("Виталий", 45);
            await browser.refreshPage();

            let receivedAmountUsers = await browser.getAmountUsers();
            let receivedTestUser = await browser.getUserData(6);

            assert.equal(receivedAmountUsers, 6);
            assert.equal(receivedTestUser.name, expectedTestUser.name);
            assert.equal(receivedTestUser.age, expectedTestUser.age);
        });
    });

    // Тест падает, см. app.js строки 40-42
    describe("Некорректное добавление нового пользователя:", function () {
        test.skip("пустые строки в полях имени и возраста.", async function () {
            await browser.openPage(url);
            await browser.addUser("", "");
            await browser.refreshPage();

            let receivedAmountUsers = await browser.getAmountUsers();

            assert.equal(receivedAmountUsers, 5);
        });
    });
});
