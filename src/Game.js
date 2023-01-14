import { UI } from "./UI.js";
import { Player } from "./Player.js";
import { Computer } from "./Computer.js";
import { ComputerBoard } from "./ComputerBoard.js";

function Game() {
  const ui = UI();
  const player1 = new Player("player1");
  const computer = new Computer("computer-player");

  // render boards board
  ui.player1BoardWelcome();
  ui.renderComputerBoard();
  ui.checkIfShipsComputer();
}

export { Game };
