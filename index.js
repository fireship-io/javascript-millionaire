// Who Wants To Be A JavaScript Millionaire?
const inquirer = require("inquirer");
const gradient = require("gradient-string");
const chalkAnimation = require("chalk-animation");
const figlet = require("figlet");

// const { createSpinner } = require("nanospinner");
// const spinner = createSpinner("Checking answer...");

let playerName;

const showTitle = async () => {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To Be A JavaScript Millionaire?",
  );

  setTimeout(() => {
    rainbowTitle.stop(); // Stop after 5 seconds
  }, 5000); // Change back to 5000

  return;
};

const askName = async () => {
  await inquirer
    .prompt({
      name: "player_name",
      type: "input", // Input by default, no need to add this
      message: "What is your name?",
      default() {
        return "Player";
      },
    })
    .then((answers) => {
      playerName = answers.player_name;
    });
};

const wrongAnswer = () => {
  console.clear();
  console.log(gradient.fruit.multiline("\nYou Lose.\n"));
  process.exit(1);
};

const showResult = () => {
  console.clear();
  figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    if (err) {
      console.dir(err);
      return;
    }
    console.log(gradient.pastel.multiline(data) + "\n");
    process.exit(1);
  });
};

const question1 = async () => {
  await inquirer
    .prompt({
      name: "question_1",
      type: "list",
      message: "JavaScript was created in 10 days then released on\n",
      choices: [
        "May 23rd, 1995",
        "Nov 24th, 1995",
        "Dec 4th, 1995", // Correct
        "Dec 17, 1996",
      ],
    })
    .then((answers) => {
      if (answers.question_1 === "Dec 4th, 1995") {
        return;
      } else {
        wrongAnswer();
      }
    });
};

const question2 = async () => {
  await inquirer
    .prompt({
      name: "question_2",
      type: "list",
      message: "What was JavaScript initially called?\n",
      choices: [
        "Mocha", // Correct
        "CoffeeScript",
        "ESScript",
        "ActionScript",
      ],
    })
    .then((answers) => {
      if (answers.question_2 === "Mocha") {
        return;
      } else {
        wrongAnswer();
      }
    });
};

const question3 = async () => {
  await inquirer
    .prompt({
      name: "question_3",
      type: "list",
      message: "This variable keyword is NOT block scoped\n",
      choices: [
        "const",
        "var", // Correct
        "let",
        "num",
      ],
    })
    .then((answers) => {
      if (answers.question_3 === "var") {
        return;
      } else {
        wrongAnswer();
      }
    });
};

const question4 = async () => {
  await inquirer
    .prompt({
      name: "question_4",
      type: "list",
      message: "Which of the following is NOT a primitive type?\n",
      choices: [
        "boolean",
        "number",
        "null",
        "object", // Correct
      ],
    })
    .then((answers) => {
      if (answers.question_4 === "object") {
        return;
      } else {
        wrongAnswer();
      }
    });
};

const question5 = async () => {
  await inquirer
    .prompt({
      name: "question_5",
      type: "list",
      message:
        "JS is a high-level single-threaded, garbage-collected,\n" +
        "interpreted(or just-in-time compiled), prototype-based,\n" +
        "multi-paradigm, dynamic language with a ____ event loop\n",
      choices: [
        "blocking",
        "non-blocking", // Correct
        "asynchronous",
        "promise-based",
      ],
    })
    .then((answers) => {
      if (answers.question_5 === "non-blocking") {
        showResult();
      } else {
        wrongAnswer();
      }
    });
};

const playGame = async () => {
  console.clear();
  await showTitle();

  askName()
    .then(() => question1())
    .then(() => question2())
    .then(() => question3())
    .then(() => question4())
    .then(() => question5());
};

playGame();
