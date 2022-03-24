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
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard)
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
        console.log(coordinates)
        let classId;
        this.id === 1 ? classId = "one" : classId = "two"
        
        const cellDOM = document.querySelector(`.${classId}[data-id="${coordinates}"]`)
        console.log(cellDOM)
        const cell = this.board.find(cell => cell.id === coordinates)
        console.log(cell)
        if (cell.busy === false) {
            cellDOM.classList.add("miss")
            this.missed.push(coordinates)
            return
        }
        if (this.hits.indexOf(coordinates) != -1) {
            console.log("already hit")
            return
        }
            
        this.hits.push(coordinates)
        
        this.ships.forEach(ship => {
        if (ship.coordinates.some(coord => coord === coordinates)) {

            console.log("nice")
            const idx = ship.coordinates.indexOf(coordinates)
            ship.hit(idx);

                    
            cellDOM.classList.add("hit")
                    
            return;
            } 
                
        })
            
    }
    checkStatus() {
        
        return this.coordinatesLength === this.hits.length
    }
       
}













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
/* harmony export */   "random": () => (/* binding */ random)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");



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
                    (0,_game__WEBPACK_IMPORTED_MODULE_0__.game)(_game__WEBPACK_IMPORTED_MODULE_0__.player1.name).end();
                    return
                }
                turn = 2;
                _game__WEBPACK_IMPORTED_MODULE_0__.player2.attack();
            } else {
                _game__WEBPACK_IMPORTED_MODULE_0__.board1.receiveAttack(aiRandom())

                if (_game__WEBPACK_IMPORTED_MODULE_0__.board1.checkStatus()) {
                    (0,_game__WEBPACK_IMPORTED_MODULE_0__.game)(_game__WEBPACK_IMPORTED_MODULE_0__.player2.name).end();
                    return
                }
                turn = 1;
            } 
        }
    }
}

let turn = 1;
let random;
const arr = [];


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
    
    board2.shipTo(["B6"], 11)
    board2.shipTo(["I10"], 12)
    board2.shipTo(["H2"], 13)
    board2.shipTo(["C4"], 14)
    board2.shipTo(["A10", "B10"], 15)
    board2.shipTo(["F1", "F2"], 16)
    board2.shipTo(["I6", "J6"], 17)
    board2.shipTo(["D9", "E9", "F9"], 18)
    board2.shipTo(["E5", "E6", "E7"], 19)
    board2.shipTo(["A1", "A2", "A3", "A4"], 20)

    enemyBoard();

    if (isFirst) {
        initalShipPlacement();
    } else {

    }

    


    function winner() {
        const winner = document.querySelector(".winner")
        winner.textContent = `${player1.name} is the winner!`
    }

    return {
        player1,
        player2,
        board1,
        board2,
        end() {
            winner();

            console.log(board1)
            board1 = null;
            board2 = null;
            player1 = null;
            player2 = null;

            

            const cells = document.querySelectorAll(".cell")
            cells.forEach(cell => {
                
                setTimeout(() => {
                    cell.classList.remove("busy")
                    cell.classList.remove("hit")
                    cell.classList.remove("miss")

                   
                    
                }, 2000);
            })

            
            
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

function enemyBoard(random) {
    board2.shipTo(["B6"], 11)
    board2.shipTo(["I10"], 12)
    board2.shipTo(["H2"], 13)
    board2.shipTo(["C4"], 14)
    board2.shipTo(["A10", "B10"], 15)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0ptQzs7QUFFNUI7OztBQUdBO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3RDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL0JvYXJkLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL1BsYXllci5qcyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBnZXRTaGlwIH0gZnJvbSBcIi4vc2hpcHNcIlxuaW1wb3J0IHsgcGxheWVyMSB9IGZyb20gXCIuL2dhbWVcIjtcblxuZXhwb3J0IGNsYXNzIGdhbWVCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoaWQpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaWQgPSBpZFxuICAgICAgICB0aGlzLnNoaXBzID0gW107XG4gICAgICAgIHRoaXMuaGl0cyA9IFtdO1xuICAgICAgICB0aGlzLm1pc3NlZCA9IFtdO1xuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoID0gMDtcblxuICAgICAgICBjb25zdCBjZWxsc1BlclJvdyA9IDEwO1xuICAgICAgICBjb25zdCBsZXR0ZXJzID0gXCJBQkNERUZHSElKXCI7XG4gICAgICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLnBvdyhjZWxsc1BlclJvdywgMik7IGkrKykge1xuICAgICAgICBjb25zdCBjZWxsID0ge1xuICAgICAgICAgICAgY29sOiBNYXRoLmZsb29yKGkgLyBjZWxsc1BlclJvdykgKyAxLFxuICAgICAgICAgICAgcm93IDogaSAlIGNlbGxzUGVyUm93LFxuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgICAgICAgYnVzeTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2VsbC5pZCA9IGAke2xldHRlcnNbY2VsbC5yb3ddfSR7Y2VsbC5jb2x9YDtcbiAgICAgICAgYm9hcmQucHVzaChjZWxsKTtcblxuICAgICAgICB9ICAgICAgXG4gICAgfSBcbiAgICBcbiAgICBzaGlwVG8oY29vcmRpbmF0ZXMsIHNoaXBJZCkge1xuICAgICAgICBcbiAgICAgICAgY29vcmRpbmF0ZXMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5ib2FyZC5maW5kKGNlbGwgPT4gY2VsbC5pZCA9PT0gY29vcmQpLmJ1c3kgPSB0cnVlOyBcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3Qgc2hpcCA9IGdldFNoaXAoc2hpcElkKVxuICAgICAgICBcbiAgICAgICAgc2hpcC5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKVxuXG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXNMZW5ndGggKz0gY29vcmRpbmF0ZXMubGVuZ3RoXG4gICAgfSAgXG5cbiAgICByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKVxuICAgICAgICBsZXQgY2xhc3NJZDtcbiAgICAgICAgdGhpcy5pZCA9PT0gMSA/IGNsYXNzSWQgPSBcIm9uZVwiIDogY2xhc3NJZCA9IFwidHdvXCJcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNlbGxET00gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc0lkfVtkYXRhLWlkPVwiJHtjb29yZGluYXRlc31cIl1gKVxuICAgICAgICBjb25zb2xlLmxvZyhjZWxsRE9NKVxuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ib2FyZC5maW5kKGNlbGwgPT4gY2VsbC5pZCA9PT0gY29vcmRpbmF0ZXMpXG4gICAgICAgIGNvbnNvbGUubG9nKGNlbGwpXG4gICAgICAgIGlmIChjZWxsLmJ1c3kgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjZWxsRE9NLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpXG4gICAgICAgICAgICB0aGlzLm1pc3NlZC5wdXNoKGNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGl0cy5pbmRleE9mKGNvb3JkaW5hdGVzKSAhPSAtMSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbHJlYWR5IGhpdFwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmhpdHMucHVzaChjb29yZGluYXRlcylcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRpbmF0ZXMuc29tZShjb29yZCA9PiBjb29yZCA9PT0gY29vcmRpbmF0ZXMpKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmljZVwiKVxuICAgICAgICAgICAgY29uc3QgaWR4ID0gc2hpcC5jb29yZGluYXRlcy5pbmRleE9mKGNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgc2hpcC5oaXQoaWR4KTtcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGNlbGxET00uY2xhc3NMaXN0LmFkZChcImhpdFwiKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICB9XG4gICAgY2hlY2tTdGF0dXMoKSB7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5jb29yZGluYXRlc0xlbmd0aCA9PT0gdGhpcy5oaXRzLmxlbmd0aFxuICAgIH1cbiAgICAgICBcbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQgeyBib2FyZDIsIGJvYXJkMSwgcGxheWVyMiwgcGxheWVyMSwgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIlxuXG5cbmV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgaWQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgICAgICB0aGlzLmlkID0gaWRcbiAgICB9XG5cbiAgICBhdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgXG4gICAgICAgIGlmICh0dXJuICE9PSB0aGlzLmlkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCB5b3VyIHR1cm5cIilcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGJvYXJkMi5yZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKVxuXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkMi5jaGVja1N0YXR1cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWUocGxheWVyMS5uYW1lKS5lbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHR1cm4gPSAyO1xuICAgICAgICAgICAgICAgIHBsYXllcjIuYXR0YWNrKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvYXJkMS5yZWNlaXZlQXR0YWNrKGFpUmFuZG9tKCkpXG5cbiAgICAgICAgICAgICAgICBpZiAoYm9hcmQxLmNoZWNrU3RhdHVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZShwbGF5ZXIyLm5hbWUpLmVuZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHVybiA9IDE7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgfVxufVxuXG5sZXQgdHVybiA9IDE7XG5leHBvcnQgbGV0IHJhbmRvbTtcbmNvbnN0IGFyciA9IFtdO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBhaVJhbmRvbSgpIHtcbiAgICBjb25zdCBsZXR0ZXJzID0gXCJBQkNERUZHSElKXCI7XG4gICAgY29uc3QgbGV0dGVyID0gbGV0dGVyc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldXG5cbiAgICBjb25zdCBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIHJhbmRvbSA9IGxldHRlciArIG51bWJlclxuICAgIFxuICAgIFxuICAgIGlmIChhcnIuc29tZSh2YWwgPT4gdmFsID09PSByYW5kb20pKSByZXR1cm4gYWlSYW5kb20oKTtcbiAgICBhcnIucHVzaChyYW5kb20pXG5cblxuICAgIFxuICAgIHJldHVybiByYW5kb21cbn1cbiIsIlxuXG5pbXBvcnQgeyBnYW1lQm9hcmQgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG5pbXBvcnQge21ha2VTaGlwfSBmcm9tIFwiLi9zaGlwc1wiO1xuXG5cblxuZXhwb3J0IGxldCBib2FyZDE7XG5leHBvcnQgbGV0IGJvYXJkMjtcbmV4cG9ydCBsZXQgcGxheWVyMTtcbmV4cG9ydCBsZXQgcGxheWVyMjtcblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lKHVzZXJOYW1lLCBpc0ZpcnN0KSB7XG5cbiAgICBcbiAgICBcbiAgICBcbiAgICBib2FyZDEgPSBuZXcgZ2FtZUJvYXJkKDEpXG4gICAgYm9hcmQyID0gbmV3IGdhbWVCb2FyZCgyKVxuXG4gICAgXG5cbiAgICBwbGF5ZXIxID0gbmV3IFBsYXllcih1c2VyTmFtZSwgMSlcbiAgICBwbGF5ZXIyID0gbmV3IFBsYXllcihcImFpXCIsIDIpXG5cbiAgICBcbiAgICBtYWtlU2hpcCgxLCAxKVxuICAgIG1ha2VTaGlwKDEsIDIpXG4gICAgbWFrZVNoaXAoMSwgMylcbiAgICBtYWtlU2hpcCgxLCA0KVxuICAgIG1ha2VTaGlwKDIsIDUpXG4gICAgbWFrZVNoaXAoMiwgNilcbiAgICBtYWtlU2hpcCgyLCA3KVxuICAgIG1ha2VTaGlwKDMsIDgpXG4gICAgbWFrZVNoaXAoMywgOSlcbiAgICBtYWtlU2hpcCg0LCAxMClcblxuICAgIG1ha2VTaGlwKDEsIDExKVxuICAgIG1ha2VTaGlwKDEsIDEyKVxuICAgIG1ha2VTaGlwKDEsIDEzKVxuICAgIG1ha2VTaGlwKDEsIDE0KVxuICAgIG1ha2VTaGlwKDIsIDE1KVxuICAgIG1ha2VTaGlwKDIsIDE2KVxuICAgIG1ha2VTaGlwKDIsIDE3KVxuICAgIG1ha2VTaGlwKDMsIDE4KVxuICAgIG1ha2VTaGlwKDMsIDE5KVxuICAgIG1ha2VTaGlwKDQsIDIwKVxuICAgIFxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQjZcIl0sIDExKVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSTEwXCJdLCAxMilcbiAgICBib2FyZDIuc2hpcFRvKFtcIkgyXCJdLCAxMylcbiAgICBib2FyZDIuc2hpcFRvKFtcIkM0XCJdLCAxNClcbiAgICBib2FyZDIuc2hpcFRvKFtcIkExMFwiLCBcIkIxMFwiXSwgMTUpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJGMVwiLCBcIkYyXCJdLCAxNilcbiAgICBib2FyZDIuc2hpcFRvKFtcIkk2XCIsIFwiSjZcIl0sIDE3KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiRDlcIiwgXCJFOVwiLCBcIkY5XCJdLCAxOClcbiAgICBib2FyZDIuc2hpcFRvKFtcIkU1XCIsIFwiRTZcIiwgXCJFN1wiXSwgMTkpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJBMVwiLCBcIkEyXCIsIFwiQTNcIiwgXCJBNFwiXSwgMjApXG5cbiAgICBlbmVteUJvYXJkKCk7XG5cbiAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICBpbml0YWxTaGlwUGxhY2VtZW50KCk7XG4gICAgfSBlbHNlIHtcblxuICAgIH1cblxuICAgIFxuXG5cbiAgICBmdW5jdGlvbiB3aW5uZXIoKSB7XG4gICAgICAgIGNvbnN0IHdpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2lubmVyXCIpXG4gICAgICAgIHdpbm5lci50ZXh0Q29udGVudCA9IGAke3BsYXllcjEubmFtZX0gaXMgdGhlIHdpbm5lciFgXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGxheWVyMSxcbiAgICAgICAgcGxheWVyMixcbiAgICAgICAgYm9hcmQxLFxuICAgICAgICBib2FyZDIsXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIHdpbm5lcigpO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhib2FyZDEpXG4gICAgICAgICAgICBib2FyZDEgPSBudWxsO1xuICAgICAgICAgICAgYm9hcmQyID0gbnVsbDtcbiAgICAgICAgICAgIHBsYXllcjEgPSBudWxsO1xuICAgICAgICAgICAgcGxheWVyMiA9IG51bGw7XG5cbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2VsbFwiKVxuICAgICAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiYnVzeVwiKVxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJoaXRcIilcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwibWlzc1wiKVxuXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59XG5cblxuXG5cblxuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpblwiKVxuXG5leHBvcnQgY29uc3QgbmV3R2FtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbm5ld0dhbWUudGV4dENvbnRlbnQgPSBcIk5ldyBHYW1lXCJcbm5ld0dhbWUuY2xhc3NMaXN0LmFkZChcIm5ldy1nYW1lXCIpXG5cbmlmIChkb2N1bWVudC5ib2R5ICE9PSBudWxsKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChuZXdHYW1lKVxufVxuXG5cbmZ1bmN0aW9uIGluaXRhbFNoaXBQbGFjZW1lbnQoKSB7XG4gICAgYm9hcmQxLnNoaXBUbyhbXCJBMVwiXSwgMSlcbiAgICBib2FyZDEuc2hpcFRvKFtcIkE3XCJdLCAyKVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiSDFcIl0sIDMpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJINFwiXSwgNClcbiAgICBib2FyZDEuc2hpcFRvKFtcIkMxMFwiLCBcIkQxMFwiXSwgNSlcbiAgICBib2FyZDEuc2hpcFRvKFtcIkE1XCIsIFwiQjVcIl0sIDYpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJKNVwiLCBcIko2XCJdLCA3KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiRDNcIiwgXCJFM1wiLCBcIkYzXCJdLCA4KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiRTVcIiwgXCJFNlwiLCBcIkU3XCJdLCA5KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiRjEwXCIsIFwiRzEwXCIsIFwiSDEwXCIsIFwiSTEwXCJdLCAxMClcbiAgICBcbiAgICBcbn1cblxuZnVuY3Rpb24gZW5lbXlCb2FyZChyYW5kb20pIHtcbiAgICBib2FyZDIuc2hpcFRvKFtcIkI2XCJdLCAxMSlcbiAgICBib2FyZDIuc2hpcFRvKFtcIkkxMFwiXSwgMTIpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJIMlwiXSwgMTMpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJDNFwiXSwgMTQpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJBMTBcIiwgXCJCMTBcIl0sIDE1KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiRjFcIiwgXCJGMlwiXSwgMTYpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJJNlwiLCBcIko2XCJdLCAxNylcbiAgICBib2FyZDIuc2hpcFRvKFtcIkQ5XCIsIFwiRTlcIiwgXCJGOVwiXSwgMTgpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJFNVwiLCBcIkU2XCIsIFwiRTdcIl0sIDE5KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQTFcIiwgXCJBMlwiLCBcIkEzXCIsIFwiQTRcIl0sIDIwKVxufVxuXG5cblxuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQgeyBnZXRCb2FyZCB9IGZyb20gXCIuL0JvYXJkXCI7XG5cbmV4cG9ydCBjb25zdCBzaGlwcyA9IFtdO1xuXG5cbmV4cG9ydCBjb25zdCBtYWtlU2hpcCA9IChsZW5ndGgsIGlkKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IGJvYXRCb2R5KGxlbmd0aClcbiAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIGlkLFxuICAgICAgICBib2R5LFxuICAgICAgICBpc0hpdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJvZHkuc29tZSh4ID0+IHggPT09IHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJvZHkuZXZlcnkoeCA9PiB4ID09PSB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICBoaXQ6IChpZHgpID0+IHtcbiAgICAgICAgICAgIGJvZHlbaWR4XSA9IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtdXG4gICAgfVxuICAgIHNoaXBzLnB1c2gob2JqKVxuICAgIFxuICAgIHJldHVybiBvYmpcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXAoaWQpIHtcbiAgICBcbiAgICByZXR1cm4gc2hpcHMuZmluZChzaGlwID0+IHNoaXAuaWQgPT09IGlkKVxufVxuXG5cbmZ1bmN0aW9uIGJvYXRCb2R5KGxlbmd0aCkge1xuICAgIGxldCBhcnIgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyLnB1c2goZmFsc2UpXG4gICAgfVxuICAgIHJldHVybiBhcnJcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvc2hpcHMuanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=