const { By, Key } = require("selenium-webdriver");

const Base = require("./BaseClass");

class UserTable extends Base {
    async addUser(name, age) {
        await this.driver.findElement(By.name("name")).sendKeys(name);
        await this.driver.findElement(By.name("age")).sendKeys(age, Key.ENTER);
    }

    async editUser(name, age) {
        await this.driver.findElement(By.name("name")).clear();
        await this.driver.findElement(By.name("name")).sendKeys(name);

        await this.driver.findElement(By.name("age")).clear();
        await this.driver.findElement(By.name("age")).sendKeys(age, Key.ENTER);
    }

    async deleteUser(id) {
        await this.driver.findElement(By.css(`a[data-id="${id}"]:last-child`)).click();
    }

    async chooseUser(id) {
        await this.driver.findElement(By.css(`a[data-id="${id}"]:first-child`)).click();
    }

    async getAmountUsers() {
        let users = await this.driver.findElements(By.css("tr > td:first-child"));
        let receivedAmountUsers = [];

        for (let user of users) {
            receivedAmountUsers.push(await user.getText());
        }

        return receivedAmountUsers.length;
    }

    async getUserData(id) {
        let username = await this.driver.findElement(By.css(`tr[data-rowid="${id}"] > td:nth-child(2)`)).getText();
        let age = await this.driver.findElement(By.css(`tr[data-rowid="${id}"] > td:nth-child(3)`)).getText();
        let receivedUserData = {
            name: username,
            age: age,
        };

        return receivedUserData;
    }
}

module.exports = UserTable;
