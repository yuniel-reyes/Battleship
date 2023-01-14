import { Gameboard } from "./Gameboard";

function ComputerBoard(string) {
  // pick between horizontal and vertical
  function randomPosition() {
    const randomN = Math.trunc(Math.random() * 10);
    if (Boolean(randomN % 2)) {
      return "horizontal";
    } else {
      return "vertical";
    }
  }

  // generate random between 1 - 100
  function randomNumber() {
    const randomN = Math.trunc(Math.random() * 100);
    return randomN;
  }

  return Object.assign({ randomNumber, randomPosition }, Gameboard(string));
}

export { ComputerBoard };
