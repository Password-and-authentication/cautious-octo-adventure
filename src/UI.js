import { board1, board2, game, player1, newGame } from "./game"
import { getShip, makeShip } from "./ships"


export const boardOne = document.querySelector(".board1")
export const boardTwo = document.querySelector(".board2")
game("pharrell", true)


boardContent(board1, boardOne, "one")
boardContent(board2, boardTwo, "two")



export function boardContent(board, boardEl, id) {

    if (boardEl === null) {
        return
    }
    console.log(boardEl)
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div")
        cell.setAttribute("data-id", board.board[i].id)
        cell.classList.add(id)
        boardEl.appendChild(cell)
        cell.classList.add("cell")
    
        if (board.board[i].busy) {
            cell.classList.add("busy")
        }

        if (id === "two") {
            cell.addEventListener("click", () => {
                
                player1.attack(cell.dataset.id)
            })
        }
    }
}


export const numbers = document.createElement("div")
numbers.classList.add("numbers")

if (document.body !== null) {
    document.body.appendChild(numbers)
}


function displayNumbers(classN) {
    for (let i = 1; i <= 10; i++) {
        const number = document.createElement("div")
        number.textContent = i;
        number.classList.add(classN)
        numbers.appendChild(number)
    }
}

displayNumbers("left-nums")
displayNumbers("right-nums")

newGame.addEventListener("click", () => {
    const name = "shakira"

    game().end();

    
    


    /*boardContent(board1, boardOne, "one")
    boardContent(board2, boardTwo, "two")
*/
    
})

const ready = document.querySelector("#ready")
if (ready !== null) {
    ready.addEventListener("click", () => {
        game("test")

        
        
        const cells = document.querySelectorAll(".one")
        cells.forEach(cell => {
            cell.remove();
            
        });

        let med1 = document.querySelector("#med1").value
        med1 = med1.replace(/\s/g, '')
        const arr1 = med1.split(",")
        let med2 = document.querySelector("#med2").value
        med2 = med2.replace(/\s/g, '')
        const arr2 = med2.split(",")
        let med3 = document.querySelector("#med3").value
        med3 = med3.replace(/\s/g, '')
        const arr3 = med3.split(",")
        let big1 = document.querySelector("#big1").value
        big1 = big1.replace(/\s/g, '')
        const arr4 = big1.split(",")
        let big2 = document.querySelector("#big2").value
        big2 = big2.replace(/\s/g, '')
        const arr5 = big2.split(",")
        let large = document.querySelector("#large").value
        large = large.replace(/\s/g, '')
        const arr6 = large.split(",")

        

        board1.shipTo([document.querySelector("#small1").value], 1)
        board1.shipTo([document.querySelector("#small2").value], 2)
        board1.shipTo([document.querySelector("#small3").value], 3)
        board1.shipTo([document.querySelector("#small4").value], 4)
        board1.shipTo(arr1, 5)
        board1.shipTo(arr2, 6)
        board1.shipTo(arr3, 7)
        board1.shipTo(arr4, 8)
        board1.shipTo(arr5, 9)
        board1.shipTo(arr6, 10)

        const cells2 = document.querySelectorAll(".two")
        cells2.forEach(cell => cell.remove())

        boardContent(board1, boardOne, "one");
        boardContent(board2, boardTwo, "two");
    })
}













