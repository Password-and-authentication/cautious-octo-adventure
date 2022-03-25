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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDdkNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvLi9zcmMvQm9hcmQuanMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IGdldFNoaXAgfSBmcm9tIFwiLi9zaGlwc1wiXG5pbXBvcnQgeyBwbGF5ZXIxIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5leHBvcnQgY2xhc3MgZ2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihpZCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pZCA9IGlkXG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICAgICAgdGhpcy5oaXRzID0gW107XG4gICAgICAgIHRoaXMubWlzc2VkID0gW107XG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXNMZW5ndGggPSAwO1xuXG4gICAgICAgIGNvbnN0IGNlbGxzUGVyUm93ID0gMTA7XG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBcIkFCQ0RFRkdISUpcIjtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgucG93KGNlbGxzUGVyUm93LCAyKTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB7XG4gICAgICAgICAgICBjb2w6IE1hdGguZmxvb3IoaSAvIGNlbGxzUGVyUm93KSArIDEsXG4gICAgICAgICAgICByb3cgOiBpICUgY2VsbHNQZXJSb3csXG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIGhpdDogZmFsc2UsXG4gICAgICAgICAgICBidXN5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICBjZWxsLmlkID0gYCR7bGV0dGVyc1tjZWxsLnJvd119JHtjZWxsLmNvbH1gO1xuICAgICAgICBib2FyZC5wdXNoKGNlbGwpO1xuXG4gICAgICAgIH0gICAgICBcbiAgICB9IFxuICAgIFxuICAgIHNoaXBUbyhjb29yZGluYXRlcywgc2hpcElkKSB7XG4gICAgICAgIFxuICAgICAgICBjb29yZGluYXRlcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmJvYXJkLmZpbmQoY2VsbCA9PiBjZWxsLmlkID09PSBjb29yZCkuYnVzeSA9IHRydWU7IFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcChzaGlwSWQpXG4gICAgICAgIFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApXG5cbiAgICAgICAgdGhpcy5jb29yZGluYXRlc0xlbmd0aCArPSBjb29yZGluYXRlcy5sZW5ndGhcbiAgICB9ICBcblxuICAgIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcblxuICAgICAgICBpZiAodGhpcy5pZCA9PT0gMikge1xuICAgICAgICAgICAgY29uc3QgY2VsbHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudHdvW2RhdGEtaWQ9XCIke2Nvb3JkaW5hdGVzfVwiXWApXG4gICAgICAgICAgICBjZWxseS5jbGFzc0xpc3QucmVtb3ZlKFwiY2VsbHR3b1wiKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgbGV0IGNsYXNzSWQ7XG4gICAgICAgIHRoaXMuaWQgPT09IDEgPyBjbGFzc0lkID0gXCJvbmVcIiA6IGNsYXNzSWQgPSBcInR3b1wiXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjZWxsRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NJZH1bZGF0YS1pZD1cIiR7Y29vcmRpbmF0ZXN9XCJdYClcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmZpbmQoY2VsbCA9PiBjZWxsLmlkID09PSBjb29yZGluYXRlcylcbiAgICAgICAgXG4gICAgICAgIGlmIChjZWxsLmJ1c3kgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjZWxsRE9NLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpXG4gICAgICAgICAgICB0aGlzLm1pc3NlZC5wdXNoKGNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgY29uc29sZS5sb2coYGJvYXJkICR7dGhpcy5pZH0sIG1pc3NlcyAke3RoaXMubWlzc2VkfWApXG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhpdHMuaW5kZXhPZihjb29yZGluYXRlcykgIT0gLTEpIHtcbiAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuaGl0cy5wdXNoKGNvb3JkaW5hdGVzKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlcy5zb21lKGNvb3JkID0+IGNvb3JkID09PSBjb29yZGluYXRlcykpIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuaWNlXCIpXG4gICAgICAgICAgICBjb25zdCBpZHggPSBzaGlwLmNvb3JkaW5hdGVzLmluZGV4T2YoY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICBzaGlwLmhpdChpZHgpO1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlkID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDEgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQxc3Vuay50ZXh0Q29udGVudCA9IGBTaGlwcyBzdW5rICR7YW1vdW50MX1gO1xuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFtb3VudDIgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQyc3Vuay50ZXh0Q29udGVudCA9IGBTaGlwcyBzdW5rOiAke2Ftb3VudDJ9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBjZWxsRE9NLmNsYXNzTGlzdC5hZGQoXCJoaXRcIilcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9KVxuXG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhgYm9hcmQgJHt0aGlzLmlkfSzCoGhpdHMgJHt0aGlzLmhpdHN9YClcbiAgICAgICAgICAgIFxuICAgIH1cbiAgICBjaGVja1N0YXR1cygpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoID09PSB0aGlzLmhpdHMubGVuZ3RoXG4gICAgfVxuICAgICAgIFxufVxuXG5jb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuZGlzcGxheS5jbGFzc0xpc3QuYWRkKFwiZGlzcGxheVwiKVxuaWYgKGRvY3VtZW50LmJvZHkgIT09IG51bGwpIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGlzcGxheSlcblxuY29uc3QgZmlyc3RCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5maXJzdEJveC5jbGFzc0xpc3QuYWRkKFwiZmlyc3RCb3hcIilcbmV4cG9ydCBjb25zdCB0d29Cb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG50d29Cb3guY2xhc3NMaXN0LmFkZChcInR3b0JveFwiKVxuZGlzcGxheS5hcHBlbmRDaGlsZChmaXJzdEJveClcbmRpc3BsYXkuYXBwZW5kQ2hpbGQodHdvQm94KVxuY29uc3QgYm9hcmQxQ2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKVxuYm9hcmQxQ2FwdGlvbi50ZXh0Q29udGVudCA9IFwiQm9hcmQgMVwiXG5jb25zdCBib2FyZDJDYXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXG5ib2FyZDJDYXB0aW9uLnRleHRDb250ZW50ID0gXCJCb2FyZCAyXCJcblxuZmlyc3RCb3guYXBwZW5kQ2hpbGQoYm9hcmQxQ2FwdGlvbilcblxuZXhwb3J0IGNvbnN0IGJvYXJkMXN1bmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5leHBvcnQgbGV0IGFtb3VudDEgPSAwO1xuYm9hcmQxc3Vuay50ZXh0Q29udGVudCA9IGBTaGlwcyBzdW5rOiAke2Ftb3VudDF9YFxuZmlyc3RCb3guYXBwZW5kQ2hpbGQoYm9hcmQxc3VuaylcblxudHdvQm94LmFwcGVuZENoaWxkKGJvYXJkMkNhcHRpb24pXG5leHBvcnQgY29uc3QgYm9hcmQyc3VuayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbmxldCBhbW91bnQyID0gMDtcbmV4cG9ydCBmdW5jdGlvbiByZXNldEFtb3VudHMoKSB7XG4gICAgYW1vdW50MSA9IDA7XG4gICAgYW1vdW50MiA9IDA7XG59XG5cbmJvYXJkMnN1bmsudGV4dENvbnRlbnQgPSBgU2hpcHMgc3VuazogJHthbW91bnQyfWBcbnR3b0JveC5hcHBlbmRDaGlsZChib2FyZDJzdW5rKVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IHsgYm9hcmQyLCBib2FyZDEsIHBsYXllcjIsIHBsYXllcjEsIGdhbWUgfSBmcm9tIFwiLi9nYW1lXCJcbmltcG9ydCB7IGFtb3VudDIsIGFtb3VudDEgfSBmcm9tIFwiLi9Cb2FyZFwiXG5cblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMuaWQgPSBpZFxuICAgIH1cblxuICAgIGF0dGFjayhjb29yZGluYXRlcykge1xuICAgICAgICBcbiAgICAgICAgaWYgKHR1cm4gIT09IHRoaXMuaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IHlvdXIgdHVyblwiKVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlkID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYm9hcmQyLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpXG5cbiAgICAgICAgICAgICAgICBpZiAoYm9hcmQyLmNoZWNrU3RhdHVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZSh0aGlzLm5hbWUpLmVuZCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBsYXllcjEpXG4gICAgICAgICAgICAgICAgICAgIHdpbm5lci50ZXh0Q29udGVudCA9IGAke3RoaXMubmFtZX0gaXMgdGhlIHdpbm5lciFgXG4gICAgICAgICAgICAgICAgICAgIHdpbm5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHVybiA9IDI7XG4gICAgICAgICAgICAgICAgcGxheWVyMi5hdHRhY2soKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYm9hcmQxLnJlY2VpdmVBdHRhY2soYWlSYW5kb20oKSlcblxuICAgICAgICAgICAgICAgIGlmIChib2FyZDEuY2hlY2tTdGF0dXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUodGhpcy5uYW1lKS5lbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyXCIpXG4gICAgICAgICAgICAgICAgICAgIHdpbm5lci50ZXh0Q29udGVudCA9IGAke3RoaXMubmFtZX0gaXMgdGhlIHdpbm5lciFgXG4gICAgICAgICAgICAgICAgICAgIHdpbm5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0dXJuID0gMTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmxldCB0dXJuID0gMTtcbmxldCByYW5kb207XG5sZXQgYXJyID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNldEFycigpIHtcbiAgICBhcnIgPSBbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWlSYW5kb20oKSB7XG4gICAgY29uc3QgbGV0dGVycyA9IFwiQUJDREVGR0hJSlwiO1xuICAgIGNvbnN0IGxldHRlciA9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXVxuXG4gICAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICByYW5kb20gPSBsZXR0ZXIgKyBudW1iZXJcbiAgICBcbiAgICBcbiAgICBpZiAoYXJyLnNvbWUodmFsID0+IHZhbCA9PT0gcmFuZG9tKSkgcmV0dXJuIGFpUmFuZG9tKCk7XG4gICAgYXJyLnB1c2gocmFuZG9tKVxuICAgIFxuICAgIHJldHVybiByYW5kb21cbn1cbiIsIlxuXG5pbXBvcnQgeyBnYW1lQm9hcmQsIGFtb3VudDIsIGFtb3VudDEsIGJvYXJkMXN1bmssIGJvYXJkMnN1bmssIHJlc2V0QW1vdW50cyB9IGZyb20gXCIuL0JvYXJkXCI7XG5pbXBvcnQgeyBQbGF5ZXIsIGFpUmFuZG9tLCByZXNldEFyciB9IGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IHttYWtlU2hpcH0gZnJvbSBcIi4vc2hpcHNcIjtcblxuXG5cbmV4cG9ydCBsZXQgYm9hcmQxO1xuZXhwb3J0IGxldCBib2FyZDI7XG5leHBvcnQgbGV0IHBsYXllcjE7XG5leHBvcnQgbGV0IHBsYXllcjI7XG5cblxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWUodXNlck5hbWUsIGlzRmlyc3QpIHtcblxuICAgIFxuICAgIFxuICAgIFxuICAgIGJvYXJkMSA9IG5ldyBnYW1lQm9hcmQoMSlcbiAgICBib2FyZDIgPSBuZXcgZ2FtZUJvYXJkKDIpXG5cbiAgICBcblxuICAgIHBsYXllcjEgPSBuZXcgUGxheWVyKHVzZXJOYW1lLCAxKVxuICAgIHBsYXllcjIgPSBuZXcgUGxheWVyKFwiYWlcIiwgMilcblxuICAgIFxuICAgIG1ha2VTaGlwKDEsIDEpXG4gICAgbWFrZVNoaXAoMSwgMilcbiAgICBtYWtlU2hpcCgxLCAzKVxuICAgIG1ha2VTaGlwKDEsIDQpXG4gICAgbWFrZVNoaXAoMiwgNSlcbiAgICBtYWtlU2hpcCgyLCA2KVxuICAgIG1ha2VTaGlwKDIsIDcpXG4gICAgbWFrZVNoaXAoMywgOClcbiAgICBtYWtlU2hpcCgzLCA5KVxuICAgIG1ha2VTaGlwKDQsIDEwKVxuXG4gICAgbWFrZVNoaXAoMSwgMTEpXG4gICAgbWFrZVNoaXAoMSwgMTIpXG4gICAgbWFrZVNoaXAoMSwgMTMpXG4gICAgbWFrZVNoaXAoMSwgMTQpXG4gICAgbWFrZVNoaXAoMiwgMTUpXG4gICAgbWFrZVNoaXAoMiwgMTYpXG4gICAgbWFrZVNoaXAoMiwgMTcpXG4gICAgbWFrZVNoaXAoMywgMTgpXG4gICAgbWFrZVNoaXAoMywgMTkpXG4gICAgbWFrZVNoaXAoNCwgMjApXG4gICAgXG4gICAgZW5lbXlCb2FyZCgpO1xuXG4gICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgaW5pdGFsU2hpcFBsYWNlbWVudCgpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgICBwbGF5ZXIxLFxuICAgICAgICBwbGF5ZXIyLFxuICAgICAgICBib2FyZDEsXG4gICAgICAgIGJvYXJkMixcbiAgICAgICAgZW5kKCkge1xuICAgICAgICBcbiAgICAgICAgICAgIGJvYXJkMSA9IG51bGw7XG4gICAgICAgICAgICBib2FyZDIgPSBudWxsO1xuICAgICAgICAgICAgcGxheWVyMSA9IG51bGw7XG4gICAgICAgICAgICBwbGF5ZXIyID0gbnVsbDtcblxuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIilcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImJ1c3lcIilcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiaGl0XCIpXG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcIm1pc3NcIilcblxuICAgICAgICAgICAgICAgICAgICByZXNldEFtb3VudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRBcnIoKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkMXN1bmsudGV4dENvbnRlbnQgPSBcIlNoaXBzIHN1bms6IFwiXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkMnN1bmsudGV4dENvbnRlbnQgPSBcIlNoaXBzIHN1bms6IFwiXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuXG5cblxuXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpXG5cbmV4cG9ydCBjb25zdCBuZXdHYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxubmV3R2FtZS50ZXh0Q29udGVudCA9IFwiTmV3IEdhbWVcIlxubmV3R2FtZS5jbGFzc0xpc3QuYWRkKFwibmV3LWdhbWVcIilcblxuaWYgKGRvY3VtZW50LmJvZHkgIT09IG51bGwpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5ld0dhbWUpXG59XG5cblxuZnVuY3Rpb24gaW5pdGFsU2hpcFBsYWNlbWVudCgpIHtcbiAgICBib2FyZDEuc2hpcFRvKFtcIkExXCJdLCAxKVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiQTdcIl0sIDIpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJIMVwiXSwgMylcbiAgICBib2FyZDEuc2hpcFRvKFtcIkg0XCJdLCA0KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiQzEwXCIsIFwiRDEwXCJdLCA1KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiQTVcIiwgXCJCNVwiXSwgNilcbiAgICBib2FyZDEuc2hpcFRvKFtcIko1XCIsIFwiSjZcIl0sIDcpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJEM1wiLCBcIkUzXCIsIFwiRjNcIl0sIDgpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJFNVwiLCBcIkU2XCIsIFwiRTdcIl0sIDkpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJGMTBcIiwgXCJHMTBcIiwgXCJIMTBcIiwgXCJJMTBcIl0sIDEwKVxufVxuLypcblxuVU5VU0VEIENPREUgOihcblxuY29uc3QgYXJyYXkgPSBbXTtcbmxldCByYW5kb207XG5sZXQgbnVtYmVyO1xubGV0IGxldHRlcjtcbmxldCBsZXR0ZXJzO1xubGV0IG5leHRMZXR0ZXI7XG5sZXQgbmV4dDtcblxuZnVuY3Rpb24gYWlCb2FyZCgpIHtcbiAgICBsZXR0ZXJzID0gXCJBQkNERUZHSElKXCI7XG4gICAgbGV0IGxldHRlciA9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXVxuICAgIGxldCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXG4gICAgcmFuZG9tID0gbGV0dGVyICsgbnVtYmVyO1xuICAgIGxldCBsZWZ0ID0gbGV0dGVyc1tsZXR0ZXJzLmluZGV4T2YocmFuZG9tWzBdKSAtIDFdO1xuICAgIGxlZnQgKz0gbnVtYmVyO1xuICAgIGxldCByaWdodCA9IGxldHRlcnNbbGV0dGVycy5pbmRleE9mKHJhbmRvbVswXSkgKyAxXTtcbiAgICByaWdodCArPSBudW1iZXI7XG4gICAgbGV0IGJvdCA9IG51bWJlciArIDE7XG4gICAgbGV0IHRvcCA9IG51bWJlciAtIDE7XG4gICAgXG4gICAgaWYgKFxuICAgICAgICBhcnJheS5zb21lKHggPT4geCA9PT0gcmFuZG9tKSB8fCBhcnJheS5zb21lKHggPT4geCA9PT0gbGVmdClcbiAgICAgICB8fCBhcnJheS5zb21lKHggPT4geCA9PT0gcmlnaHQpfHwgYXJyYXkuc29tZSh4ID0+IHggPT09IGJvdClcbiAgICAgICB8fCBhcnJheS5zb21lKHggPT4geCA9PT0gdG9wKSkgYWlCb2FyZCgpO1xuICAgIGFycmF5LnB1c2gocmFuZG9tKVxuICAgIGFycmF5LnB1c2gobGVmdClcbiAgICBhcnJheS5wdXNoKHJpZ2h0KVxuICAgIGFycmF5LnB1c2goYm90KVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmFuZG9tLFxuICAgICAgICBsZXR0ZXIsXG4gICAgICAgIG51bWJlclxuICAgIH1cbn1cbiovXG5cbmZ1bmN0aW9uIGVuZW15Qm9hcmQoKSB7XG4gICAgXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJIMTBcIl0sIDExKVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQzFcIl0sIDEyKVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQThcIl0sIDEzKVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSjlcIl0sIDE0KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSTFcIiwgXCJKMVwiXSwgMTUpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJGMVwiLCBcIkYyXCJdLCAxNilcbiAgICBib2FyZDIuc2hpcFRvKFtcIkk2XCIsIFwiSjZcIl0sIDE3KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiRDlcIiwgXCJFOVwiLCBcIkY5XCJdLCAxOClcbiAgICBib2FyZDIuc2hpcFRvKFtcIkU1XCIsIFwiRTZcIiwgXCJFN1wiXSwgMTkpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJBMVwiLCBcIkEyXCIsIFwiQTNcIiwgXCJBNFwiXSwgMjApXG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQgeyBnZXRCb2FyZCB9IGZyb20gXCIuL0JvYXJkXCI7XG5cbmV4cG9ydCBjb25zdCBzaGlwcyA9IFtdO1xuXG5cbmV4cG9ydCBjb25zdCBtYWtlU2hpcCA9IChsZW5ndGgsIGlkKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IGJvYXRCb2R5KGxlbmd0aClcbiAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIGlkLFxuICAgICAgICBib2R5LFxuICAgICAgICBpc0hpdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJvZHkuc29tZSh4ID0+IHggPT09IHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYm9keS5ldmVyeSh4ID0+IHggPT09IHRydWUpKVxuICAgICAgICAgICAgcmV0dXJuIGJvZHkuZXZlcnkoeCA9PiB4ID09PSB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICBoaXQ6IChpZHgpID0+IHtcbiAgICAgICAgICAgIGJvZHlbaWR4XSA9IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtdXG4gICAgfVxuICAgIHNoaXBzLnB1c2gob2JqKVxuICAgIFxuICAgIHJldHVybiBvYmpcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXAoaWQpIHtcbiAgICBcbiAgICByZXR1cm4gc2hpcHMuZmluZChzaGlwID0+IHNoaXAuaWQgPT09IGlkKVxufVxuXG5cbmZ1bmN0aW9uIGJvYXRCb2R5KGxlbmd0aCkge1xuICAgIGxldCBhcnIgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyLnB1c2goZmFsc2UpXG4gICAgfVxuICAgIHJldHVybiBhcnJcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvZ2FtZS5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==