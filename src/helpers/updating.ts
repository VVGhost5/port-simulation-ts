import {
    moveShip,
    hideShip,
    checkShipsInQueue,
    hideShipInQueue,
    shipsInQueue,
    checkBaypass
    
} from "./ship";

import {
    checkPort,
    port1,
    port2,
    port3,
    port4
} from "./port";

import Ship from "../types/Ship";


//Constanty check coordinates of a ship and provide animation of ship movement and invoke all functions inside
function updateBox(ship: Ship, params: any) {
  ship.x = params.left;
  ship.y = params.top;

  if (ship.x === 270 && ship.y === 290) {
    switch (ship.goingToPort) {
      case 1:
        moveShip(ship, 60, 120);
        ship.rotation = port1.incline;
        break;

      case 2:
        moveShip(ship, 60, 234);
        ship.rotation = port2.incline;
        break;

      case 3:
        moveShip(ship, 60, 366);
        ship.rotation = port3.incline;
        break;

      case 4:
        moveShip(ship, 60, 498);
        ship.rotation = port4.incline;
        break;
    }
  }

  checkPort(ship);

  if (ship.x === 270 && ship.y === 330) {
    ship.rotation = 0;
    moveShip(ship, 760, 330);
  }

  hideShip(ship);
  hideShipInQueue(ship);
  checkBaypass(ship);

  if (shipsInQueue.length > 0) {
    checkShipsInQueue(shipsInQueue[0]);
  }
}

export { updateBox };