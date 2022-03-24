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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Player.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNKbUM7O0FBRTVCOzs7QUFHQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUN0Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS8uL3NyYy9Cb2FyZC5qcyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS8uL3NyYy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS8uL3NyYy9zaGlwcy5qcyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgZ2V0U2hpcCB9IGZyb20gXCIuL3NoaXBzXCJcbmltcG9ydCB7IHBsYXllcjEgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmV4cG9ydCBjbGFzcyBnYW1lQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKGlkKSB7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmlkID0gaWRcbiAgICAgICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgICAgICB0aGlzLmhpdHMgPSBbXTtcbiAgICAgICAgdGhpcy5taXNzZWQgPSBbXTtcbiAgICAgICAgdGhpcy5jb29yZGluYXRlc0xlbmd0aCA9IDA7XG5cbiAgICAgICAgY29uc3QgY2VsbHNQZXJSb3cgPSAxMDtcbiAgICAgICAgY29uc3QgbGV0dGVycyA9IFwiQUJDREVGR0hJSlwiO1xuICAgICAgICBjb25zdCBib2FyZCA9IFtdO1xuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5wb3coY2VsbHNQZXJSb3csIDIpOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHtcbiAgICAgICAgICAgIGNvbDogTWF0aC5mbG9vcihpIC8gY2VsbHNQZXJSb3cpICsgMSxcbiAgICAgICAgICAgIHJvdyA6IGkgJSBjZWxsc1BlclJvdyxcbiAgICAgICAgICAgIGlkOiBcIlwiLFxuICAgICAgICAgICAgaGl0OiBmYWxzZSxcbiAgICAgICAgICAgIGJ1c3k6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIGNlbGwuaWQgPSBgJHtsZXR0ZXJzW2NlbGwucm93XX0ke2NlbGwuY29sfWA7XG4gICAgICAgIGJvYXJkLnB1c2goY2VsbCk7XG5cbiAgICAgICAgfSAgICAgIFxuICAgIH0gXG4gICAgXG4gICAgc2hpcFRvKGNvb3JkaW5hdGVzLCBzaGlwSWQpIHtcbiAgICAgICAgXG4gICAgICAgIGNvb3JkaW5hdGVzLmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuZmluZChjZWxsID0+IGNlbGwuaWQgPT09IGNvb3JkKS5idXN5ID0gdHJ1ZTsgXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IHNoaXAgPSBnZXRTaGlwKHNoaXBJZClcbiAgICAgICAgXG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcClcblxuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoICs9IGNvb3JkaW5hdGVzLmxlbmd0aFxuICAgIH0gIFxuXG4gICAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuICAgICAgICBjb25zb2xlLmxvZyhjb29yZGluYXRlcylcbiAgICAgICAgbGV0IGNsYXNzSWQ7XG4gICAgICAgIHRoaXMuaWQgPT09IDEgPyBjbGFzc0lkID0gXCJvbmVcIiA6IGNsYXNzSWQgPSBcInR3b1wiXG4gICAgICAgIFxuICAgICAgICBjb25zdCBjZWxsRE9NID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NJZH1bZGF0YS1pZD1cIiR7Y29vcmRpbmF0ZXN9XCJdYClcbiAgICAgICAgY29uc29sZS5sb2coY2VsbERPTSlcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmQuZmluZChjZWxsID0+IGNlbGwuaWQgPT09IGNvb3JkaW5hdGVzKVxuICAgICAgICBjb25zb2xlLmxvZyhjZWxsKVxuICAgICAgICBpZiAoY2VsbC5idXN5ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY2VsbERPTS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKVxuICAgICAgICAgICAgdGhpcy5taXNzZWQucHVzaChjb29yZGluYXRlcylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhpdHMuaW5kZXhPZihjb29yZGluYXRlcykgIT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWxyZWFkeSBoaXRcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgdGhpcy5oaXRzLnB1c2goY29vcmRpbmF0ZXMpXG4gICAgICAgIFxuICAgICAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzLnNvbWUoY29vcmQgPT4gY29vcmQgPT09IGNvb3JkaW5hdGVzKSkge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5pY2VcIilcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHNoaXAuY29vcmRpbmF0ZXMuaW5kZXhPZihjb29yZGluYXRlcylcbiAgICAgICAgICAgIHNoaXAuaGl0KGlkeCk7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBjZWxsRE9NLmNsYXNzTGlzdC5hZGQoXCJoaXRcIilcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgfVxuICAgIGNoZWNrU3RhdHVzKCkge1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRpbmF0ZXNMZW5ndGggPT09IHRoaXMuaGl0cy5sZW5ndGhcbiAgICB9XG4gICAgICAgXG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IHsgYm9hcmQyLCBib2FyZDEsIHBsYXllcjIsIHBsYXllcjEsIGdhbWUgfSBmcm9tIFwiLi9nYW1lXCJcblxuXG5leHBvcnQgY2xhc3MgUGxheWVyIHtcblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICAgICAgdGhpcy5pZCA9IGlkXG4gICAgfVxuXG4gICAgYXR0YWNrKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAodHVybiAhPT0gdGhpcy5pZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJub3QgeW91ciB0dXJuXCIpXG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaWQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBib2FyZDIucmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcylcblxuICAgICAgICAgICAgICAgIGlmIChib2FyZDIuY2hlY2tTdGF0dXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBnYW1lKHBsYXllcjEubmFtZSkuZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0dXJuID0gMjtcbiAgICAgICAgICAgICAgICBwbGF5ZXIyLmF0dGFjaygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2FyZDEucmVjZWl2ZUF0dGFjayhhaVJhbmRvbSgpKVxuXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkMS5jaGVja1N0YXR1cygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhbWUocGxheWVyMi5uYW1lKS5lbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHR1cm4gPSAxO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgIH1cbn1cblxubGV0IHR1cm4gPSAxO1xuZXhwb3J0IGxldCByYW5kb207XG5jb25zdCBhcnIgPSBbXTtcblxuXG5leHBvcnQgZnVuY3Rpb24gYWlSYW5kb20oKSB7XG4gICAgY29uc3QgbGV0dGVycyA9IFwiQUJDREVGR0hJSlwiO1xuICAgIGNvbnN0IGxldHRlciA9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXVxuXG4gICAgY29uc3QgbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICByYW5kb20gPSBsZXR0ZXIgKyBudW1iZXJcbiAgICBcbiAgICBcbiAgICBpZiAoYXJyLnNvbWUodmFsID0+IHZhbCA9PT0gcmFuZG9tKSkgcmV0dXJuIGFpUmFuZG9tKCk7XG4gICAgYXJyLnB1c2gocmFuZG9tKVxuXG5cbiAgICBcbiAgICByZXR1cm4gcmFuZG9tXG59XG4iLCJcblxuaW1wb3J0IHsgZ2FtZUJvYXJkIH0gZnJvbSBcIi4vQm9hcmRcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL1BsYXllclwiO1xuaW1wb3J0IHttYWtlU2hpcH0gZnJvbSBcIi4vc2hpcHNcIjtcblxuXG5cbmV4cG9ydCBsZXQgYm9hcmQxO1xuZXhwb3J0IGxldCBib2FyZDI7XG5leHBvcnQgbGV0IHBsYXllcjE7XG5leHBvcnQgbGV0IHBsYXllcjI7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZSh1c2VyTmFtZSwgaXNGaXJzdCkge1xuXG4gICAgXG4gICAgXG4gICAgXG4gICAgYm9hcmQxID0gbmV3IGdhbWVCb2FyZCgxKVxuICAgIGJvYXJkMiA9IG5ldyBnYW1lQm9hcmQoMilcblxuICAgIFxuXG4gICAgcGxheWVyMSA9IG5ldyBQbGF5ZXIodXNlck5hbWUsIDEpXG4gICAgcGxheWVyMiA9IG5ldyBQbGF5ZXIoXCJhaVwiLCAyKVxuXG4gICAgXG4gICAgbWFrZVNoaXAoMSwgMSlcbiAgICBtYWtlU2hpcCgxLCAyKVxuICAgIG1ha2VTaGlwKDEsIDMpXG4gICAgbWFrZVNoaXAoMSwgNClcbiAgICBtYWtlU2hpcCgyLCA1KVxuICAgIG1ha2VTaGlwKDIsIDYpXG4gICAgbWFrZVNoaXAoMiwgNylcbiAgICBtYWtlU2hpcCgzLCA4KVxuICAgIG1ha2VTaGlwKDMsIDkpXG4gICAgbWFrZVNoaXAoNCwgMTApXG5cbiAgICBtYWtlU2hpcCgxLCAxMSlcbiAgICBtYWtlU2hpcCgxLCAxMilcbiAgICBtYWtlU2hpcCgxLCAxMylcbiAgICBtYWtlU2hpcCgxLCAxNClcbiAgICBtYWtlU2hpcCgyLCAxNSlcbiAgICBtYWtlU2hpcCgyLCAxNilcbiAgICBtYWtlU2hpcCgyLCAxNylcbiAgICBtYWtlU2hpcCgzLCAxOClcbiAgICBtYWtlU2hpcCgzLCAxOSlcbiAgICBtYWtlU2hpcCg0LCAyMClcbiAgICBcbiAgICBib2FyZDIuc2hpcFRvKFtcIkI2XCJdLCAxMSlcbiAgICBib2FyZDIuc2hpcFRvKFtcIkkxMFwiXSwgMTIpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJIMlwiXSwgMTMpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJDNFwiXSwgMTQpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJBMTBcIiwgXCJCMTBcIl0sIDE1KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiRjFcIiwgXCJGMlwiXSwgMTYpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJJNlwiLCBcIko2XCJdLCAxNylcbiAgICBib2FyZDIuc2hpcFRvKFtcIkQ5XCIsIFwiRTlcIiwgXCJGOVwiXSwgMTgpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJFNVwiLCBcIkU2XCIsIFwiRTdcIl0sIDE5KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQTFcIiwgXCJBMlwiLCBcIkEzXCIsIFwiQTRcIl0sIDIwKVxuXG4gICAgZW5lbXlCb2FyZCgpO1xuXG4gICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgaW5pdGFsU2hpcFBsYWNlbWVudCgpO1xuICAgIH0gZWxzZSB7XG5cbiAgICB9XG5cbiAgICBcblxuXG4gICAgZnVuY3Rpb24gd2lubmVyKCkge1xuICAgICAgICBjb25zdCB3aW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbm5lclwiKVxuICAgICAgICB3aW5uZXIudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIxLm5hbWV9IGlzIHRoZSB3aW5uZXIhYFxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHBsYXllcjEsXG4gICAgICAgIHBsYXllcjIsXG4gICAgICAgIGJvYXJkMSxcbiAgICAgICAgYm9hcmQyLFxuICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICB3aW5uZXIoKTtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coYm9hcmQxKVxuICAgICAgICAgICAgYm9hcmQxID0gbnVsbDtcbiAgICAgICAgICAgIGJvYXJkMiA9IG51bGw7XG4gICAgICAgICAgICBwbGF5ZXIxID0gbnVsbDtcbiAgICAgICAgICAgIHBsYXllcjIgPSBudWxsO1xuXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIilcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImJ1c3lcIilcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiaGl0XCIpXG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcIm1pc3NcIilcblxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuXG5cblxuXG5cbmNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5cIilcblxuZXhwb3J0IGNvbnN0IG5ld0dhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG5uZXdHYW1lLnRleHRDb250ZW50ID0gXCJOZXcgR2FtZVwiXG5uZXdHYW1lLmNsYXNzTGlzdC5hZGQoXCJuZXctZ2FtZVwiKVxuXG5pZiAoZG9jdW1lbnQuYm9keSAhPT0gbnVsbCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobmV3R2FtZSlcbn1cblxuXG5mdW5jdGlvbiBpbml0YWxTaGlwUGxhY2VtZW50KCkge1xuICAgIGJvYXJkMS5zaGlwVG8oW1wiQTFcIl0sIDEpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJBN1wiXSwgMilcbiAgICBib2FyZDEuc2hpcFRvKFtcIkgxXCJdLCAzKVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiSDRcIl0sIDQpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJDMTBcIiwgXCJEMTBcIl0sIDUpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJBNVwiLCBcIkI1XCJdLCA2KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiSjVcIiwgXCJKNlwiXSwgNylcbiAgICBib2FyZDEuc2hpcFRvKFtcIkQzXCIsIFwiRTNcIiwgXCJGM1wiXSwgOClcbiAgICBib2FyZDEuc2hpcFRvKFtcIkU1XCIsIFwiRTZcIiwgXCJFN1wiXSwgOSlcbiAgICBib2FyZDEuc2hpcFRvKFtcIkYxMFwiLCBcIkcxMFwiLCBcIkgxMFwiLCBcIkkxMFwiXSwgMTApXG4gICAgXG4gICAgXG59XG5cbmZ1bmN0aW9uIGVuZW15Qm9hcmQocmFuZG9tKSB7XG4gICAgYm9hcmQyLnNoaXBUbyhbXCJCNlwiXSwgMTEpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJJMTBcIl0sIDEyKVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSDJcIl0sIDEzKVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQzRcIl0sIDE0KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQTEwXCIsIFwiQjEwXCJdLCAxNSlcbiAgICBib2FyZDIuc2hpcFRvKFtcIkYxXCIsIFwiRjJcIl0sIDE2KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSTZcIiwgXCJKNlwiXSwgMTcpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJEOVwiLCBcIkU5XCIsIFwiRjlcIl0sIDE4KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiRTVcIiwgXCJFNlwiLCBcIkU3XCJdLCAxOSlcbiAgICBib2FyZDIuc2hpcFRvKFtcIkExXCIsIFwiQTJcIiwgXCJBM1wiLCBcIkE0XCJdLCAyMClcbn1cblxuXG5cblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IHsgZ2V0Qm9hcmQgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuXG5leHBvcnQgY29uc3Qgc2hpcHMgPSBbXTtcblxuXG5leHBvcnQgY29uc3QgbWFrZVNoaXAgPSAobGVuZ3RoLCBpZCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBib2F0Qm9keShsZW5ndGgpXG4gICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBpZCxcbiAgICAgICAgYm9keSxcbiAgICAgICAgaXNIaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBib2R5LnNvbWUoeCA9PiB4ID09PSB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBib2R5LmV2ZXJ5KHggPT4geCA9PT0gdHJ1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgaGl0OiAoaWR4KSA9PiB7XG4gICAgICAgICAgICBib2R5W2lkeF0gPSB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbXVxuICAgIH1cbiAgICBzaGlwcy5wdXNoKG9iailcbiAgICBcbiAgICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaGlwKGlkKSB7XG4gICAgXG4gICAgcmV0dXJuIHNoaXBzLmZpbmQoc2hpcCA9PiBzaGlwLmlkID09PSBpZClcbn1cblxuXG5mdW5jdGlvbiBib2F0Qm9keShsZW5ndGgpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFyci5wdXNoKGZhbHNlKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL1BsYXllci5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==