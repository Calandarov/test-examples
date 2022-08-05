const { Builder } = require("selenium-webdriver");

class Base {
    constructor() {
        this.driver = new Builder().forBrowser("chrome").build();
    }

    async openPage(url) {
        await this.driver.get(url);
    }

    async refreshPage() {
        await this.driver.navigate().refresh();
    }

    async closePage() {
        await this.driver.quit();
    }
}

module.exports = Base;
