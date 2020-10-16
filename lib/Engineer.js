// Code to define the Engineer class as a child of the Employee class
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, gitHub) {
        // Passes parameters from parent class
        super(name, id, email);
        this.gitHub = gitHub;
    }

    getGitHub() {
        return this.gitHub;
    }

    getRole() {
        return "Engineer";
    }
}

// Code to export Engineer class
module.exports = Engineer