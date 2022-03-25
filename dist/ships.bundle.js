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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ships.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3ZDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL0JvYXJkLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBnZXRTaGlwIH0gZnJvbSBcIi4vc2hpcHNcIlxuaW1wb3J0IHsgcGxheWVyMSB9IGZyb20gXCIuL2dhbWVcIjtcblxuZXhwb3J0IGNsYXNzIGdhbWVCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoaWQpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaWQgPSBpZFxuICAgICAgICB0aGlzLnNoaXBzID0gW107XG4gICAgICAgIHRoaXMuaGl0cyA9IFtdO1xuICAgICAgICB0aGlzLm1pc3NlZCA9IFtdO1xuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoID0gMDtcblxuICAgICAgICBjb25zdCBjZWxsc1BlclJvdyA9IDEwO1xuICAgICAgICBjb25zdCBsZXR0ZXJzID0gXCJBQkNERUZHSElKXCI7XG4gICAgICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLnBvdyhjZWxsc1BlclJvdywgMik7IGkrKykge1xuICAgICAgICBjb25zdCBjZWxsID0ge1xuICAgICAgICAgICAgY29sOiBNYXRoLmZsb29yKGkgLyBjZWxsc1BlclJvdykgKyAxLFxuICAgICAgICAgICAgcm93IDogaSAlIGNlbGxzUGVyUm93LFxuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgICAgICAgYnVzeTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2VsbC5pZCA9IGAke2xldHRlcnNbY2VsbC5yb3ddfSR7Y2VsbC5jb2x9YDtcbiAgICAgICAgYm9hcmQucHVzaChjZWxsKTtcblxuICAgICAgICB9ICAgICAgXG4gICAgfSBcbiAgICBcbiAgICBzaGlwVG8oY29vcmRpbmF0ZXMsIHNoaXBJZCkge1xuICAgICAgICBcbiAgICAgICAgY29vcmRpbmF0ZXMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5ib2FyZC5maW5kKGNlbGwgPT4gY2VsbC5pZCA9PT0gY29vcmQpLmJ1c3kgPSB0cnVlOyBcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3Qgc2hpcCA9IGdldFNoaXAoc2hpcElkKVxuICAgICAgICBcbiAgICAgICAgc2hpcC5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKVxuXG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXNMZW5ndGggKz0gY29vcmRpbmF0ZXMubGVuZ3RoXG4gICAgfSAgXG5cbiAgICByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaWQgPT09IDIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGx5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnR3b1tkYXRhLWlkPVwiJHtjb29yZGluYXRlc31cIl1gKVxuICAgICAgICAgICAgY2VsbHkuY2xhc3NMaXN0LnJlbW92ZShcImNlbGx0d29cIilcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIGxldCBjbGFzc0lkO1xuICAgICAgICB0aGlzLmlkID09PSAxID8gY2xhc3NJZCA9IFwib25lXCIgOiBjbGFzc0lkID0gXCJ0d29cIlxuICAgICAgICBcbiAgICAgICAgY29uc3QgY2VsbERPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzSWR9W2RhdGEtaWQ9XCIke2Nvb3JkaW5hdGVzfVwiXWApXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ib2FyZC5maW5kKGNlbGwgPT4gY2VsbC5pZCA9PT0gY29vcmRpbmF0ZXMpXG4gICAgICAgIFxuICAgICAgICBpZiAoY2VsbC5idXN5ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY2VsbERPTS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKVxuICAgICAgICAgICAgdGhpcy5taXNzZWQucHVzaChjb29yZGluYXRlcylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBib2FyZCAke3RoaXMuaWR9LCBtaXNzZXMgJHt0aGlzLm1pc3NlZH1gKVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oaXRzLmluZGV4T2YoY29vcmRpbmF0ZXMpICE9IC0xKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmhpdHMucHVzaChjb29yZGluYXRlcylcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXMuc29tZShjb29yZCA9PiBjb29yZCA9PT0gY29vcmRpbmF0ZXMpKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmljZVwiKVxuICAgICAgICAgICAgY29uc3QgaWR4ID0gc2hpcC5jb29yZGluYXRlcy5pbmRleE9mKGNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgc2hpcC5oaXQoaWR4KTtcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBhbW91bnQxICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkMXN1bmsudGV4dENvbnRlbnQgPSBgU2hpcHMgc3VuayAke2Ftb3VudDF9YDtcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbW91bnQyICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkMnN1bmsudGV4dENvbnRlbnQgPSBgU2hpcHMgc3VuazogJHthbW91bnQyfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY2VsbERPTS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfSlcblxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coYGJvYXJkICR7dGhpcy5pZH0swqBoaXRzICR7dGhpcy5oaXRzfWApXG4gICAgICAgICAgICBcbiAgICB9XG4gICAgY2hlY2tTdGF0dXMoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5jb29yZGluYXRlc0xlbmd0aCA9PT0gdGhpcy5oaXRzLmxlbmd0aFxuICAgIH1cbiAgICAgICBcbn1cblxuY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbmRpc3BsYXkuY2xhc3NMaXN0LmFkZChcImRpc3BsYXlcIilcbmlmIChkb2N1bWVudC5ib2R5ICE9PSBudWxsKSBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpc3BsYXkpXG5cbmNvbnN0IGZpcnN0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuZmlyc3RCb3guY2xhc3NMaXN0LmFkZChcImZpcnN0Qm94XCIpXG5leHBvcnQgY29uc3QgdHdvQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxudHdvQm94LmNsYXNzTGlzdC5hZGQoXCJ0d29Cb3hcIilcbmRpc3BsYXkuYXBwZW5kQ2hpbGQoZmlyc3RCb3gpXG5kaXNwbGF5LmFwcGVuZENoaWxkKHR3b0JveClcbmNvbnN0IGJvYXJkMUNhcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcbmJvYXJkMUNhcHRpb24udGV4dENvbnRlbnQgPSBcIkJvYXJkIDFcIlxuY29uc3QgYm9hcmQyQ2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxuYm9hcmQyQ2FwdGlvbi50ZXh0Q29udGVudCA9IFwiQm9hcmQgMlwiXG5cbmZpcnN0Qm94LmFwcGVuZENoaWxkKGJvYXJkMUNhcHRpb24pXG5cbmV4cG9ydCBjb25zdCBib2FyZDFzdW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuZXhwb3J0IGxldCBhbW91bnQxID0gMDtcbmJvYXJkMXN1bmsudGV4dENvbnRlbnQgPSBgU2hpcHMgc3VuazogJHthbW91bnQxfWBcbmZpcnN0Qm94LmFwcGVuZENoaWxkKGJvYXJkMXN1bmspXG5cbnR3b0JveC5hcHBlbmRDaGlsZChib2FyZDJDYXB0aW9uKVxuZXhwb3J0IGNvbnN0IGJvYXJkMnN1bmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5sZXQgYW1vdW50MiA9IDA7XG5leHBvcnQgZnVuY3Rpb24gcmVzZXRBbW91bnRzKCkge1xuICAgIGFtb3VudDEgPSAwO1xuICAgIGFtb3VudDIgPSAwO1xufVxuXG5ib2FyZDJzdW5rLnRleHRDb250ZW50ID0gYFNoaXBzIHN1bms6ICR7YW1vdW50Mn1gXG50d29Cb3guYXBwZW5kQ2hpbGQoYm9hcmQyc3VuaylcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsImltcG9ydCB7IGJvYXJkMiwgYm9hcmQxLCBwbGF5ZXIyLCBwbGF5ZXIxLCBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiXG5pbXBvcnQgeyBhbW91bnQyLCBhbW91bnQxIH0gZnJvbSBcIi4vQm9hcmRcIlxuXG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgaWQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmlkID0gaWRcbiAgICB9XG5cbiAgICBhdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgXG4gICAgICAgIGlmICh0dXJuICE9PSB0aGlzLmlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCB5b3VyIHR1cm5cIilcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGJvYXJkMi5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKVxuXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkMi5jaGVja1N0YXR1cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUodGhpcy5uYW1lKS5lbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lclwiKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIxKVxuICAgICAgICAgICAgICAgICAgICB3aW5uZXIudGV4dENvbnRlbnQgPSBgJHt0aGlzLm5hbWV9IGlzIHRoZSB3aW5uZXIhYFxuICAgICAgICAgICAgICAgICAgICB3aW5uZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHR1cm4gPSAyO1xuICAgICAgICAgICAgICAgIHBsYXllcjIuYXR0YWNrKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvYXJkMS5yZWNlaXZlQXR0YWNrKGFpUmFuZG9tKCkpXG5cbiAgICAgICAgICAgICAgICBpZiAoYm9hcmQxLmNoZWNrU3RhdHVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lKHRoaXMubmFtZSkuZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lclwiKVxuICAgICAgICAgICAgICAgICAgICB3aW5uZXIudGV4dENvbnRlbnQgPSBgJHt0aGlzLm5hbWV9IGlzIHRoZSB3aW5uZXIhYFxuICAgICAgICAgICAgICAgICAgICB3aW5uZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIlxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHVybiA9IDE7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgfVxufVxuXG5sZXQgdHVybiA9IDE7XG5sZXQgcmFuZG9tO1xubGV0IGFyciA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRBcnIoKSB7XG4gICAgYXJyID0gW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFpUmFuZG9tKCkge1xuICAgIGNvbnN0IGxldHRlcnMgPSBcIkFCQ0RFRkdISUpcIjtcbiAgICBjb25zdCBsZXR0ZXIgPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV1cblxuICAgIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgcmFuZG9tID0gbGV0dGVyICsgbnVtYmVyXG4gICAgXG4gICAgXG4gICAgaWYgKGFyci5zb21lKHZhbCA9PiB2YWwgPT09IHJhbmRvbSkpIHJldHVybiBhaVJhbmRvbSgpO1xuICAgIGFyci5wdXNoKHJhbmRvbSlcbiAgICBcbiAgICByZXR1cm4gcmFuZG9tXG59XG4iLCJcblxuaW1wb3J0IHsgZ2FtZUJvYXJkLCBhbW91bnQyLCBhbW91bnQxLCBib2FyZDFzdW5rLCBib2FyZDJzdW5rLCByZXNldEFtb3VudHMgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyLCBhaVJhbmRvbSwgcmVzZXRBcnIgfSBmcm9tIFwiLi9QbGF5ZXJcIjtcbmltcG9ydCB7bWFrZVNoaXB9IGZyb20gXCIuL3NoaXBzXCI7XG5cblxuXG5leHBvcnQgbGV0IGJvYXJkMTtcbmV4cG9ydCBsZXQgYm9hcmQyO1xuZXhwb3J0IGxldCBwbGF5ZXIxO1xuZXhwb3J0IGxldCBwbGF5ZXIyO1xuXG5cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lKHVzZXJOYW1lLCBpc0ZpcnN0KSB7XG5cbiAgICBcbiAgICBcbiAgICBcbiAgICBib2FyZDEgPSBuZXcgZ2FtZUJvYXJkKDEpXG4gICAgYm9hcmQyID0gbmV3IGdhbWVCb2FyZCgyKVxuXG4gICAgXG5cbiAgICBwbGF5ZXIxID0gbmV3IFBsYXllcih1c2VyTmFtZSwgMSlcbiAgICBwbGF5ZXIyID0gbmV3IFBsYXllcihcImFpXCIsIDIpXG5cbiAgICBcbiAgICBtYWtlU2hpcCgxLCAxKVxuICAgIG1ha2VTaGlwKDEsIDIpXG4gICAgbWFrZVNoaXAoMSwgMylcbiAgICBtYWtlU2hpcCgxLCA0KVxuICAgIG1ha2VTaGlwKDIsIDUpXG4gICAgbWFrZVNoaXAoMiwgNilcbiAgICBtYWtlU2hpcCgyLCA3KVxuICAgIG1ha2VTaGlwKDMsIDgpXG4gICAgbWFrZVNoaXAoMywgOSlcbiAgICBtYWtlU2hpcCg0LCAxMClcblxuICAgIG1ha2VTaGlwKDEsIDExKVxuICAgIG1ha2VTaGlwKDEsIDEyKVxuICAgIG1ha2VTaGlwKDEsIDEzKVxuICAgIG1ha2VTaGlwKDEsIDE0KVxuICAgIG1ha2VTaGlwKDIsIDE1KVxuICAgIG1ha2VTaGlwKDIsIDE2KVxuICAgIG1ha2VTaGlwKDIsIDE3KVxuICAgIG1ha2VTaGlwKDMsIDE4KVxuICAgIG1ha2VTaGlwKDMsIDE5KVxuICAgIG1ha2VTaGlwKDQsIDIwKVxuICAgIFxuICAgIGVuZW15Qm9hcmQoKTtcblxuICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIGluaXRhbFNoaXBQbGFjZW1lbnQoKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxheWVyMSxcbiAgICAgICAgcGxheWVyMixcbiAgICAgICAgYm9hcmQxLFxuICAgICAgICBib2FyZDIsXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgXG4gICAgICAgICAgICBib2FyZDEgPSBudWxsO1xuICAgICAgICAgICAgYm9hcmQyID0gbnVsbDtcbiAgICAgICAgICAgIHBsYXllcjEgPSBudWxsO1xuICAgICAgICAgICAgcGxheWVyMiA9IG51bGw7XG5cbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpXG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJidXN5XCIpXG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImhpdFwiKVxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJtaXNzXCIpXG5cbiAgICAgICAgICAgICAgICAgICAgcmVzZXRBbW91bnRzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0QXJyKCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBib2FyZDFzdW5rLnRleHRDb250ZW50ID0gXCJTaGlwcyBzdW5rOiBcIlxuICAgICAgICAgICAgICAgICAgICBib2FyZDJzdW5rLnRleHRDb250ZW50ID0gXCJTaGlwcyBzdW5rOiBcIlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59XG5cblxuXG5cblxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKVxuXG5leHBvcnQgY29uc3QgbmV3R2FtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbm5ld0dhbWUudGV4dENvbnRlbnQgPSBcIk5ldyBHYW1lXCJcbm5ld0dhbWUuY2xhc3NMaXN0LmFkZChcIm5ldy1nYW1lXCIpXG5cbmlmIChkb2N1bWVudC5ib2R5ICE9PSBudWxsKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChuZXdHYW1lKVxufVxuXG5cbmZ1bmN0aW9uIGluaXRhbFNoaXBQbGFjZW1lbnQoKSB7XG4gICAgYm9hcmQxLnNoaXBUbyhbXCJBMVwiXSwgMSlcbiAgICBib2FyZDEuc2hpcFRvKFtcIkE3XCJdLCAyKVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiSDFcIl0sIDMpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJINFwiXSwgNClcbiAgICBib2FyZDEuc2hpcFRvKFtcIkMxMFwiLCBcIkQxMFwiXSwgNSlcbiAgICBib2FyZDEuc2hpcFRvKFtcIkE1XCIsIFwiQjVcIl0sIDYpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJKNVwiLCBcIko2XCJdLCA3KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiRDNcIiwgXCJFM1wiLCBcIkYzXCJdLCA4KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiRTVcIiwgXCJFNlwiLCBcIkU3XCJdLCA5KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiRjEwXCIsIFwiRzEwXCIsIFwiSDEwXCIsIFwiSTEwXCJdLCAxMClcbn1cbi8qXG5cblVOVVNFRCBDT0RFIDooXG5cbmNvbnN0IGFycmF5ID0gW107XG5sZXQgcmFuZG9tO1xubGV0IG51bWJlcjtcbmxldCBsZXR0ZXI7XG5sZXQgbGV0dGVycztcbmxldCBuZXh0TGV0dGVyO1xubGV0IG5leHQ7XG5cbmZ1bmN0aW9uIGFpQm9hcmQoKSB7XG4gICAgbGV0dGVycyA9IFwiQUJDREVGR0hJSlwiO1xuICAgIGxldCBsZXR0ZXIgPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV1cbiAgICBsZXQgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcblxuICAgIHJhbmRvbSA9IGxldHRlciArIG51bWJlcjtcbiAgICBsZXQgbGVmdCA9IGxldHRlcnNbbGV0dGVycy5pbmRleE9mKHJhbmRvbVswXSkgLSAxXTtcbiAgICBsZWZ0ICs9IG51bWJlcjtcbiAgICBsZXQgcmlnaHQgPSBsZXR0ZXJzW2xldHRlcnMuaW5kZXhPZihyYW5kb21bMF0pICsgMV07XG4gICAgcmlnaHQgKz0gbnVtYmVyO1xuICAgIGxldCBib3QgPSBudW1iZXIgKyAxO1xuICAgIGxldCB0b3AgPSBudW1iZXIgLSAxO1xuICAgIFxuICAgIGlmIChcbiAgICAgICAgYXJyYXkuc29tZSh4ID0+IHggPT09IHJhbmRvbSkgfHwgYXJyYXkuc29tZSh4ID0+IHggPT09IGxlZnQpXG4gICAgICAgfHwgYXJyYXkuc29tZSh4ID0+IHggPT09IHJpZ2h0KXx8IGFycmF5LnNvbWUoeCA9PiB4ID09PSBib3QpXG4gICAgICAgfHwgYXJyYXkuc29tZSh4ID0+IHggPT09IHRvcCkpIGFpQm9hcmQoKTtcbiAgICBhcnJheS5wdXNoKHJhbmRvbSlcbiAgICBhcnJheS5wdXNoKGxlZnQpXG4gICAgYXJyYXkucHVzaChyaWdodClcbiAgICBhcnJheS5wdXNoKGJvdClcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJhbmRvbSxcbiAgICAgICAgbGV0dGVyLFxuICAgICAgICBudW1iZXJcbiAgICB9XG59XG4qL1xuXG5mdW5jdGlvbiBlbmVteUJvYXJkKCkge1xuICAgIFxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSDEwXCJdLCAxMSlcbiAgICBib2FyZDIuc2hpcFRvKFtcIkMxXCJdLCAxMilcbiAgICBib2FyZDIuc2hpcFRvKFtcIkE4XCJdLCAxMylcbiAgICBib2FyZDIuc2hpcFRvKFtcIko5XCJdLCAxNClcbiAgICBib2FyZDIuc2hpcFRvKFtcIkkxXCIsIFwiSjFcIl0sIDE1KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiRjFcIiwgXCJGMlwiXSwgMTYpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJJNlwiLCBcIko2XCJdLCAxNylcbiAgICBib2FyZDIuc2hpcFRvKFtcIkQ5XCIsIFwiRTlcIiwgXCJGOVwiXSwgMTgpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJFNVwiLCBcIkU2XCIsIFwiRTdcIl0sIDE5KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQTFcIiwgXCJBMlwiLCBcIkEzXCIsIFwiQTRcIl0sIDIwKVxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IHsgZ2V0Qm9hcmQgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuXG5leHBvcnQgY29uc3Qgc2hpcHMgPSBbXTtcblxuXG5leHBvcnQgY29uc3QgbWFrZVNoaXAgPSAobGVuZ3RoLCBpZCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBib2F0Qm9keShsZW5ndGgpXG4gICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBpZCxcbiAgICAgICAgYm9keSxcbiAgICAgICAgaXNIaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBib2R5LnNvbWUoeCA9PiB4ID09PSB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvZHkuZXZlcnkoeCA9PiB4ID09PSB0cnVlKSlcbiAgICAgICAgICAgIHJldHVybiBib2R5LmV2ZXJ5KHggPT4geCA9PT0gdHJ1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgaGl0OiAoaWR4KSA9PiB7XG4gICAgICAgICAgICBib2R5W2lkeF0gPSB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbXVxuICAgIH1cbiAgICBzaGlwcy5wdXNoKG9iailcbiAgICBcbiAgICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaGlwKGlkKSB7XG4gICAgXG4gICAgcmV0dXJuIHNoaXBzLmZpbmQoc2hpcCA9PiBzaGlwLmlkID09PSBpZClcbn1cblxuXG5mdW5jdGlvbiBib2F0Qm9keShsZW5ndGgpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFyci5wdXNoKGZhbHNlKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NoaXBzLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9