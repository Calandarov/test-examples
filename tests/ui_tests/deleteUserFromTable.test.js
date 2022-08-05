const assert = require("assert");

const UserTable = require("../classes/UserTableClass");

describe("Удаление пользователя:", function () {
    let browser;
    let url = "http://localhost:3000/";

    beforeEach(function () {
        browser = new UserTable();
    });

    afterEach(function () {
        browser.closePage();
    });

    test("удаление пользователя с id 1.", async function () {
        await browser.openPage(url);
        await browser.deleteUser(1);
        await browser.refreshPage();

        let receivedAmountUsers = await browser.getAmountUsers();

        assert.equal(receivedAmountUsers, 4);
    });
});
