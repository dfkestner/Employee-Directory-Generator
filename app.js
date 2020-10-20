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
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
