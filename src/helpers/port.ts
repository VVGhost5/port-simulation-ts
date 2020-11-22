import Ship from "../types/Ship";
import Port from "../types/Port";
import Coordinates from "../enums/Coordinates";

import { moveShip, ShipLoading, ShipUnloading } from "./ship";
import { Angles } from "../enums/Angles";

const port1 = createPort(1, Angles.Port1Incline);
const port2 = createPort(2, Angles.Port2Incline);
const port3 = createPort(3, Angles.Port3Incline);
const port4 = createPort(4, Angles.Port4Incline);

const portsArray = [port1, port2, port3, port4];

//Creation of port, with specificated ID number, and angle of ship, that came in this port
function createPort(id: number, incline: number): Port {
  const port = {
    id: id,
    isFull: false,
    isOccupied: false,
    incline: incline,
  };

  return port;
}

//Definition of free ports, depending on type of the ship
function definePort(portsArray: Port[], ship: Ship) {
  ship.type === "red"
    ? checkForFreePorts(portsArray, ship)
    : checkForLoadedPorts(portsArray, ship);
}

//Red ship try to find empty and unoccupied port, and if there is at least one port, ship go there, otherwise, go to queue
function checkForFreePorts(portsArray: Port[], ship: Ship) {
  let filteredPort = portsArray.find(
    (el) => el.isFull === false && el.isOccupied === false
  );
  if (!filteredPort) {
    moveShip(ship, Coordinates.EntryToQueue_x, Coordinates.EntryToQueue_y);
    ship.rotation = Angles.Port1Incline;
    return;
  }
  filteredPort.isOccupied = true;
  ship.goingToPort = filteredPort.id;
  moveShip(ship, Coordinates.EntryToPortsPoint_x, Coordinates.EntryToPortsPoint_y);
  return filteredPort;
}

//Green ship try to find full and unoccupied port, and if there is at least one port, ship go there, otherwise, go to queue
function checkForLoadedPorts(portsArray: Port[], ship: Ship) {
  let filteredPort: Port = portsArray.find(
    (el) => el.isFull === true && el.isOccupied === false
  );
  if (!filteredPort) {
    moveShip(ship, Coordinates.EntryToQueue_x, Coordinates.EntryToQueue_y);
    ship.rotation = Angles.Port1Incline;
    return;
  }
  filteredPort.isOccupied = true;
  ship.goingToPort = filteredPort.id;
  moveShip(ship, Coordinates.EntryToPortsPoint_x, Coordinates.EntryToPortsPoint_y);
  return filteredPort;
}

//When ship is in the port, depending on type of ship, it starts loading or unloading
function switchActionsInPort(ship: Ship, port: Port) {
  ship.type === "red" ? ShipUnloading(ship, port) : ShipLoading(ship, port);
}

//Checking of coordinates of the ship, defintion of port where is ship, and after 5 sec ship starts either loading or unloading
function checkPort(ship: Ship) {
  if (ship.x === Coordinates.portsPoint_x && ship.y === Coordinates.port1Point_y) {
    ship.rotation = Angles.Horizontal;
    return setTimeout(() => {
      switchActionsInPort(ship, port1);
    }, 5000);
  }
  if (ship.x === Coordinates.portsPoint_x && ship.y === Coordinates.port2Point_y) {
    ship.rotation = Angles.Horizontal;
    return setTimeout(() => {
      switchActionsInPort(ship, port2);
    }, 5000);
  }
  if (ship.x === Coordinates.portsPoint_x && ship.y === Coordinates.port3Point_y) {
    ship.rotation = Angles.Horizontal;
    return setTimeout(() => {
      switchActionsInPort(ship, port3);
    }, 5000);
  }
  if (ship.x === Coordinates.portsPoint_x && ship.y === Coordinates.port4Point_y) {
    ship.rotation = Angles.Horizontal;
    return setTimeout(() => {
      switchActionsInPort(ship, port4);
    }, 5000);
  }
}

export {
  checkPort,
  switchActionsInPort,
  checkForLoadedPorts,
  checkForFreePorts,
  definePort,
  createPort,
  portsArray,
  port1,
  port2,
  port3,
  port4
};
