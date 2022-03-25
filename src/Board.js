import { game } from "./game";
import { getShip } from "./ships"
import { player1 } from "./game";

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

        if (this.id === 2) {
            const celly = document.querySelector(`.two[data-id="${coordinates}"]`)
            celly.classList.remove("celltwo")
        }
        
        
        let classId;
        this.id === 1 ? classId = "one" : classId = "two"
        
        const cellDOM = document.querySelector(`.${classId}[data-id="${coordinates}"]`)
        
        const cell = this.board.find(cell => cell.id === coordinates)
        
        if (cell.busy === false) {
            cellDOM.classList.add("miss")
            this.missed.push(coordinates)
            console.log(`board ${this.id}, misses ${this.missed}`)

            return
        }
        if (this.hits.indexOf(coordinates) != -1) {
           
            return
        }
            
        this.hits.push(coordinates)
        
        this.ships.forEach(ship => {
        if (ship.coordinates.some(coord => coord === coordinates)) {

            console.log("nice")
            const idx = ship.coordinates.indexOf(coordinates)
            ship.hit(idx);
            

            

            if (ship.isSunk()) {
                if (this.id === 1) {
                    amount1 += 1;
                    board1sunk.textContent = `Ships sunk ${amount1}`;

                    
                } else {
                    amount2 += 1;
                    board2sunk.textContent = `Ships sunk: ${amount2}`;
                }
            }

                    
            cellDOM.classList.add("hit")
                    
            return;
            } 
                
        })

        
        console.log(`board ${this.id}, hits ${this.hits}`)
            
    }
    checkStatus() {
        
        return this.coordinatesLength === this.hits.length
    }
       
}

const display = document.createElement("div")
display.classList.add("display")
if (document.body !== null) document.body.appendChild(display)

const firstBox = document.createElement("div")
firstBox.classList.add("firstBox")
export const twoBox = document.createElement("div")
twoBox.classList.add("twoBox")
display.appendChild(firstBox)
display.appendChild(twoBox)
const board1Caption = document.createElement("h3")
board1Caption.textContent = "Board 1"
const board2Caption = document.createElement("h3")
board2Caption.textContent = "Board 2"

firstBox.appendChild(board1Caption)

export const board1sunk = document.createElement("div")
export let amount1 = 0;
board1sunk.textContent = `Ships sunk: ${amount1}`
firstBox.appendChild(board1sunk)

twoBox.appendChild(board2Caption)
export const board2sunk = document.createElement("div")
let amount2 = 0;
export function resetAmounts() {
    amount1 = 0;
    amount2 = 0;
}

board2sunk.textContent = `Ships sunk: ${amount2}`
twoBox.appendChild(board2sunk)












