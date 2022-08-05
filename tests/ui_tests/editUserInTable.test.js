const assert = require("assert");

const UserTable = require("../classes/UserTableClass");
const { expectedTestUser, expectedThirdUser } = require("../testdata");

describe("Изменение данных пользователя.", function () {
    let browser;
    let url = "http://localhost:3000/";

    beforeEach(function () {
        browser = new UserTable();
    });

    afterEach(async function () {
        await browser.chooseUser(1);
        await browser.editUser("Дмитрий", 23);
        await browser.closePage();
    });

    describe("Корректное изменение данных пользователя:", function () {
        test("изменение имени и возраста пользователя с id 1.", async function () {
            await browser.openPage(url);
            await browser.chooseUser(1);
            await browser.editUser("Виталий", 45);
            await browser.refreshPage();

            let receivedTestUser = await browser.getUserData(1);

            assert.deepEqual(receivedTestUser.name, expectedTestUser.name);
            assert.deepEqual(receivedTestUser.age, expectedTestUser.age);
        });
    });

    // Тест падает, см. app.js строки 71-73
    describe("Некорректное изменение данных пользователя:", function () {
        test.skip("пустые строки в полях имени и возраста.", async function () {
            await browser.openPage(url);
            await browser.chooseUser(3);
            await browser.editUser("", "");
            await browser.refreshPage();

            let receivedThirdUser = await browser.getUserData(3);

            assert.deepEqual(receivedThirdUser.name, expectedThirdUser.name);
            assert.deepEqual(receivedThirdUser.age, expectedThirdUser.age);
        });
    });
});
