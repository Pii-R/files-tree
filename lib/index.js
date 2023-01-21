"use strict";
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
const person = new Person("Pierre", 12);
console.log(person);
function isMajor(person) {
    return person.age >= 18;
}
console.log(isMajor(person));
//# sourceMappingURL=index.js.map