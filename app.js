const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();
const filepath = "users.json";

app.use(express.static(__dirname + "/public")); // Получение списка данных

app.get("/api/users", function (req, res) {
    const data = fs.readFileSync(filepath, "utf-8");
    const users = JSON.parse(data);
    res.send(users);
});

app.get("/api/users/id/:id", function (req, res) {
    const id = req.params.id;
    const data = fs.readFileSync(filepath, "utf-8");
    const users = JSON.parse(data);
    let user;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }

    if (user) {
        res.send(user);
    } else {
        res.status(404).send();
    }
});

app.post("/api/users", jsonParser, function (req, res) {
    // Проверка не срабатывает, необходимо переделать
    if (!req.body) {
        return res.status(400).send();
    }

    const userName = req.body.name;
    const userAge = req.body.age;
    let user = {
        name: userName,
        age: userAge,
    };

    let data = fs.readFileSync(filepath, "utf-8");
    let users = JSON.parse(data);

    const id = Math.max.apply(
        Math,
        users.map(function (element) {
            return element.id;
        })
    );

    user.id = id + 1;
    users.push(user);

    data = JSON.stringify(users);
    fs.writeFileSync(filepath, data);
    res.send(user);
});

app.put("/api/users/id/:id", jsonParser, function (req, res) {
    // Проверка не срабатывает, необходимо переделать
    if (!req.body) {
        return res.status(400).send();
    }

    const id = req.params.id;
    const userName = req.body.name;
    const userAge = req.body.age;

    let data = fs.readFileSync(filepath, "utf-8");
    const users = JSON.parse(data);
    let user;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            user = users[i];
            break;
        }
    }

    if (user) {
        user.name = userName;
        user.age = userAge;
        data = JSON.stringify(users);
        fs.writeFileSync(filepath, data);
        res.send(user);
    } else {
        res.status(404).send();
    }
});

app.delete("/api/users/id/:id", function (req, res) {
    const id = req.params.id;
    let data = fs.readFileSync(filepath, "utf-8");
    let users = JSON.parse(data);
    let index = -1;

    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            index = i;
            break;
        }
    }

    if (index > -1) {
        const user = users.splice(index, 1);

        data = JSON.stringify(users);
        fs.writeFileSync(filepath, data);
        res.send(user);
    } else {
        res.status(404).send();
    }
});

module.exports = app;
