import { Gameboard } from "./gameboard.js.js";

/* 
1. Gameboard should be able to place ships at specific 
  coordinates by calling the ship factory function.

  a) Each Ship instance will be created with a set of 
  coordinates and a rotation property.
  Then it will be placed inside the Gameboard.
  So, the test should first check if there is a 
  ship inside the Ship object of the Gameboad class.
  If true, it should check the given properties according
  with the size of the ship
 */

test.skip("place ships by calling Ship", () => {
  const playerBoard = new Gameboard("player1");
  player.placeShips("cruiser", 3, "horizontal", [32, 33, 34]);

  expect(playerBoard.ships[0].shipType).toBe("cruiser");
});

/* Gameboards should have a receiveAttack() 
function that takes a pair of coordinates and, 
determines whether or not the attack hit a ship:
TODO:
If hitted:
 - receiveAttack() call the ‘hit’ function on 
the hitted ship 
If not hitted:
 - it should records the coordinates of the missed shot. */

// test that ship was hitted
test.skip("test for attack true", () => {
  const playerBoard = new Gameboard("player1");
  player.placeShips("cruiser", 3, "horizontal", [32, 33, 34]);

  // This should return the times_hit+1
  const shipWasHitted = playerBoard.receiveAttack(32);
  expect(shipWasHitted).toBe(true);
});

test.skip("test for attack false", () => {
  const playerBoard = new Gameboard("player1");
  player.placeShips("cruiser", 3, "horizontal", [32, 33, 34]);

  const shipWasHitted = playerBoard.receiveAttack(70);
  expect(shipWasHitted).toBe(false);
});

// Gameboards should be able to report whether or
// not all of their ships have been sunk.
test("test if all ships are sunk:true", () => {
  const playerBoard = new Gameboard("player1");
  playerBoard.placeShips("cruiser", 3, "horizontal", [32, 33, 34]);

  playerBoard.receiveAttack(32);
  playerBoard.receiveAttack(33);
  playerBoard.receiveAttack(34);
  const allShipsSunk = playerBoard.allSunk();
  expect(allShipsSunk).toBe(true);
});
