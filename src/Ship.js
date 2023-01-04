function Ship(shipType, length, rotation = "horizontal", coord = 0) {
  this.length = length;
  this.shipType = shipType;
  this.rotation = rotation;
  this.coord = coord;
  this.times_hit = 0;
  this.sunk = false;

  this.hit = () => {
    this.times_hit += 1;
  };

  this.isSunk = () => {
    if (this.times_hit === this.length) {
      this.sunk = true;
    }
  };
}

/* 
Carrier	    5
Battleship	4
Cruiser	    3
Submarine	  3
Destroyer	  2
*/
export { Ship };
