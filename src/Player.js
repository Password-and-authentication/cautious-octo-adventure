import { board2, board1, player2, player1, game } from "./game"
import { amount2, amount1 } from "./Board"


export class Player {

    constructor(name, id) {
        this.name = name
        this.id = id
    }

    attack(coordinates) {
        
        if (turn !== this.id) {
            console.log("not your turn")

        } else {

            if (this.id === 1) {
                board2.receiveAttack(coordinates)

                if (board2.checkStatus()) {
                    
                    setTimeout(() => {
                        game(this.name).end();
                    }, 2000);
                    
                    const winner = document.querySelector(".winner")
                    console.log(player1)
                    winner.textContent = `${this.name} is the winner!`
                    winner.style.display = "block";

                    return;
                }
                turn = 2;
                player2.attack();
            } else {
                board1.receiveAttack(aiRandom())

                if (board1.checkStatus()) {
                    setTimeout(() => {
                        game(this.name).end();
                    }, 2000)
                    
                    const winner = document.querySelector(".winner")
                    winner.textContent = `${this.name} is the winner!`
                    winner.style.display = "block"
                    return
                }
                turn = 1;
            } 
        }
    }
}

let turn = 1;
let random;
let arr = [];

export function resetArr() {
    arr = []
}

export function aiRandom() {
    const letters = "ABCDEFGHIJ";
    const letter = letters[Math.floor(Math.random() * 10)]

    const number = Math.floor(Math.random() * 10) + 1;
    random = letter + number
    
    
    if (arr.some(val => val === random)) return aiRandom();
    arr.push(random)
    
    return random
}
