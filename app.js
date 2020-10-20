const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

function addEmployees() {
    console.log("Add a team member to the directory");

    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "Select the job title of the team member you wish to add to the directory",
            choices: ["Manager", "Engineer", "Intern", "I do not wish to add any more team members"]
        },
        {
            type: "input",
            name: "name",
            message: "Please enter the team member's full name",
            when: function(answers) {
                return answers.employeeType !== "I do not wish to add any more team members";
            }
        },
        {
            type: "input",
            name: "id",
            message: "Please enter the team member's ID",
            when: function(answers) {
                return answers.employeeType !== "I do not wish to add any more team members";
            }
        },
        {
            type: "input",
            name: "email",
            message: "Please enter the team member's e-mail address",
            when: function(answers) {
                return answers.employeeType !== "I do not wish to add any more team members";
            }
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            when: function(answers) {
                return answers.employeeType === "Manager";
            }
        },
        {
            type: "input",
            name: "gitHub",
            message: "What is the engineer's GitHub username?",
            when: function(answers) {
                return answers.employeeType === "Engineer";
            }
        },
        {
            type: "input",
            name: "school",
            message: "Where does the intern go to school?",
            when: function(answers) {
                return answers.employeeType === "Intern";
            }
        }
    ]).then(answers => {
        console.log(JSON.stringify(answers, null, ""));
        console.log(answers, null, "");
        console.log(JSON.stringify(answers.employeeType, null, ""));
    
        if (answers.employeeType === "Manager") {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            console.log(manager);
            employees.push(manager);
            addEmployees();
        }
        else if (answers.employeeType === "Engineer") {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.gitHub);
            console.log(engineer);
            employees.push(engineer);
            addEmployees();
        }
        else if (answers.employeeType === "Intern") {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            console.log(intern);
            employees.push(intern);
            addEmployees();
        }
        else if (answers.employeeType === "I do not wish to add any more team members") {
            console.log("Creating your directory...")
            generateHTML();
        }
    })

    function generateHTML() {
        console.log(employees);
        fs.writeFileSync(outputPath, render(employees), "utf8");
    }
}

addEmployees();
