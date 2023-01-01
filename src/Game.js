import { UI } from "./UI.js";
import { Player } from "./Player.js";
import { Computer } from "./Computer.js";

function Game() {
  const ui = UI();
  const player1 = new Player("player1");
  const computer = new Computer("computer-player");

  // render welcome board
  ui.player1BoardWelcome();
}

export { Game };
