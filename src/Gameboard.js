// import { Game } from "./Game.js";
import { Ship } from "./Ship.js";
// import { UI } from "./UI.js";

function Gameboard(playerName) {
  const player = playerName;
  const defaultCoordinates = [];
  const PlacedShips = [];
  const missedCoord = [];
  const allShoots = [];
  const shipsToPlaceObj = [
    { Carrier: 5 },
    { Battleship: 4 },
    { Cruiser: 3 },
    { Submarine: 3 },
    { Destroyer: 2 },
  ];

  // IFEE to populate each cell with a number from 1 to 100
  const populateCoordinates = (() => {
    for (let eachCoord = 1; eachCoord < 100; eachCoord++) {
      defaultCoordinates.push(eachCoord);
    }
  })();

  const placeShip = (shipType, length, rotation, coord) => {
    const newShip = new Ship(shipType, length, rotation, coord);
    PlacedShips.push(newShip);
  };

  // const thisShip = () => {
  //   const thisShip = shipsToPlaceArr.slice(0, 1);
  //   return thisShip;
  // };

  // const allSunk = () => {
  //   let allThem = 0;
  //   for (const eachShip of PlacedShips) {
  //     if (eachShip.times_hit === eachShip.length) {
  //       allThem += 1;
  //     }
  //   }
  //   if (allThem === shipsToPlaceArr.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // const receiveAttack = (shootCoord) => {
  //   let eachShipCounter = 0;
  //   for (const eachShip of shipsToPlaceArr) {
  //     eachShipCounter += 1;
  //     let eachCoordCounter = 0;
  //     for (const eachCoord of eachShip.coord) {
  //       let counter = 0;
  //       eachCoordCounter += 1;
  //       if (eachCoord === shootCoord) {
  //         counter += 1;
  //       }
  //       if (counter === 1) {
  //         eachShip.hit();
  //         allShoots.push(shootCoord);
  //         return true;
  //       }
  //       if (
  //         eachCoordCounter === eachShip.coord.length &&
  //         eachShipCounter === shipsToPlaceArr.length
  //       ) {
  //         allShoots.push(shootCoord);
  //         missedCoord.push(shootCoord);
  //         return false;
  //       } else {
  //         continue;
  //       }
  //     }
  //   }
  // };

  return {
    player,
    defaultCoordinates,
    PlacedShips,
    shipsToPlaceObj,
    // thisShip,
    placeShip,
    // receiveAttack,
    // allSunk,
  };
}

export { Gameboard };
