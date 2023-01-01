import { Gameboard } from "./Gameboard.js";

/* 

1. Players can take turns playing the game by
attacking the enemy Gameboard.
*/

class Player {
  constructor(player) {
    this.player = player;
  }

  attackOpponent(coord) {
    return true;
  }
}

export { Player };
