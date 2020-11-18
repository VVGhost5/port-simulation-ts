

import * as PIXI from 'pixi.js'

const TWEEN = require('@tweenjs/tween.js');

import Ship from './ts/classShip';
import Port from './ts/classPort';

import './styles.css';

const app = new PIXI.Application({
  width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);
let Graphics = PIXI.Graphics;

let shipsIDArray: string[] = [];
let shipsArray: Ship[] = [];
let shipsInQueue: Ship[] = [];

let topWall = new Graphics();
topWall.lineStyle(4, 0xffffff, 1);
topWall.moveTo(30, 200);
topWall.lineTo(30, 0);
topWall.x = 300;
topWall.y = 0;
app.stage.addChild(topWall);

let bottomWall = new Graphics();
bottomWall.lineStyle(4, 0xffffff, 1);
bottomWall.moveTo(30, 400);
bottomWall.lineTo(30, 600);
bottomWall.x = 300;
bottomWall.y = 0;
app.stage.addChild(bottomWall);

const containerRef: any = document.querySelector('.container');

const portBox1 = document.createElement('div');
const portBox2 = document.createElement('div');
const portBox3 = document.createElement('div');
const portBox4 = document.createElement('div');
portBox1.classList.add('port');
portBox1.classList.add('port-1');
portBox2.classList.add('port');
portBox2.classList.add('port-2');
portBox3.classList.add('port');
portBox3.classList.add('port-3');
portBox4.classList.add('port');
portBox4.classList.add('port-4');
containerRef.appendChild(portBox1);
containerRef.appendChild(portBox2);
containerRef.appendChild(portBox3);
containerRef.appendChild(portBox4);

let port1 = new Port(1, 48);
let port2 = new Port(2, 0.3);
let port3 = new Port(3, 2.8);
let port4 = new Port(4, 2.3);

const portBoxesArray: any = [portBox1, portBox2, portBox3, portBox4];
const portsArray: Port[] = [port1, port2, port3, port4];

window.onload = function () {
  createShip(getRandomInt());
  setInterval(() => { createShip(getRandomInt()) }, 8000);
  animate()
}


function moveShip(ship: any, positionLeft: any, positionTop: any) {

  let tween1 = new TWEEN.Tween({ left: `${ship.x}`, top: `${ship.y}` })

    .to({ left: `${positionLeft}`, top: `${positionTop}` }, 4000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function (object: any) {
      updateBox(ship, object)
    })
    .start()

  updateBox(ship, { left: `${ship.y}`, top: `${ship.x}` })
}

function animate(time?: any) {

  requestAnimationFrame(animate)
  TWEEN.update(time)
}

function getRandomInt() {
  let result = Math.floor(Math.random() * Math.floor(2));
  if (result) {
    return { type: 'green', isLoaded: false, color: 0x00ff00, bg: 0xffffff, direction: 'toPort' }
  }
  return { type: 'red', isLoaded: true, color: 0xff0000, bg: 0xff0000, direction: 'toPort' }
}

function createShip(paramsObject: any) {
  shipsIDArray.push('ship');
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
  newShip.x = 760;
  newShip.y = 290;
  newShip.pivot.x = newShip.width / 2;
  newShip.pivot.y = newShip.height / 2;
  app.stage.addChild(newShip);
  shipsArray.push(newShip);
  definePort(portsArray, newShip);

  return newShip;
}

function choosePortOrBaypass(ship: any) {
  if (ship.type === 'red') {
    let filteredPort = portsArray.find(el => el.isFull === false && el.isOccupied === false);
    filteredPort ? moveShip(ship, 270, 290) : moveShip(ship, 700, 240);
    return;
  }
  let filteredPort = portsArray.find(el => el.isFull === true && el.isOccupied === false);
  filteredPort ? moveShip(ship, 270, 290) : moveShip(ship, 700, 240);
  return;
}

function checkBaypass(ship: any) {
  if (ship.x === 700 && ship.y === 240) {
    switch (shipsInQueue.length) {
      case 0: {
        moveShip(ship, 400, 240)
        ship.rotation = 0;
        shipsInQueue.push(ship);
        break;
      };

      case 1: {
        moveShip(ship, 500, 240);
        ship.rotation = 0;
        shipsInQueue.push(ship);
        break;
      }
      case 2: {
        moveShip(ship, 600, 240);
        ship.rotation = 0;
        shipsInQueue.push(ship);
        break;
      }
      default: console.log('Full queue');
    }
  }
}

function definePort(portsArray: any[], ship: any) {
  ship.type === "red" ? checkforFreePorts(portsArray, ship) : checkforLoadedPorts(portsArray, ship);
}

function checkforFreePorts(portsArray: any[], ship: any) {
  let filteredPort = portsArray.find(el => el.isFull === false && el.isOccupied === false);
  if (!filteredPort) {
    moveShip(ship, 700, 240);
    ship.rotation = 48;
    return;
  }
  filteredPort.isOccupied = true;
  ship.goingToPort = filteredPort.id;
  moveShip(ship, 270, 290);
  return filteredPort;
}

function checkforLoadedPorts(portsArray: any[], ship: any) {
  let filteredPort: any = portsArray.find(el => el.isFull === true && el.isOccupied === false);
  if (!filteredPort) {
    moveShip(ship, 700, 240);
    ship.rotation = 48;
    return;
  }
  filteredPort.isOccupied = true;
  ship.goingToPort = filteredPort.id;
  moveShip(ship, 270, 290);
  return filteredPort;
}

function switchActionsInPort(ship: any, port: any) {
  (ship.type === "red") ? ShipUnloading(ship, port) : ShipLoading(ship, port);
}

function ShipUnloading(ship: any, port: any) {

  ship.tint = 0x000000;
  portBoxesArray[`${portsArray.indexOf(port)}`].style.backgroundColor = 'rgb(255, 215, 0)';
  port.isFull = true;
  ship.isLoaded = false;
  moveShip(ship, 270, 330);
  port.isOccupied = false;
  ship.rotation = port.incline;
}

function ShipLoading(ship: any, port: any) {

  ship.tint = 0x00ff00;
  portBoxesArray[`${portsArray.indexOf(port)}`].style.backgroundColor = 'rgb(255, 255, 255)';
  port.isFull = false;
  ship.isLoaded = true;
  moveShip(ship, 270, 330);
  port.isOccupied = false;
  ship.rotation = port.incline;
}

function checkPoint1(ship: any) {
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
        ship.rotation = 2.3;
        moveShip(ship, 60, 498);
        ship.rotation = port4.incline;
        break;
    }
  }
}

function checkPoint1back(ship: any) {
  if (ship.x === 270 && ship.y === 330) {
    ship.rotation = 0;
    moveShip(ship, 760, 330);

  }
}

function checkPort(ship: any) {
  if (ship.x === 60 && ship.y === 120) {
    ship.rotation = 0;

    return setTimeout(() => { switchActionsInPort(ship, port1) }, 5000);
  }
  if (ship.x === 60 && ship.y === 234) {
    ship.rotation = 0;
    return setTimeout(() => { switchActionsInPort(ship, port2) }, 5000);
  }
  if (ship.x === 60 && ship.y === 366) {
    ship.rotation = 0;
    return setTimeout(() => { switchActionsInPort(ship, port3) }, 5000);
  }
  if (ship.x === 60 && ship.y === 498) {
    ship.rotation = 0;
    return setTimeout(() => { switchActionsInPort(ship, port4) }, 5000);
  }
}

function hideShip(ship: any) {
  if (ship.x === 760 && ship.y === 330) {
    ship.width = 0;
    ship.height = 0;
    shipsIDArray.pop();
    shipsArray.splice(ship.id - 1, 1);
  }
}

function checkShipsInQueue(ship: any) {
  if (ship.x === 400 && ship.y === 240) {
    if (ship.type === 'green') {
      let filteredPort = portsArray.find(el => !el.isOccupied && el.isFull)
      if (!filteredPort) {
        return;
      }
      moveShip(shipsInQueue[0], 270, 290);
      definePortAfterQueue(portsArray, shipsInQueue[0])
      shipsInQueue.shift();
      moveShip(shipsInQueue[0], 400, 240);

    }
    else if (ship.type === 'red') {
      let filteredPort = portsArray.find(el => !el.isOccupied && !el.isFull)
      if (!filteredPort) {
        return;
      }
      moveShip(shipsInQueue[0], 270, 290);
      definePortAfterQueue(portsArray, shipsInQueue[0])
      shipsInQueue.shift();
      moveShip(shipsInQueue[0], 400, 240);
    }
  }

  function definePortAfterQueue(portsArray: Port[], ship: Ship) {
    ship.type === "red" ? checkforFreePortsAfterQueue(portsArray, ship) : checkforLoadedPortsAfterQueue(portsArray, ship);
  }

  function checkforFreePortsAfterQueue(portsArray: Port[], ship: Ship) {
    let filteredPort = portsArray.find(el => el.isFull === false && el.isOccupied === false);
    if (!filteredPort) {
      return;
    }
    filteredPort.isOccupied = true;
    ship.goingToPort = filteredPort.id;
    return filteredPort;
  }

  function checkforLoadedPortsAfterQueue(portsArray: Port[], ship: Ship) {
    let filteredPort = portsArray.find(el => el.isFull === true && el.isOccupied === false);
    if (!filteredPort) {
      return;
    }
    filteredPort.isOccupied = true;
    ship.goingToPort = filteredPort.id;
    return filteredPort;
  }
}

function updateBox(box: any, params: any) {
  box.x = params.left;
  box.y = params.top;
  checkPoint1(box);
  checkPort(box);
  checkPoint1back(box);
  checkPoint1(box);
  hideShip(box);
  checkBaypass(box);
  if (shipsInQueue.length > 0) {
    checkShipsInQueue(shipsInQueue[0]);
  }
}



