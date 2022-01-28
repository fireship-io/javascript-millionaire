#!/usr/bin/env node

// /*
// /$$$$$$$$ /$$$$$$ / $$$$$$$ / $$$$$$$$ / $$$$$$ / $$ / $$ / $$$$$$ / $$$$$$$ / $$
// | $$_____/|_  $$_/| $$__  $$| $$_____/ /$$__  $$| $$  | $$|_  $$_/| $$__  $$|__/
// | $$        | $$  | $$  \ $$| $$      | $$  \__/| $$  | $$  | $$  | $$  \ $$ /$$  /$$$$$$
// | $$$$$     | $$  | $$$$$$$/| $$$$$   |  $$$$$$ | $$$$$$$$  | $$  | $$$$$$$/| $$ /$$__  $$
// | $$__/     | $$  | $$__  $$| $$__/    \____  $$| $$__  $$  | $$  | $$____/ | $$| $$  \ $$
// | $$        | $$  | $$  \ $$| $$       /$$  \ $$| $$  | $$  | $$  | $$      | $$| $$  | $$
// | $$       /$$$$$$| $$  | $$| $$$$$$$$|  $$$$$$/| $$  | $$ /$$$$$$| $$ /$$  | $$|  $$$$$$/
// |__/      |______/|__/  |__/|________/ \______/ |__/  |__/|______/|__/|__/  |__/ \______/
// */

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;
let playerScore = 0;
let totalScore = 5;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To Be A JavaScript Millionaire? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...

  `);
}

async function handleAnswer(isCorrect, successMsg) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    playerScore += 1;
    spinner.success({
      text: successMsg,
    });
    console.log(chalk.yellow(`  Score : ${playerScore} / ${totalScore} 🎉\n`));
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    console.log(
      chalk.bgRed(
        chalk.yellow(`You scored ${playerScore} out of ${totalScore}`)
      )
    );
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    mark: "aa",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(
      chalk.green(
        `Programming isn't about what you know; it's about making the command line look cool`
      )
    );
    process.exit(0);
  });
}

async function question1() {
  console.log(chalk.green(`\n Here we go. Question ${playerScore + 1} ->`));
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "JavaScript was created in 10 days then released on\n",
    choices: [
      "May 23rd, 1995",
      "Nov 24th, 1995",
      "Dec 4th, 1995",
      "Dec 17, 1996",
    ],
  });
  const successMsg = `Nice work ${playerName}. That's a legit answer.`;

  return handleAnswer(answers.question_1 === "Dec 4th, 1995", successMsg);
}

async function question2() {
  console.log(chalk.green(`\n Question ${playerScore + 1} ->`));
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: 'What is x? var x = 1_1 + "1" + Number(1)\n',
    choices: ["4", '"4"', '"1111"', "69420"],
  });
  const successMsg = `Good going ${playerName}! Let's hop on to the next one..`;

  return handleAnswer(answers.question_2 === '"1111"', successMsg);
}

async function question3() {
  console.log(chalk.green(`\n Question ${playerScore + 1} ->`));
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `What is the first element in the array? ['🐏', '🦙', '🐍'].length = 0\n`,
    choices: ["0", "🐏", "🐍", "undefined"],
  });
  const successMsg = `Someone call the fire department coz ${playerName} is on firee!!`;

  return handleAnswer(answers.question_3 === "undefined", successMsg);
}

async function question4() {
  console.log(chalk.green(`\n Question ${playerScore + 1} ->`));
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Which of the following is NOT a primitive type?\n",
    choices: [
      "boolean",
      "number",
      "null",
      "object", // Correct
    ],
  });
  const successMsg = `You're close ${playerName}. Just one left. 💪`;

  return handleAnswer(answers.question_4 === "object", successMsg);
}

async function question5() {
  console.log(chalk.green(`\n Question ${playerScore + 1} ->`));
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message:
      "JS is a high-level single-threaded, garbage-collected,\n" +
      "interpreted(or just-in-time compiled), prototype-based,\n" +
      "multi-paradigm, dynamic language with a ____ event loop\n",
    choices: ["multi-threaded", "non-blocking", "synchronous", "promise-based"],
  });
  const successMsg = `${playerName} becomes the Javascript Millionaire!!`;

  return handleAnswer(answers.question_5 === "non-blocking", successMsg);
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
