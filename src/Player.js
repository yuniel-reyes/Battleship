import { Gameboard } from "./gameboard.js";

/* 

1. Players can take turns playing the game by
attacking the enemy Gameboard.

2. The game is played against the computer, 
so make ‘computer’ players capable of making 
random plays. The AI does not have to be smart, 
but it should know whether or not a given move
is legal. (i.e. it shouldn’t shoot the same 
coordinate twice).
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
