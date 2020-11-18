class Ship {
    id: number
    type: string
    isLoaded: boolean
    direction: string
    goingToPort: any

    constructor(id: number, type: string, isLoaded: boolean, direction: string) {
        this.id = id;
        this.type = type;
        this.isLoaded = isLoaded;
        this.direction = direction;
        this.goingToPort = null;
    }
}

export default Ship;