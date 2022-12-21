import { Computer } from "../src/Computer.js";
import { Gameboard } from "../src/gameboard.js";

/* The game is played against the computer, 
so make ‘computer’ players capable of making 
random plays. The AI does not have to be smart, 
but it should know whether or not a given move
is legal. (i.e. it shouldn’t shoot the same 
coordinate twice).

  // create a function that pick up a coordinate
  // from the Gameboard coordinate as long
  // as that number was not already picked up*/

test("computer plays random number 0 - 99", () => {
  const computer = new Computer();
  const player1Board = new Gameboard("player1");
  player1Board.allShoots = [67, 13, 56, 78];

  const attackNumber = computer.playerAttack(player1Board.allShoots);
  // number not in messedAttacks
  expect(Number(attackNumber)).toBeGreaterThan(0);
  expect(Number(attackNumber)).toBeLessThan(99);
});
