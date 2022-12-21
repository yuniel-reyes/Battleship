import { Player } from "./Player.js";
// import { Gameboard } from "./gameboard";

class Computer extends Player {
  // create a function that pick up a coordinate
  // from the Gameboard coordinate as long
  // as that number was not already picked up
  // override the playerAttack
  playerAttack(shootsAndTheOppenent) {
    for (const eachCoord of shootsAndTheOppenent) {
      let randonNum = Math.trunc(Math.random() * 100);
      if (randonNum !== eachCoord) return randonNum;
    }
  }
}

export { Computer };
