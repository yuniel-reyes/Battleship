import { Gameboard } from "../src/Gameboard.js";
import { Player } from "../src/Player.js";
// import { Computer } from "./computer.js";

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
test.skip("test player turn", () => {
  const player1 = new Player("player1");

  // the function will return true,
  // meaning the player just plated
  const attackFromPlayer1 = player1.attackOpponent(39);
  expect(attackFromPlayer1).toBe(true);
});

// player attacks
test.skip("test attack player1", () => {
  const player1 = new Player("player1");

  const attackFromPlayer1 = player1.attackOpponent(39);
  expect(attackFromPlayer1).toBe(true);
});
