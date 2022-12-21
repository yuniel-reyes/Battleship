# Battleship App

================
I. Isolate functionality from DOM manipulation

1.  You can use mocks to make sure DOM methods are being called

II. Create test for UI / create UI

III. Create Ship test / factory function

1. Your ‘ships’ will be objects that include their length, the number
   of times they’ve been hit and whether or not they’ve been sunk.
2. `REMEMBER` you only have to test your object’s public interface.
   Only methods or properties that are used outside of your ‘ship’
   object need unit tests.
3. Ships should have a `hit()` function that increases the number of
   ‘hits’ in your ship. `isSunk()` should be a function that
   calculates it based on their length and the number of ‘hits’.

IV. Create Gameboard factory

1. Gameboards should be able to place ships at specific coordinates
   by calling the ship factory function.
   If we consider the board as a multidimensional matrix,
   given the rows a set of number from 0 to n-1, the
   columns a set of numbers from 0 to n-1, a ship's
   coordinates will depend on the a) ship rotation factor,
   and b) on the ship's length
   Some example coordinates could be:
   x = <-->
   y = ^|
   cruiser (horizontal rotation, length 3)
   Submarine (vertical rotation, length 3)

0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  
10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
90, 91, 92, 93, 94, 95, 96, 97, 98, 99
cruiser: [32, 33, 34]
Submarine: [66, 67, 68]

V. Create Player / player tests

1. Players can take turns playing the game by
   attacking the enemy Gameboard.

2. The game is played against the computer, so make
   ‘computer’ players capable of making random plays.
   The AI does not have to be smart, but it should know
   whether or not a given move is legal. (i.e. it
   shouldn’t shoot the same coordinate twice).

VI. Create Game Loop / Game Loop tests

**Questions**:

1. Where to place test files in a node(js) project?
   https://medium.com/@jeff_long/organizing-tests-in-jest-17fc431ff850
2. How to ignore test files?

**Discoveries**:

1. Don’t compare arrays with ==....
