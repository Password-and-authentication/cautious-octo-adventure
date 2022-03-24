import { board2, board1, player2, player1, game } from "./game"


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
                    game(player1.name).end();
                    return
                }
                turn = 2;
                player2.attack();
            } else {
                board1.receiveAttack(aiRandom())

                if (board1.checkStatus()) {
                    game(player2.name).end();
                    return
                }
                turn = 1;
            } 
        }
    }
}

let turn = 1;
export let random;
const arr = [];


export function aiRandom() {
    const letters = "ABCDEFGHIJ";
    const letter = letters[Math.floor(Math.random() * 10)]

    const number = Math.floor(Math.random() * 10) + 1;
    random = letter + number
    
    
    if (arr.some(val => val === random)) return aiRandom();
    arr.push(random)


    
    return random
}
