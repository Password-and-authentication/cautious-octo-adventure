/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Board.js":
/*!**********************!*\
  !*** ./src/Board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "amount1": () => (/* binding */ amount1),
/* harmony export */   "board1sunk": () => (/* binding */ board1sunk),
/* harmony export */   "board2sunk": () => (/* binding */ board2sunk),
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard),
/* harmony export */   "resetAmounts": () => (/* binding */ resetAmounts),
/* harmony export */   "twoBox": () => (/* binding */ twoBox)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ships */ "./src/ships.js");




class gameBoard {
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
        const ship = (0,_ships__WEBPACK_IMPORTED_MODULE_1__.getShip)(shipId)
        
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
const twoBox = document.createElement("div")
twoBox.classList.add("twoBox")
display.appendChild(firstBox)
display.appendChild(twoBox)
const board1Caption = document.createElement("h3")
board1Caption.textContent = "Board 1"
const board2Caption = document.createElement("h3")
board2Caption.textContent = "Board 2"

firstBox.appendChild(board1Caption)

const board1sunk = document.createElement("div")
let amount1 = 0;
board1sunk.textContent = `Ships sunk: ${amount1}`
firstBox.appendChild(board1sunk)

twoBox.appendChild(board2Caption)
const board2sunk = document.createElement("div")
let amount2 = 0;
function resetAmounts() {
    amount1 = 0;
    amount2 = 0;
}

board2sunk.textContent = `Ships sunk: ${amount2}`
twoBox.appendChild(board2sunk)














/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "aiRandom": () => (/* binding */ aiRandom),
/* harmony export */   "resetArr": () => (/* binding */ resetArr)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Board */ "./src/Board.js");




class Player {

    constructor(name, id) {
        this.name = name
        this.id = id
    }

    attack(coordinates) {
        
        if (turn !== this.id) {
            console.log("not your turn")

        } else {

            if (this.id === 1) {
                _game__WEBPACK_IMPORTED_MODULE_0__.board2.receiveAttack(coordinates)

                if (_game__WEBPACK_IMPORTED_MODULE_0__.board2.checkStatus()) {
                    
                    setTimeout(() => {
                        (0,_game__WEBPACK_IMPORTED_MODULE_0__.game)(this.name).end();
                    }, 2000);
                    
                    const winner = document.querySelector(".winner")
                    console.log(_game__WEBPACK_IMPORTED_MODULE_0__.player1)
                    winner.textContent = `${this.name} is the winner!`
                    winner.style.display = "block";

                    return;
                }
                turn = 2;
                _game__WEBPACK_IMPORTED_MODULE_0__.player2.attack();
            } else {
                _game__WEBPACK_IMPORTED_MODULE_0__.board1.receiveAttack(aiRandom())

                if (_game__WEBPACK_IMPORTED_MODULE_0__.board1.checkStatus()) {
                    setTimeout(() => {
                        (0,_game__WEBPACK_IMPORTED_MODULE_0__.game)(this.name).end();
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

function resetArr() {
    arr = []
}

function aiRandom() {
    const letters = "ABCDEFGHIJ";
    const letter = letters[Math.floor(Math.random() * 10)]

    const number = Math.floor(Math.random() * 10) + 1;
    random = letter + number
    
    
    if (arr.some(val => val === random)) return aiRandom();
    arr.push(random)
    
    return random
}


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "board1": () => (/* binding */ board1),
/* harmony export */   "board2": () => (/* binding */ board2),
/* harmony export */   "game": () => (/* binding */ game),
/* harmony export */   "newGame": () => (/* binding */ newGame),
/* harmony export */   "player1": () => (/* binding */ player1),
/* harmony export */   "player2": () => (/* binding */ player2)
/* harmony export */ });
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ "./src/Board.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ "./src/Player.js");
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ships */ "./src/ships.js");








let board1;
let board2;
let player1;
let player2;





function game(userName, isFirst) {

    
    
    
    board1 = new _Board__WEBPACK_IMPORTED_MODULE_0__.gameBoard(1)
    board2 = new _Board__WEBPACK_IMPORTED_MODULE_0__.gameBoard(2)

    

    player1 = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player(userName, 1)
    player2 = new _Player__WEBPACK_IMPORTED_MODULE_1__.Player("ai", 2)

    
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(1, 1)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(1, 2)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(1, 3)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(1, 4)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(2, 5)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(2, 6)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(2, 7)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(3, 8)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(3, 9)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(4, 10)

    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(1, 11)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(1, 12)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(1, 13)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(1, 14)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(2, 15)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(2, 16)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(2, 17)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(3, 18)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(3, 19)
    ;(0,_ships__WEBPACK_IMPORTED_MODULE_2__.makeShip)(4, 20)
    
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

                    ;(0,_Board__WEBPACK_IMPORTED_MODULE_0__.resetAmounts)();
                    (0,_Player__WEBPACK_IMPORTED_MODULE_1__.resetArr)();
                    
                    _Board__WEBPACK_IMPORTED_MODULE_0__.board1sunk.textContent = "Ships sunk: "
                    _Board__WEBPACK_IMPORTED_MODULE_0__.board2sunk.textContent = "Ships sunk: "
                    
                }
            )   
            
        }
        
    }
}





const main = document.querySelector(".main")

const newGame = document.createElement("button")
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














/***/ }),

/***/ "./src/ships.js":
/*!**********************!*\
  !*** ./src/ships.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getShip": () => (/* binding */ getShip),
/* harmony export */   "makeShip": () => (/* binding */ makeShip),
/* harmony export */   "ships": () => (/* binding */ ships)
/* harmony export */ });
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ "./src/Board.js");


const ships = [];


const makeShip = (length, id) => {
    const body = boatBody(length)
    const obj = {
        id,
        body,
        isHit: () => {
            return body.some(x => x === true)
        },
        isSunk: () => {
            console.log(body.every(x => x === true))
            return body.every(x => x === true)
        },
        hit: (idx) => {
            body[idx] = true
        },
        coordinates: []
    }
    ships.push(obj)
    
    return obj
}

function getShip(id) {
    
    return ships.find(ship => ship.id === id)
}


function boatBody(length) {
    let arr = []
    for (let i = 0; i < length; i++) {
        arr.push(false)
    }
    return arr
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Player.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS8uL3NyYy9Cb2FyZC5qcyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgZ2V0U2hpcCB9IGZyb20gXCIuL3NoaXBzXCJcbmltcG9ydCB7IHBsYXllcjEgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmV4cG9ydCBjbGFzcyBnYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKGlkKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmlkID0gaWRcbiAgICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgICAgICB0aGlzLmhpdHMgPSBbXTtcbiAgICAgICAgdGhpcy5taXNzZWQgPSBbXTtcbiAgICAgICAgdGhpcy5jb29yZGluYXRlc0xlbmd0aCA9IDA7XG5cbiAgICAgICAgY29uc3QgY2VsbHNQZXJSb3cgPSAxMDtcbiAgICAgICAgY29uc3QgbGV0dGVycyA9IFwiQUJDREVGR0hJSlwiO1xuICAgICAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5wb3coY2VsbHNQZXJSb3csIDIpOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHtcbiAgICAgICAgICAgIGNvbDogTWF0aC5mbG9vcihpIC8gY2VsbHNQZXJSb3cpICsgMSxcbiAgICAgICAgICAgIHJvdyA6IGkgJSBjZWxsc1BlclJvdyxcbiAgICAgICAgICAgIGlkOiBcIlwiLFxuICAgICAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgICAgIGJ1c3k6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIGNlbGwuaWQgPSBgJHtsZXR0ZXJzW2NlbGwucm93XX0ke2NlbGwuY29sfWA7XG4gICAgICAgIGJvYXJkLnB1c2goY2VsbCk7XG5cbiAgICAgICAgfSAgICAgIFxuICAgIH0gXG4gICAgXG4gICAgc2hpcFRvKGNvb3JkaW5hdGVzLCBzaGlwSWQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuZmluZChjZWxsID0+IGNlbGwuaWQgPT09IGNvb3JkKS5idXN5ID0gdHJ1ZTsgXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IHNoaXAgPSBnZXRTaGlwKHNoaXBJZClcbiAgICAgICAgXG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcClcblxuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoICs9IGNvb3JkaW5hdGVzLmxlbmd0aFxuICAgIH0gIFxuXG4gICAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuXG4gICAgICAgIGlmICh0aGlzLmlkID09PSAyKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxseSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC50d29bZGF0YS1pZD1cIiR7Y29vcmRpbmF0ZXN9XCJdYClcbiAgICAgICAgICAgIGNlbGx5LmNsYXNzTGlzdC5yZW1vdmUoXCJjZWxsdHdvXCIpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBsZXQgY2xhc3NJZDtcbiAgICAgICAgdGhpcy5pZCA9PT0gMSA/IGNsYXNzSWQgPSBcIm9uZVwiIDogY2xhc3NJZCA9IFwidHdvXCJcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNlbGxET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc0lkfVtkYXRhLWlkPVwiJHtjb29yZGluYXRlc31cIl1gKVxuICAgICAgICBcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmQuZmluZChjZWxsID0+IGNlbGwuaWQgPT09IGNvb3JkaW5hdGVzKVxuICAgICAgICBcbiAgICAgICAgaWYgKGNlbGwuYnVzeSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNlbGxET00uY2xhc3NMaXN0LmFkZChcIm1pc3NcIilcbiAgICAgICAgICAgIHRoaXMubWlzc2VkLnB1c2goY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgYm9hcmQgJHt0aGlzLmlkfSwgbWlzc2VzICR7dGhpcy5taXNzZWR9YClcblxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGl0cy5pbmRleE9mKGNvb3JkaW5hdGVzKSAhPSAtMSkge1xuICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgdGhpcy5oaXRzLnB1c2goY29vcmRpbmF0ZXMpXG4gICAgICAgIFxuICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzLnNvbWUoY29vcmQgPT4gY29vcmQgPT09IGNvb3JkaW5hdGVzKSkge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5pY2VcIilcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHNoaXAuY29vcmRpbmF0ZXMuaW5kZXhPZihjb29yZGluYXRlcylcbiAgICAgICAgICAgIHNoaXAuaGl0KGlkeCk7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaWQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50MSArPSAxO1xuICAgICAgICAgICAgICAgICAgICBib2FyZDFzdW5rLnRleHRDb250ZW50ID0gYFNoaXBzIHN1bmsgJHthbW91bnQxfWA7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYW1vdW50MiArPSAxO1xuICAgICAgICAgICAgICAgICAgICBib2FyZDJzdW5rLnRleHRDb250ZW50ID0gYFNoaXBzIHN1bms6ICR7YW1vdW50Mn1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGNlbGxET00uY2xhc3NMaXN0LmFkZChcImhpdFwiKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH0pXG5cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKGBib2FyZCAke3RoaXMuaWR9LMKgaGl0cyAke3RoaXMuaGl0c31gKVxuICAgICAgICAgICAgXG4gICAgfVxuICAgIGNoZWNrU3RhdHVzKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRpbmF0ZXNMZW5ndGggPT09IHRoaXMuaGl0cy5sZW5ndGhcbiAgICB9XG4gICAgICAgXG59XG5cbmNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5kaXNwbGF5LmNsYXNzTGlzdC5hZGQoXCJkaXNwbGF5XCIpXG5pZiAoZG9jdW1lbnQuYm9keSAhPT0gbnVsbCkgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXNwbGF5KVxuXG5jb25zdCBmaXJzdEJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbmZpcnN0Qm94LmNsYXNzTGlzdC5hZGQoXCJmaXJzdEJveFwiKVxuZXhwb3J0IGNvbnN0IHR3b0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbnR3b0JveC5jbGFzc0xpc3QuYWRkKFwidHdvQm94XCIpXG5kaXNwbGF5LmFwcGVuZENoaWxkKGZpcnN0Qm94KVxuZGlzcGxheS5hcHBlbmRDaGlsZCh0d29Cb3gpXG5jb25zdCBib2FyZDFDYXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXG5ib2FyZDFDYXB0aW9uLnRleHRDb250ZW50ID0gXCJCb2FyZCAxXCJcbmNvbnN0IGJvYXJkMkNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcbmJvYXJkMkNhcHRpb24udGV4dENvbnRlbnQgPSBcIkJvYXJkIDJcIlxuXG5maXJzdEJveC5hcHBlbmRDaGlsZChib2FyZDFDYXB0aW9uKVxuXG5leHBvcnQgY29uc3QgYm9hcmQxc3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbmV4cG9ydCBsZXQgYW1vdW50MSA9IDA7XG5ib2FyZDFzdW5rLnRleHRDb250ZW50ID0gYFNoaXBzIHN1bms6ICR7YW1vdW50MX1gXG5maXJzdEJveC5hcHBlbmRDaGlsZChib2FyZDFzdW5rKVxuXG50d29Cb3guYXBwZW5kQ2hpbGQoYm9hcmQyQ2FwdGlvbilcbmV4cG9ydCBjb25zdCBib2FyZDJzdW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxubGV0IGFtb3VudDIgPSAwO1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0QW1vdW50cygpIHtcbiAgICBhbW91bnQxID0gMDtcbiAgICBhbW91bnQyID0gMDtcbn1cblxuYm9hcmQyc3Vuay50ZXh0Q29udGVudCA9IGBTaGlwcyBzdW5rOiAke2Ftb3VudDJ9YFxudHdvQm94LmFwcGVuZENoaWxkKGJvYXJkMnN1bmspXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQgeyBib2FyZDIsIGJvYXJkMSwgcGxheWVyMiwgcGxheWVyMSwgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIlxuaW1wb3J0IHsgYW1vdW50MiwgYW1vdW50MSB9IGZyb20gXCIuL0JvYXJkXCJcblxuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5pZCA9IGlkXG4gICAgfVxuXG4gICAgYXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodHVybiAhPT0gdGhpcy5pZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgeW91ciB0dXJuXCIpXG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaWQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBib2FyZDIucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcylcblxuICAgICAgICAgICAgICAgIGlmIChib2FyZDIuY2hlY2tTdGF0dXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lKHRoaXMubmFtZSkuZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXJcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGxheWVyMSlcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyLnRleHRDb250ZW50ID0gYCR7dGhpcy5uYW1lfSBpcyB0aGUgd2lubmVyIWBcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0dXJuID0gMjtcbiAgICAgICAgICAgICAgICBwbGF5ZXIyLmF0dGFjaygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2FyZDEucmVjZWl2ZUF0dGFjayhhaVJhbmRvbSgpKVxuXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkMS5jaGVja1N0YXR1cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZSh0aGlzLm5hbWUpLmVuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXJcIilcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyLnRleHRDb250ZW50ID0gYCR7dGhpcy5uYW1lfSBpcyB0aGUgd2lubmVyIWBcbiAgICAgICAgICAgICAgICAgICAgd2lubmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHR1cm4gPSAxO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgIH1cbn1cblxubGV0IHR1cm4gPSAxO1xubGV0IHJhbmRvbTtcbmxldCBhcnIgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0QXJyKCkge1xuICAgIGFyciA9IFtdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhaVJhbmRvbSgpIHtcbiAgICBjb25zdCBsZXR0ZXJzID0gXCJBQkNERUZHSElKXCI7XG4gICAgY29uc3QgbGV0dGVyID0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldXG5cbiAgICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIHJhbmRvbSA9IGxldHRlciArIG51bWJlclxuICAgIFxuICAgIFxuICAgIGlmIChhcnIuc29tZSh2YWwgPT4gdmFsID09PSByYW5kb20pKSByZXR1cm4gYWlSYW5kb20oKTtcbiAgICBhcnIucHVzaChyYW5kb20pXG4gICAgXG4gICAgcmV0dXJuIHJhbmRvbVxufVxuIiwiXG5cbmltcG9ydCB7IGdhbWVCb2FyZCwgYW1vdW50MiwgYW1vdW50MSwgYm9hcmQxc3VuaywgYm9hcmQyc3VuaywgcmVzZXRBbW91bnRzIH0gZnJvbSBcIi4vQm9hcmRcIjtcbmltcG9ydCB7IFBsYXllciwgYWlSYW5kb20sIHJlc2V0QXJyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQge21ha2VTaGlwfSBmcm9tIFwiLi9zaGlwc1wiO1xuXG5cblxuZXhwb3J0IGxldCBib2FyZDE7XG5leHBvcnQgbGV0IGJvYXJkMjtcbmV4cG9ydCBsZXQgcGxheWVyMTtcbmV4cG9ydCBsZXQgcGxheWVyMjtcblxuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZSh1c2VyTmFtZSwgaXNGaXJzdCkge1xuXG4gICAgXG4gICAgXG4gICAgXG4gICAgYm9hcmQxID0gbmV3IGdhbWVCb2FyZCgxKVxuICAgIGJvYXJkMiA9IG5ldyBnYW1lQm9hcmQoMilcblxuICAgIFxuXG4gICAgcGxheWVyMSA9IG5ldyBQbGF5ZXIodXNlck5hbWUsIDEpXG4gICAgcGxheWVyMiA9IG5ldyBQbGF5ZXIoXCJhaVwiLCAyKVxuXG4gICAgXG4gICAgbWFrZVNoaXAoMSwgMSlcbiAgICBtYWtlU2hpcCgxLCAyKVxuICAgIG1ha2VTaGlwKDEsIDMpXG4gICAgbWFrZVNoaXAoMSwgNClcbiAgICBtYWtlU2hpcCgyLCA1KVxuICAgIG1ha2VTaGlwKDIsIDYpXG4gICAgbWFrZVNoaXAoMiwgNylcbiAgICBtYWtlU2hpcCgzLCA4KVxuICAgIG1ha2VTaGlwKDMsIDkpXG4gICAgbWFrZVNoaXAoNCwgMTApXG5cbiAgICBtYWtlU2hpcCgxLCAxMSlcbiAgICBtYWtlU2hpcCgxLCAxMilcbiAgICBtYWtlU2hpcCgxLCAxMylcbiAgICBtYWtlU2hpcCgxLCAxNClcbiAgICBtYWtlU2hpcCgyLCAxNSlcbiAgICBtYWtlU2hpcCgyLCAxNilcbiAgICBtYWtlU2hpcCgyLCAxNylcbiAgICBtYWtlU2hpcCgzLCAxOClcbiAgICBtYWtlU2hpcCgzLCAxOSlcbiAgICBtYWtlU2hpcCg0LCAyMClcbiAgICBcbiAgICBlbmVteUJvYXJkKCk7XG5cbiAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICBpbml0YWxTaGlwUGxhY2VtZW50KCk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB7XG4gICAgICAgIHBsYXllcjEsXG4gICAgICAgIHBsYXllcjIsXG4gICAgICAgIGJvYXJkMSxcbiAgICAgICAgYm9hcmQyLFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgYm9hcmQxID0gbnVsbDtcbiAgICAgICAgICAgIGJvYXJkMiA9IG51bGw7XG4gICAgICAgICAgICBwbGF5ZXIxID0gbnVsbDtcbiAgICAgICAgICAgIHBsYXllcjIgPSBudWxsO1xuXG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2VsbFwiKVxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiYnVzeVwiKVxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJoaXRcIilcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwibWlzc1wiKVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0QW1vdW50cygpO1xuICAgICAgICAgICAgICAgICAgICByZXNldEFycigpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQxc3Vuay50ZXh0Q29udGVudCA9IFwiU2hpcHMgc3VuazogXCJcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQyc3Vuay50ZXh0Q29udGVudCA9IFwiU2hpcHMgc3VuazogXCJcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuXG5cblxuXG5cbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIilcblxuZXhwb3J0IGNvbnN0IG5ld0dhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG5uZXdHYW1lLnRleHRDb250ZW50ID0gXCJOZXcgR2FtZVwiXG5uZXdHYW1lLmNsYXNzTGlzdC5hZGQoXCJuZXctZ2FtZVwiKVxuXG5pZiAoZG9jdW1lbnQuYm9keSAhPT0gbnVsbCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobmV3R2FtZSlcbn1cblxuXG5mdW5jdGlvbiBpbml0YWxTaGlwUGxhY2VtZW50KCkge1xuICAgIGJvYXJkMS5zaGlwVG8oW1wiQTFcIl0sIDEpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJBN1wiXSwgMilcbiAgICBib2FyZDEuc2hpcFRvKFtcIkgxXCJdLCAzKVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiSDRcIl0sIDQpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJDMTBcIiwgXCJEMTBcIl0sIDUpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJBNVwiLCBcIkI1XCJdLCA2KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiSjVcIiwgXCJKNlwiXSwgNylcbiAgICBib2FyZDEuc2hpcFRvKFtcIkQzXCIsIFwiRTNcIiwgXCJGM1wiXSwgOClcbiAgICBib2FyZDEuc2hpcFRvKFtcIkU1XCIsIFwiRTZcIiwgXCJFN1wiXSwgOSlcbiAgICBib2FyZDEuc2hpcFRvKFtcIkYxMFwiLCBcIkcxMFwiLCBcIkgxMFwiLCBcIkkxMFwiXSwgMTApXG59XG4vKlxuXG5VTlVTRUQgQ09ERSA6KFxuXG5jb25zdCBhcnJheSA9IFtdO1xubGV0IHJhbmRvbTtcbmxldCBudW1iZXI7XG5sZXQgbGV0dGVyO1xubGV0IGxldHRlcnM7XG5sZXQgbmV4dExldHRlcjtcbmxldCBuZXh0O1xuXG5mdW5jdGlvbiBhaUJvYXJkKCkge1xuICAgIGxldHRlcnMgPSBcIkFCQ0RFRkdISUpcIjtcbiAgICBsZXQgbGV0dGVyID0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldXG4gICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cbiAgICByYW5kb20gPSBsZXR0ZXIgKyBudW1iZXI7XG4gICAgbGV0IGxlZnQgPSBsZXR0ZXJzW2xldHRlcnMuaW5kZXhPZihyYW5kb21bMF0pIC0gMV07XG4gICAgbGVmdCArPSBudW1iZXI7XG4gICAgbGV0IHJpZ2h0ID0gbGV0dGVyc1tsZXR0ZXJzLmluZGV4T2YocmFuZG9tWzBdKSArIDFdO1xuICAgIHJpZ2h0ICs9IG51bWJlcjtcbiAgICBsZXQgYm90ID0gbnVtYmVyICsgMTtcbiAgICBsZXQgdG9wID0gbnVtYmVyIC0gMTtcbiAgICBcbiAgICBpZiAoXG4gICAgICAgIGFycmF5LnNvbWUoeCA9PiB4ID09PSByYW5kb20pIHx8IGFycmF5LnNvbWUoeCA9PiB4ID09PSBsZWZ0KVxuICAgICAgIHx8IGFycmF5LnNvbWUoeCA9PiB4ID09PSByaWdodCl8fCBhcnJheS5zb21lKHggPT4geCA9PT0gYm90KVxuICAgICAgIHx8IGFycmF5LnNvbWUoeCA9PiB4ID09PSB0b3ApKSBhaUJvYXJkKCk7XG4gICAgYXJyYXkucHVzaChyYW5kb20pXG4gICAgYXJyYXkucHVzaChsZWZ0KVxuICAgIGFycmF5LnB1c2gocmlnaHQpXG4gICAgYXJyYXkucHVzaChib3QpXG5cbiAgICByZXR1cm4ge1xuICAgICAgICByYW5kb20sXG4gICAgICAgIGxldHRlcixcbiAgICAgICAgbnVtYmVyXG4gICAgfVxufVxuKi9cblxuZnVuY3Rpb24gZW5lbXlCb2FyZCgpIHtcbiAgICBcbiAgICBib2FyZDIuc2hpcFRvKFtcIkgxMFwiXSwgMTEpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJDMVwiXSwgMTIpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJBOFwiXSwgMTMpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJKOVwiXSwgMTQpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJJMVwiLCBcIkoxXCJdLCAxNSlcbiAgICBib2FyZDIuc2hpcFRvKFtcIkYxXCIsIFwiRjJcIl0sIDE2KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSTZcIiwgXCJKNlwiXSwgMTcpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJEOVwiLCBcIkU5XCIsIFwiRjlcIl0sIDE4KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiRTVcIiwgXCJFNlwiLCBcIkU3XCJdLCAxOSlcbiAgICBib2FyZDIuc2hpcFRvKFtcIkExXCIsIFwiQTJcIiwgXCJBM1wiLCBcIkE0XCJdLCAyMClcbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsImltcG9ydCB7IGdldEJvYXJkIH0gZnJvbSBcIi4vQm9hcmRcIjtcblxuZXhwb3J0IGNvbnN0IHNoaXBzID0gW107XG5cblxuZXhwb3J0IGNvbnN0IG1ha2VTaGlwID0gKGxlbmd0aCwgaWQpID0+IHtcbiAgICBjb25zdCBib2R5ID0gYm9hdEJvZHkobGVuZ3RoKVxuICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgaWQsXG4gICAgICAgIGJvZHksXG4gICAgICAgIGlzSGl0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYm9keS5zb21lKHggPT4geCA9PT0gdHJ1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhib2R5LmV2ZXJ5KHggPT4geCA9PT0gdHJ1ZSkpXG4gICAgICAgICAgICByZXR1cm4gYm9keS5ldmVyeSh4ID0+IHggPT09IHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIGhpdDogKGlkeCkgPT4ge1xuICAgICAgICAgICAgYm9keVtpZHhdID0gdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjb29yZGluYXRlczogW11cbiAgICB9XG4gICAgc2hpcHMucHVzaChvYmopXG4gICAgXG4gICAgcmV0dXJuIG9ialxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcChpZCkge1xuICAgIFxuICAgIHJldHVybiBzaGlwcy5maW5kKHNoaXAgPT4gc2hpcC5pZCA9PT0gaWQpXG59XG5cblxuZnVuY3Rpb24gYm9hdEJvZHkobGVuZ3RoKSB7XG4gICAgbGV0IGFyciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBhcnIucHVzaChmYWxzZSlcbiAgICB9XG4gICAgcmV0dXJuIGFyclxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9QbGF5ZXIuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=