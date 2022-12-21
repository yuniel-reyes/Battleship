import { Ship } from "./ship.js";

class Gameboard {
  constructor(player) {
    this.player = player;
    this.ships = [];
    this.missedCoord = [];
    this.allShoots = [];
  }

  placeShips = (shipType, length, rotation, coord) => {
    const newShip = new Ship(shipType, length, rotation, coord);
    this.ships.push(newShip);
  };

  allSunk() {
    let allThem = 0;
    for (const eachShip of this.ships) {
      if (eachShip.times_hit === eachShip.length) {
        allThem += 1;
      }
    }
    if (allThem === this.ships.length) {
      return true;
    } else {
      return false;
    }
  }

  receiveAttack = (shootCoord) => {
    let eachShipCounter = 0;
    for (const eachShip of this.ships) {
      eachShipCounter += 1;
      let eachCoordCounter = 0;
      for (const eachCoord of eachShip.coord) {
        let counter = 0;
        eachCoordCounter += 1;
        if (eachCoord === shootCoord) {
          counter += 1;
        }
        if (counter === 1) {
          eachShip.hit();
          this.allShoots.push(shootCoord);
          return true;
        }
        if (
          eachCoordCounter === eachShip.coord.length &&
          eachShipCounter === this.ships.length
        ) {
          this.allShoots.push(shootCoord);
          this.missedCoord.push(shootCoord);
          return false;
        } else {
          continue;
        }
      }
    }
  };
}

export { Gameboard };
