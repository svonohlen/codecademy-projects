const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor() {
    this._field = [];
    this._playerPosX = 0;
    this._playerPosY = 0;
  }

  getRandomFieldValue(holesPercentage) {}

  generateField(height, width, holesPercentage) {
    for (let i = 0; i < height; i++) {
      this._field[i] = []; //create an empty array to write in
      for (let j = 0; j < width; j++) {
        this.field[i][j] = fieldCharacter;
      }
    }
    const countOfHolesRequired = Math.floor(
      (height * width * holesPercentage) / 100
    );
    console.log("available positions: " + height * width);
    console.log("holes that will be generated: " + countOfHolesRequired);

    //one position for path and one for hat must be available
    if (countOfHolesRequired > height * width - 2) {
      throw "Holes percentage parameter too big to ensure we have the player and a hat on the field as well.";
    }
    this.setFieldContent(0, 0, pathCharacter);

    let x = Math.floor(Math.random() * width);
    let y = Math.floor(Math.random() * height);
    while (x === 0 && y === 0) {
      x = Math.floor(Math.random() * width);
      y = Math.floor(Math.random() * height);
    }
    this.setFieldContent(x, y, hat);

    for (let i = 0; i < countOfHolesRequired; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      const fieldContent = this.getFieldContent(x, y);
      if (
        fieldContent != hat &&
        fieldContent != pathCharacter &&
        fieldContent != hole
      ) {
        this.setFieldContent(x, y, hole);
      } else {
        i--;
      }
    }
  }

  get field() {
    return this._field;
  }

  get playerPosX() {
    return this._playerPosX;
    M;
  }

  set playerPosX(pos) {
    this._playerPosX = pos;
  }

  get playerPosY() {
    return this._playerPosY;
    M;
  }

  set playerPosY(pos) {
    this._playerPosY = pos;
  }


  getFieldContent(horizontalAxis, verticalAxis) {
    if (verticalAxis < 0 || verticalAxis >= this._field.length) {
      return undefined;
    }
    if (
      horizontalAxis < 0 ||
      horizontalAxis >= this._field[verticalAxis].length
    ) {
      return undefined;
    }

    return this._field[verticalAxis][horizontalAxis];
  }

  setFieldContent(horizontalAxis, verticalAxis, content) {
    this._field[verticalAxis][horizontalAxis] = content;
  }

  print() {
    for (var i = 0; i < this._field.length; i++) {
      console.log(this._field[i].join(""));
    }
  }
}

function checkResult(myField, move) {
  let targetFieldContent;
  switch (move) {
    case "d":
      targetFieldContent = myField.getFieldContent(
        myField.playerPosX,
        myField.playerPosY + 1
      );
      break;
    case "u":
      targetFieldContent = myField.getFieldContent(
        myField.playerPosX,
        myField.playerPosY - 1
      );
      break;
    case "r":
      targetFieldContent = myField.getFieldContent(
        myField.playerPosX + 1,
        myField.playerPosY
      );
      break;
    case "l":
      targetFieldContent = myField.getFieldContent(
        myField.playerPosX - 1,
        myField.playerPosY
      );
      break;
    default:
      console.log("Please input what you were asked for, e. g. PENIS");
      return "field";
      break;
  }

  if (targetFieldContent === hole) {
    return "hole";
  } else if (targetFieldContent === hat) {
    return "hat";
  } else if (targetFieldContent === fieldCharacter) {
    return "field";
  } else if (targetFieldContent === undefined) {
    return "outside";
  }
}

function movePlayer(direction, field) {
  if (direction === "d") {
    field.playerPosY += 1;
  } else if (direction === "u") {
    field.playerPosY -= 1;
  } else if (direction === "r") {
    field.playerPosX += 1;
  } else if (direction === "l") {
    field.playerPosX -= 1;
  } else {
    console.log("Invalid input! must be d,u,r or l");
  }

  field.setFieldContent(field.playerPosX, field.playerPosY, pathCharacter);
}

function runGame() {
  let gameWon = false;
  let gameLost = false;

  const myField = new Field();
  myField.generateField(10, 10, 45);

  while (!gameWon && !gameLost) {
    myField.print();
    // Get user input
    let userInput = prompt("Choose where to go (valid choices: d, u, l, r): ");
    const moveResult = checkResult(myField, userInput);
    switch (moveResult) {
      case "hole":
        console.log("you stepped into a hole! try again");
        gameLost = true;
        break;

      case "hat":
        console.log("you found the hat wohoooooo");
        gameWon = true;
        break;

      case "field":
        movePlayer(userInput, myField);
        break;

      case "outside":
        console.log("you moved outside the field! try again");
        gameLost = true;
        break;

      default:
        console.log("ERROR. UNDEFINED STATE.");
    }
  }
}

while (true) {
  console.log("new game started...");
  runGame();
}
