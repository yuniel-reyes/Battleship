import { Ship } from "../src/Ship.js";

test("test objects", () => {
  const newObj = new Ship(3);
  expect(newObj.shipType).toBe(3);
  expect(newObj.times_hit).toBe(0);
  expect(newObj.sunk).toBe(false);
});

test("test hit method", () => {
  const newObj = new Ship("cruiser", 3, "horizontal", [
    [1, 4],
    [2, 4],
    [3, 4],
  ]);
  newObj.hit();

  expect(newObj.times_hit).toBe(1);
});

test("test isSunk method", () => {
  const newObj = new Ship("cruiser", 3, "horizontal", [
    [1, 4],
    [2, 4],
    [3, 4],
  ]);
  newObj["times_hit"] = 3;
  newObj.isSunk();

  expect(newObj.sunk).toBe(true);
});
