const initialData = [
    {
        name: "Дмитрий",
        age: 23,
        id: 1,
    },
    {
        name: "Кирилл",
        age: 22,
        id: 2,
    },
    {
        name: "Вадим",
        age: 22,
        id: 3,
    },
    {
        name: "Денис",
        age: 23,
        id: 4,
    },
    {
        name: "Антон",
        age: 22,
        id: 5,
    },
];

const expectedFirstUser = {
    name: "Дмитрий",
    age: 23,
    id: 1,
};

const expectedThirdUser = {
    name: "Вадим",
    age: 22,
    id: 3,
};

const expectedTestUser = {
    name: "Виталий",
    age: 45,
    id: 6,
};

const expectedDeletedFirstUser = [
    {
        name: "Дмитрий",
        age: 23,
        id: 1,
    },
];

module.exports = {
    initialData,
    expectedFirstUser,
    expectedThirdUser,
    expectedTestUser,
    expectedDeletedFirstUser,
};
