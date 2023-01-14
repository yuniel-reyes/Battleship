# Battleship App

================

## App Description

- App opens up, both boards are shown.
- A text indicate the player that ships should be place
- After all ships of player are placed, rotate button is removed
- Ships of computer are placed
- Game starts:
  Attack player
  When player is atacking: You are attacking
  When player is being attacked: You are being attack
  If player hit, player continues attacking
  When computer is attacking: Computer is attacking
  When computer is being attacked: Computer is being attacked
  If computer hit, player continues attacking

## I. Isolate functionality from DOM manipulation

1.  You can use mocks to make sure DOM methods are being called

## II. Create UI (test for UI) | DOM Module (DOM Tests)

## III. Create Ship factory function / test

1. Your ‘ships’ will be objects that include their length,
   the number of times they’ve been hit and whether or not
   they’ve been sunk.
2. `REMEMBER` you only have to test your object’s public
   interface. Only methods or properties that are used outside
   of your ship object need unit tests.
3. Ships should have a `hit()` function that increases the number of
   hits in your ship. `isSunk()` should be a function that
   calculates if the the ship is sunk based on their length
   and the number of hits.

## IV. Create Gameboard factory

1. Gameboards should be able to place ships at specific
   coordinates by calling the ship factory function.
   You have two objections:
   a) Create a method that create every needed ship and put them inside an array. This method will not take coord.
   b) TOP's recomendation: create a several set of functions
   that check ship rotation, length... If all ok, then
   call `placeShip`

   Boards will be considered as a 10x10 grid, going
   from 1 to 100.

1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
91, 92, 93, 94, 95, 96, 97, 98, 99, 100

2. - 'Player-welcome-board' will have a rotate
     button that allows to change the ship rotation
     (vertical-horizontal).
   - When clicked, the cells to be colored (i.d. ship
     to be placed) change its rotation.
   - If ships gets to be placed, the `placeShips`
     function will asks for the rotation arg,
     which will be the class of this button.

3. - Every cell of the 'Player-welcome-board' will
     have an event listener with a callback. That
     function will do some thing before passing all
     required arguments to `placeship()`. Lets call it
     `checkFit()`. `checkFit()` will have to:
     a) check horizontal(H) or vertical(V)
     b) run H or V
     Each of these two function will have to check somehow
     if the cells are availables, i.e. enough and
     not ocupied. Every time the user hover over a cell
     of (B1), the callb should check if there are enough
     cells according to the ship's size and its
     rotation parameter:

   - If H: `checkFitHorizontal()`
     - get ship size
     - get cell number
     - get closer increasing-mult: closer mult of 10
       increasing every time by 1 from the cell number
     - get number of cell from selected cell up to
       closer increasing mult
     - if above number >= ship's size:
       call `coloringGrid()`:
       - color the current cell
       - color the other cells: cell number + ship length
       - if user doesn't click, add event listener for mouseleaver and remove coloring
       - if user click, cells should remain colored;
         event listener for mouseleaver should not be add
     - if not, can't place ship
   - If V: `checkFitVertical()`

     Let's take a closer look:

- Ex.1: Ship size 3, hover 9, horizontal rotation:
  The function should check if it's possible
  to place ship in 9 - 10 - 11.
  It would get the number of the current grid: 9
  The function should not allow that, as that
  grid-line ends in 10.
- Ex.2: Ship size 3, hover 9, vertical rotation:
  When placing a ship with vertical rotation,
  the function should take the hovering grid(9), and
  checks down to the corresponding numbers considering
  that every line is a sequence up to 10x, starting
  with 0 and ending with 99. To do that, the function
  could add 10 every time, according to the ship
  size. So as 9 is in the first line
  (1 2 3 4 5 6 7 8 9 10), the ship can be
  place there: 9
  19
  29
  Ex.3: Ship size 3, hover 12, horizontal rotation:
  Ship will be place over 12 - 13 -14
  Ex.4: Ship size 3, hover 34, vertical rotation:
  Ship will be place over 14
  24
  34

4. Create logic to place computer ships

- Algorithm:
  - pick between horizontal or vertical
  - generate a random number between 1 and 100
    -run `checkFitComputer()`. It will take the
    string returned by `obj.randomPosition()` and
    the obj. It will check if there are ships to place,
    and then run `checkFitComputerHoritzontal()` or
    `checkFitComputerVertical()`
  - `checkFitComputerHoritzontal()`: similar to the
    one of player, with some changes. It will call
    `selecThisCellsComputerHorizontal()`
  - `selecThisCellsComputerHorizontal()` will:
    call `noShipsCheckComputerHorizontal()`.
    call `selectedCellsComputerHorizontal()`
    call `placeShip()`

## V. Create Player / Player tests

1. Players can take turns playing the game by
   attacking the enemy Gameboard.

2. The game is played against the computer, so make
   ‘computer’ players capable of making random plays.
   The AI does not have to be smart, but it should know
   whether or not a given move is legal. (i.e. it
   shouldn’t shoot the same coordinate twice).

## VI. Create Game Loop

1. Start creating the UI (see UI)
2. Game loop should set up:

- New game by creating Players and Gameboards

3. Create methods to:
   - render gameboards
   - take user attacking
4. Game loop should step through the game turn by turn
   using only methods from other objects. If at any point
   you are tempted to write a new function inside the game
   loop, step back and figure out which class or module
   that function should belong to

**Questions**:

1. Where to place test files in a node(js) project?

   https://medium.com/@jeff_long/organizing-tests-in-jest-17fc431ff850

2. How to ignore test files?
3. IIFE as part of the constructor in class?
4. IIFE as clas method?
5. How tot test factory function
6. Can you use an event object to add another event listener
   if a particular events happens? Answer: use composedPath()

**Discoveries**:

1. Don’t compare arrays with ==....
2. composedPath()
3. signal propertty as part of the possible option
4. stopImmediatePropagation

**Bottlenecks**
