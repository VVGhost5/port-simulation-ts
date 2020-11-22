import TWEEN from "@tweenjs/tween.js";
import Coordinates from "../enums/Coordinates";

import Ship from "../types/Ship";
import Port from "../types/Port";

import { definePort, portsArray } from "./port";
import { Graphics, app } from "../helpers/renderObjects";
import { portEmptyBoxesArray, portFullBoxesArray } from './renderObjects';
import { Angles } from "../enums/Angles";
import { updateBox } from '../helpers/updating';
import { Colors } from "../enums/Colors";

let shipsIDArray: string[] = [];
let shipsArray: Ship[] = [];
let shipsInQueue: Ship[] = [];

//Функция создания нового корабля
//New ship creation
function createShip(paramsObject: any) {
  shipsIDArray.push("ship");
  let newShip: any = new Graphics();
  newShip.id = shipsIDArray.length;
  newShip.type = paramsObject.type;
  newShip.isLoaded = paramsObject.isLoaded;
  newShip.color = paramsObject.color;
  newShip.bg = paramsObject.bg;
  newShip.direction = paramsObject.direction;
  newShip.lineStyle(3, `${paramsObject.color}`, 1);
  newShip.beginFill(paramsObject.bg);
  newShip.drawRect(0, 0, 60, 24);
  newShip.endFill();
  newShip.x = Coordinates.shipInitialPoint_x;
  newShip.y = Coordinates.shipInitialPoint_y;
  newShip.pivot.x = newShip.width / 2;
  newShip.pivot.y = newShip.height / 2;

  app.stage.addChild(newShip);

  shipsArray.push(newShip);

  definePort(portsArray, newShip);

  return newShip;
}

//Movement of ship in x and y coordinates
function moveShip(ship: Ship, positionLeft: number, positionTop: number) {
  new TWEEN.Tween({ left: `${ship.x}`, top: `${ship.y}` })
    .to({ left: `${positionLeft}`, top: `${positionTop}` }, 4000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function (object: any) {
      updateBox(ship, object);
    })
    .start();

  updateBox(ship, { left: `${ship.y}`, top: `${ship.x}` });
}

//Unloading of the ship
function ShipUnloading(ship: Ship, port: Port) {
  ship.tint = Colors.black;
  portEmptyBoxesArray[portsArray.indexOf(port)].visible = false;
  portFullBoxesArray[portsArray.indexOf(port)].visible = true;
  port.isFull = true;
  ship.isLoaded = false;
  moveShip(ship, Coordinates.ExitFromPortPoint_x, Coordinates.ExitFromPortPoint_y);
  port.isOccupied = false;
  ship.rotation = port.incline;
}

//Loading of the ship
function ShipLoading(ship: Ship, port: Port) {
  ship.tint = Colors.green;
  portFullBoxesArray[portsArray.indexOf(port)].visible = false;
  portEmptyBoxesArray[portsArray.indexOf(port)].visible = true;
  port.isFull = false;
  ship.isLoaded = true;
  moveShip(ship, Coordinates.ExitFromPortPoint_x, Coordinates.ExitFromPortPoint_y);
  port.isOccupied = false;
  ship.rotation = port.incline;
}

//Deleting of the ship from game field
function hideShip(ship: Ship) {
  if (ship.x === Coordinates.ShipDeletionPoint_x && ship.y === Coordinates.ShipDeletionPoint_y) {
    ship.width = 0;
    ship.height = 0;
    shipsIDArray.pop();
    shipsArray.splice(ship.id - 1, 1);
  }
}

//If there is suitable port for ships in queue, first ship in the queue starts to go in that port
function checkShipsInQueue(ship: Ship) {
  if (ship.x === Coordinates.QueueFirstPoint_x && ship.y === Coordinates.QueuePoint_y) {
    if (ship.type === "green") {
      let filteredPort = portsArray.find((el) => !el.isOccupied && el.isFull);

      if (!filteredPort) {
        return;
      }

      moveShip(shipsInQueue[0], Coordinates.EntryToPortsPoint_x, Coordinates.EntryToPortsPoint_y);

      if (shipsInQueue.length > 1) {
        moveShip(shipsInQueue[1], Coordinates.QueueFirstPoint_x, Coordinates.QueuePoint_y);
      }

      if (shipsInQueue.length > 2) {
        moveShip(shipsInQueue[2], Coordinates.QueueSecondPoint_x, Coordinates.QueuePoint_y);
      }

      checkForFreePorts(portsArray, shipsInQueue[0], shipsInQueue[0].type);
      shipsInQueue.shift();
    } else if (ship.type === "red") {
      let filteredPort = portsArray.find((el) => !el.isOccupied && !el.isFull);

      if (!filteredPort) {
        return;
      }

      moveShip(shipsInQueue[0], Coordinates.EntryToPortsPoint_x, Coordinates.EntryToPortsPoint_y);

      if (shipsInQueue.length > 1) {
        moveShip(shipsInQueue[1], Coordinates.QueueFirstPoint_x, Coordinates.QueuePoint_y);
      }

      if (shipsInQueue.length > 2) {
        moveShip(shipsInQueue[2], Coordinates.QueueSecondPoint_x, Coordinates.QueuePoint_y);
      }

      checkForFreePorts(portsArray, shipsInQueue[0], shipsInQueue[0].type);
      shipsInQueue.shift();
    }
  }

  //Depending on type of the ship, define value of "goingToPort" property
  function checkForFreePorts(portsArray: Port[], ship: Ship, type: string) {
    const isType = type === "red" ? true : false;

    const foundPort = portsArray.find(
      (el) => el.isFull === isType && el.isOccupied === false
    );

    if (!foundPort) {
      return;
    }

    foundPort.isOccupied = true;
    ship.goingToPort = foundPort.id;
    return foundPort;
  }
}

//Check how many are ships in queue, and send this ships to their positions in baypass
function checkBaypass(ship: Ship) {
  if (ship.x === 700 && ship.y === 240) {
    switch (shipsInQueue.length) {
      case 0: {
        moveShip(ship, 400, 240);
        ship.rotation = Angles.Horizontal;
        shipsInQueue.push(ship);
        break;
      }

      case 1: {
        moveShip(ship, 500, 240);
        ship.rotation = Angles.Horizontal;
        shipsInQueue.push(ship);
        break;
      }

      case 2: {
        moveShip(ship, 600, 240);
        ship.rotation = Angles.Horizontal;
        shipsInQueue.push(ship);
        break;
      }

      default: {
        console.log("There is no free space...ship is coming back");
        ship.rotation = Angles.shipBeyondQueue;
        moveShip(ship, 760, 150);
      }
    }
  }
}
//Deletion of a ship, that was unaviable to get in the queue
function hideShipInQueue(ship: Ship) {
  if (ship.x === Coordinates.ShipDeletionAfterQueuePoint_x && ship.y === Coordinates.ShipDeletionAfterQueuePoint_y) {
    ship.width = 0;
    ship.height = 0;
    shipsIDArray.pop();
    shipsArray.splice(ship.id - 1, 1);
    shipsInQueue.splice(ship.id - 1, 1);
  }
}

export {
  createShip,
  moveShip,
  ShipUnloading,
  ShipLoading,
  hideShip,
  checkBaypass,
  checkShipsInQueue,
  hideShipInQueue,
  shipsInQueue
};
