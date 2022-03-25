

import { gameBoard, amount2, amount1, board1sunk, board2sunk, resetAmounts } from "./Board";
import { Player, aiRandom, resetArr } from "./Player";
import {makeShip} from "./ships";



export let board1;
export let board2;
export let player1;
export let player2;





export function game(userName, isFirst) {

    
    
    
    board1 = new gameBoard(1)
    board2 = new gameBoard(2)

    

    player1 = new Player(userName, 1)
    player2 = new Player("ai", 2)

    
    makeShip(1, 1)
    makeShip(1, 2)
    makeShip(1, 3)
    makeShip(1, 4)
    makeShip(2, 5)
    makeShip(2, 6)
    makeShip(2, 7)
    makeShip(3, 8)
    makeShip(3, 9)
    makeShip(4, 10)

    makeShip(1, 11)
    makeShip(1, 12)
    makeShip(1, 13)
    makeShip(1, 14)
    makeShip(2, 15)
    makeShip(2, 16)
    makeShip(2, 17)
    makeShip(3, 18)
    makeShip(3, 19)
    makeShip(4, 20)
    
    enemyBoard();

    if (isFirst) {
        initalShipPlacement();
    }
    
    return {
        player1,
        player2,
        board1,
        board2,
        end() {
        
            board1 = null;
            board2 = null;
            player1 = null;
            player2 = null;

            const cells = document.querySelectorAll(".cell")
            cells.forEach(cell => {
                
                
                    cell.classList.remove("busy")
                    cell.classList.remove("hit")
                    cell.classList.remove("miss")

                    resetAmounts();
                    resetArr();
                    
                    board1sunk.textContent = "Ships sunk: "
                    board2sunk.textContent = "Ships sunk: "
                    
                }
            )   
            
        }
        
    }
}





const main = document.querySelector(".main")

export const newGame = document.createElement("button")
newGame.textContent = "New Game"
newGame.classList.add("new-game")

if (document.body !== null) {
    document.body.appendChild(newGame)
}


function initalShipPlacement() {
    board1.shipTo(["A1"], 1)
    board1.shipTo(["A7"], 2)
    board1.shipTo(["H1"], 3)
    board1.shipTo(["H4"], 4)
    board1.shipTo(["C10", "D10"], 5)
    board1.shipTo(["A5", "B5"], 6)
    board1.shipTo(["J5", "J6"], 7)
    board1.shipTo(["D3", "E3", "F3"], 8)
    board1.shipTo(["E5", "E6", "E7"], 9)
    board1.shipTo(["F10", "G10", "H10", "I10"], 10)
}
/*

UNUSED CODE :(

const array = [];
let random;
let number;
let letter;
let letters;
let nextLetter;
let next;

function aiBoard() {
    letters = "ABCDEFGHIJ";
    let letter = letters[Math.floor(Math.random() * 10)]
    let number = Math.floor(Math.random() * 10) + 1;

    random = letter + number;
    let left = letters[letters.indexOf(random[0]) - 1];
    left += number;
    let right = letters[letters.indexOf(random[0]) + 1];
    right += number;
    let bot = number + 1;
    let top = number - 1;
    
    if (
        array.some(x => x === random) || array.some(x => x === left)
       || array.some(x => x === right)|| array.some(x => x === bot)
       || array.some(x => x === top)) aiBoard();
    array.push(random)
    array.push(left)
    array.push(right)
    array.push(bot)

    return {
        random,
        letter,
        number
    }
}
*/

function enemyBoard() {
    
    board2.shipTo(["H10"], 11)
    board2.shipTo(["C1"], 12)
    board2.shipTo(["A8"], 13)
    board2.shipTo(["J9"], 14)
    board2.shipTo(["I1", "J1"], 15)
    board2.shipTo(["F1", "F2"], 16)
    board2.shipTo(["I6", "J6"], 17)
    board2.shipTo(["D9", "E9", "F9"], 18)
    board2.shipTo(["E5", "E6", "E7"], 19)
    board2.shipTo(["A1", "A2", "A3", "A4"], 20)
}












