import { getShip } from "./ships"


export class gameBoard {
    constructor(id) {
        
        this.id = id
        this.ships = [];
        this.hits = [];
        this.missed = [];
        this.coordinatesLength = 0;

        const cellsPerRow = 10;
        const letters = "ABCDEFGHIJ";
        const board = [];
        this.board = board;
        for (let i = 0; i < Math.pow(cellsPerRow, 2); i++) {
        const cell = {
            col: Math.floor(i / cellsPerRow) + 1,
            row : i % cellsPerRow,
            id: "",
            hit: false,
            busy: false
            }
        cell.id = `${letters[cell.row]}${cell.col}`;
        board.push(cell);

        }      
    } 
    
    shipTo(coordinates, shipId) {
        
        coordinates.forEach(coord => {
            this.board.find(cell => cell.id === coord).busy = true; 
        })
        const ship = getShip(shipId)
        ship.coordinates = coordinates
        this.ships.push(ship)

        this.coordinatesLength += coordinates.length
    }  

    receiveAttack(coordinates) {

        const cell = this.board.find(cell => cell.id === coordinates)
        if (cell.busy === false) {
            this.missed.push(coordinates)
        } else {
            this.hits.push(coordinates)
            this.ships.forEach(ship => {
                if (ship.coordinates.some(coord => coord === coordinates)) {
                    
                    const idx = ship.coordinates.indexOf(coordinates)
                    ship.hit(idx);
                    
                    return;
                } 
                
            })
        } 
        

    }

    checkStatus() {
        console.log(this.hits.length)
        console.log(this.coordinatesLength)


        return this.coordinatesLength === this.hits.length ? console.log("all sunk") : console.log("not sunk")
    }
       
}







export const board1 = new gameBoard(1);
export const board2 = new gameBoard(2);





