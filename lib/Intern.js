// Code to define Intern class as a child of the Employee class
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        // calls super class constructor and passes in parameters from Employee class
        super(name, id, email);
        this.school = school;
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}

// Exports Intern class
module.exports = Intern;