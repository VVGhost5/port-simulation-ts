const PIXI = require("pixi.js");
const TWEEN = require('@tweenjs/tween.js');

import { portEmptyBoxesArray, portFullBoxesArray } from './ts/renderObjects';
import './ts/renderObjects';
import Ship from './ts/ClassShip';
import Port from './ts/ClassPort';
import renderObjects from './ts/renderObjects';
import getRandomInt from './ts/getRandomIntFunc';


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

renderObjects();

let port1 = new Port(1, 48);
let port2 = new Port(2, 0.3);
let port3 = new Port(3, 2.8);
let port4 = new Port(4, 2.3);

const portsArray = [port1, port2, port3, port4];

window.onload = function () {
  createShip(getRandomInt());
  setInterval(() => { createShip(getRandomInt()) }, 8000);
  animate()
}

//Функция движение корабля ship в координаты x и y
function moveShip(ship: Ship, positionLeft: number, positionTop: number) {

  let tween1 = new TWEEN.Tween({ left: `${ship.x}`, top: `${ship.y}` })

    .to({ left: `${positionLeft}`, top: `${positionTop}` }, 4000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function (object: any) {
      updateBox(ship, object)
    })
    .start()

  updateBox(ship, { left: `${ship.y}`, top: `${ship.x}` })
}

//Функция анимации передвижения корабля
function animate(time?: any) {

  requestAnimationFrame(animate)
  TWEEN.update(time)
}

//Функция создания нового корабля
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

//Функция проверки места в очереди кораблей, и в зависимости от порядка в массиве отправление в нужное место ожидания
function checkBaypass(ship: Ship) {
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

//Функция определения свободных портов, в зависимости от типа корабля
function definePort(portsArray: Port[], ship: Ship) {
  ship.type === "red" ? checkForFreePorts(portsArray, ship) : checkForLoadedPorts(portsArray, ship);
}
//Функция для red-кораблей, при нахождение пустого и не занятого порта, корабль отправляется в данный порт 
function checkForFreePorts(portsArray: Port[], ship: Ship) {
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

//Функция для green-кораблей, при нахождение полного и не занятого порта, корабль отправляется в данный порт 
function checkForLoadedPorts(portsArray: Port[], ship: Ship) {
  let filteredPort: Port = portsArray.find(el => el.isFull === true && el.isOccupied === false);
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

//Функция, которая в зависимости от типа корабля, вызывает функцию загрузки или выгрузки корабля
function switchActionsInPort(ship: Ship, port: Port) {
  (ship.type === "red") ? ShipUnloading(ship, port) : ShipLoading(ship, port);
}

//Функция выгрузки корабля
function ShipUnloading(ship: Ship, port: Port) {
  ship.tint = 0x000000;
  portEmptyBoxesArray[portsArray.indexOf(port)].visible = false;
  portFullBoxesArray[portsArray.indexOf(port)].visible = true;
  port.isFull = true;
  ship.isLoaded = false;
  moveShip(ship, 270, 330);
  port.isOccupied = false;
  ship.rotation = port.incline;
}

//Функция загрузки корабля
function ShipLoading(ship: Ship, port: Port) {

  ship.tint = 0x00ff00;
  portFullBoxesArray[portsArray.indexOf(port)].visible = false;
  portEmptyBoxesArray[portsArray.indexOf(port)].visible = true;
  port.isFull = false;
  ship.isLoaded = true;
  moveShip(ship, 270, 330);
  port.isOccupied = false;
  ship.rotation = port.incline;
}

//Функция, которая в зависимости от свойства gointPort корабля отпределяет в какой порт двигатся кораблю
function checkPoint1(ship: Ship) {
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
//Функция, которая отвечает за возвращение корабля обратно в море
function checkPoint1Back(ship: Ship) {
  if (ship.x === 270 && ship.y === 330) {
    ship.rotation = 0;
    moveShip(ship, 760, 330);

  }
}

//Функция которая проверяет наличие корабля в порту, и вызывает функцию проверки типа корабля и через 5 сек выполняет эту функцию
function checkPort(ship: Ship) {
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

//Функция, которая отвечает за исчезновение корабля с поля
function hideShip(ship: Ship) {
  if (ship.x === 760 && ship.y === 330) {
    ship.width = 0;
    ship.height = 0;
    shipsIDArray.pop();
    shipsArray.splice(ship.id - 1, 1);
  }
}

//Функция которая проверяет, или освободился нужный порт для 1 корабля в очереди, и отправляет корабль в освободившийся порт
function checkShipsInQueue(ship: Ship) {
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

  //Функция, которая определяет тип корабля, и в зависимости от типа назначает значение свойству goingToPort кораблю
  function definePortAfterQueue(portsArray: Port[], ship: Ship) {
    ship.type === "red" ? checkForFreePortsAfterQueue(portsArray, ship) : checkForLoadedPortsAfterQueue(portsArray, ship);
  }
//Функция которая проверяет свободный порт для red-корабля, и назначет ему значение для свойства goingToPort
  function checkForFreePortsAfterQueue(portsArray: Port[], ship: Ship) {
    let filteredPort = portsArray.find(el => el.isFull === false && el.isOccupied === false);
    if (!filteredPort) {
      return;
    }
    filteredPort.isOccupied = true;
    ship.goingToPort = filteredPort.id;
    return filteredPort;
  }

  //Функция которая проверяет свободный порт для green-корабля, и назначет ему значение для свойства goingToPort
  function checkForLoadedPortsAfterQueue(portsArray: Port[], ship: Ship) {
    let filteredPort = portsArray.find(el => el.isFull === true && el.isOccupied === false);
    if (!filteredPort) {
      return;
    }
    filteredPort.isOccupied = true;
    ship.goingToPort = filteredPort.id;
    return filteredPort;
  }
}

//Функция, которая делает постоянную проверку условий всех функций внутри неё, и обеспечивает анимацию передвижения кораблей
function updateBox(box: Ship, params: any) {
  box.x = params.left;
  box.y = params.top;
  checkPoint1(box);
  checkPort(box);
  checkPoint1Back(box);
  checkPoint1(box);
  hideShip(box);
  checkBaypass(box);
  if (shipsInQueue.length > 0) {
    checkShipsInQueue(shipsInQueue[0]);
  }
}

export { PIXI, app, Graphics, updateBox, TWEEN, shipsArray, shipsIDArray, portsArray };