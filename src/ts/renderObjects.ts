import { PIXI, app, Graphics } from '../index';

let portEmptyBoxesArray: any[];
let portFullBoxesArray: any[];

function renderObjects() {
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

let portBox1Empty = new Graphics();
portBox1Empty.lineStyle(4, 0x000000, 1);
portBox1Empty.beginFill(0xffffff);
portBox1Empty.drawRect(0, 72, 24, 60);
portBox1Empty.endFill();
portBox1Empty.visible = true;
app.stage.addChild(portBox1Empty);

let portBox1Full = new Graphics();
portBox1Full.lineStyle(4, 0x000000, 1);
portBox1Full.beginFill(0xffd700);
portBox1Full.drawRect(0, 72, 24, 60);
portBox1Full.endFill();
portBox1Full.visible = false;
app.stage.addChild(portBox1Full);

let portBox2Empty = new Graphics();
portBox2Empty.lineStyle(4, 0x000000, 1);
portBox2Empty.beginFill(0xffffff);
portBox2Empty.drawRect(0, 204, 24, 60);
portBox2Empty.endFill();
portBox2Empty.visible = true;
app.stage.addChild(portBox2Empty);

let portBox2Full = new Graphics();
portBox2Full.lineStyle(4, 0x000000, 1);
portBox2Full.beginFill(0xffd700);
portBox2Full.drawRect(0, 204, 24, 60);
portBox2Full.endFill();
portBox2Full.visible = false;
app.stage.addChild(portBox2Full);

let portBox3Empty = new Graphics();
portBox3Empty.lineStyle(4, 0x000000, 1);
portBox3Empty.beginFill(0xffffff);
portBox3Empty.drawRect(0, 336, 24, 60);
portBox3Empty.endFill();
portBox3Empty.visible = true;
app.stage.addChild(portBox3Empty);

let portBox3Full = new Graphics();
portBox3Full.lineStyle(4, 0x000000, 1);
portBox3Full.beginFill(0xffd700);
portBox3Full.drawRect(0, 336, 24, 60);
portBox3Full.endFill();
portBox3Full.visible = false;
app.stage.addChild(portBox3Full);

let portBox4Empty = new Graphics();
portBox4Empty.lineStyle(4, 0x000000, 1);
portBox4Empty.beginFill(0xffffff);
portBox4Empty.drawRect(0, 468, 24, 60);
portBox4Empty.endFill();
portBox4Empty.visible = true;
app.stage.addChild(portBox4Empty);

let portBox4Full = new Graphics();
portBox4Full.lineStyle(4, 0x000000, 1);
portBox4Full.beginFill(0xffd700);
portBox4Full.drawRect(0, 468, 24, 60);
portBox4Full.endFill();
portBox4Full.visible = false;
app.stage.addChild(portBox4Full);

portEmptyBoxesArray = [portBox1Empty, portBox2Empty, portBox3Empty, portBox4Empty];
portFullBoxesArray = [portBox1Full, portBox2Full, portBox3Full, portBox4Full];
    
    
}

export default renderObjects;
export { portEmptyBoxesArray, portFullBoxesArray };