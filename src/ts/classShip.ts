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
}

export default Ship;