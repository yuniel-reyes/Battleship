import { Gameboard } from "./gameboard.js";
import { Player } from "./Player.js";
import { Computer } from "./Computer.js";
import { UI } from "./UI.js";

class Game {
  constructor() {
    this.ui = new UI();
    this.player1 = new Player();
    this.computer = new Computer();
    this.player1Board = new Gameboard("player1");
    this.computerBoard = new Gameboard("computer");
  }
}

export { Game };
