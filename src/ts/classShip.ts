
import { PIXI, app, Graphics, updateBox, TWEEN, shipsArray, shipsIDArray, portsArray } from '../index';

class Ship {
    id: number
    type: string
    isLoaded: boolean
    direction: string
    goingToPort: any
    rotation: number
    x: number
    y: number
    tint: number
    width: number
    height: number

    constructor(id: number, type: string, isLoaded: boolean, direction: string) {
        this.id = id;
        this.type = type;
        this.isLoaded = isLoaded;
        this.direction = direction;
        this.goingToPort = null;
        this.rotation;
        this.x;
        this.y;
        this.tint;
        this.width;
        this.height;
    }

public moveShip(ship: Ship, positionLeft: number, positionTop: number) {

  let tween1 = new TWEEN.Tween({ left: `${ship.x}`, top: `${ship.y}` })

    .to({ left: `${positionLeft}`, top: `${positionTop}` }, 4000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate(function (object: any) {
      updateBox(ship, object)
    })
    .start()

  updateBox(ship, { left: `${ship.y}`, top: `${ship.x}` })
}
}



export default Ship;