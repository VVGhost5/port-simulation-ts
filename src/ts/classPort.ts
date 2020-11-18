class Port {
    id: number
    isFull: boolean
    isOccupied: boolean
    incline: number

    constructor(id: number, incline: number) {
this.id = id;
this.isFull = false;
this.isOccupied = false;
this.incline = incline;
    }
};

export default Port;