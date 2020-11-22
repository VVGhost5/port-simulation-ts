import * as PIXI from "pixi.js";
import { Colors } from '../enums/Colors';

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: Colors.blue,
  resolution: window.devicePixelRatio || 1,
});

const Graphics = PIXI.Graphics;

document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

//Creation of walls as PIXI.Graphics elements
function renderWall(moveToX: number, moveToY: number, lineToX: number, lineToY: number ) {
  const wall = new Graphics();
  wall.lineStyle(4, Colors.white, 1);
  wall.moveTo(moveToX, moveToY);
  wall.lineTo(lineToX, lineToY);
  wall.x = 300;
  wall.y = 0;
  
  app.stage.addChild(wall);
}

renderWall(30, 200, 30, 0);
renderWall(30, 400, 30, 600);

const ports: any[] = [];

const coordinateYArray: number[] = [72, 204, 336, 468, 72, 204, 336, 468];

//Creation of ports as PIXI.Graphics elements
for (let index = 0; index < 8; index++) {
  const portBox = new Graphics();
  
  const color: number = index > 3 ? Colors.white : Colors.golden;
  console.log(color);
  const isVisible: boolean = index > 3 ? true : false;
  console.log(isVisible);
  const coordinate: number = coordinateYArray[index];

  portBox.lineStyle(4, Colors.black, 1);
  portBox.beginFill(color);
  portBox.drawRect(0, coordinate, 24, 60);
  portBox.endFill();
  portBox.visible = isVisible;
  app.stage.addChild(portBox);

  ports.push(portBox);
}

const portEmptyBoxesArray = ports.filter(({ visible }) => visible);
const portFullBoxesArray = ports.filter(({ visible }) => !visible);

export { portEmptyBoxesArray, portFullBoxesArray, Graphics, app };
