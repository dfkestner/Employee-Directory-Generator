// Code to define Manager class as a child of the Employee class
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // calls super class constructor and passes in parameters from Employee class
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return this.employeeType;
    }
}

// Exports Manager class
module.exports = Manager;