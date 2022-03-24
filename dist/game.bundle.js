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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/game.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSm1DOztBQUU1Qjs7O0FBR0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDdENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvLi9zcmMvQm9hcmQuanMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvLi9zcmMvUGxheWVyLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvLi9zcmMvc2hpcHMuanMiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IGdldFNoaXAgfSBmcm9tIFwiLi9zaGlwc1wiXG5pbXBvcnQgeyBwbGF5ZXIxIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5leHBvcnQgY2xhc3MgZ2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihpZCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pZCA9IGlkXG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICAgICAgdGhpcy5oaXRzID0gW107XG4gICAgICAgIHRoaXMubWlzc2VkID0gW107XG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXNMZW5ndGggPSAwO1xuXG4gICAgICAgIGNvbnN0IGNlbGxzUGVyUm93ID0gMTA7XG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBcIkFCQ0RFRkdISUpcIjtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgucG93KGNlbGxzUGVyUm93LCAyKTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB7XG4gICAgICAgICAgICBjb2w6IE1hdGguZmxvb3IoaSAvIGNlbGxzUGVyUm93KSArIDEsXG4gICAgICAgICAgICByb3cgOiBpICUgY2VsbHNQZXJSb3csXG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIGhpdDogZmFsc2UsXG4gICAgICAgICAgICBidXN5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICBjZWxsLmlkID0gYCR7bGV0dGVyc1tjZWxsLnJvd119JHtjZWxsLmNvbH1gO1xuICAgICAgICBib2FyZC5wdXNoKGNlbGwpO1xuXG4gICAgICAgIH0gICAgICBcbiAgICB9IFxuICAgIFxuICAgIHNoaXBUbyhjb29yZGluYXRlcywgc2hpcElkKSB7XG4gICAgICAgIFxuICAgICAgICBjb29yZGluYXRlcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmJvYXJkLmZpbmQoY2VsbCA9PiBjZWxsLmlkID09PSBjb29yZCkuYnVzeSA9IHRydWU7IFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcChzaGlwSWQpXG4gICAgICAgIFxuICAgICAgICBzaGlwLmNvb3JkaW5hdGVzID0gY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApXG5cbiAgICAgICAgdGhpcy5jb29yZGluYXRlc0xlbmd0aCArPSBjb29yZGluYXRlcy5sZW5ndGhcbiAgICB9ICBcblxuICAgIHJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coY29vcmRpbmF0ZXMpXG4gICAgICAgIGxldCBjbGFzc0lkO1xuICAgICAgICB0aGlzLmlkID09PSAxID8gY2xhc3NJZCA9IFwib25lXCIgOiBjbGFzc0lkID0gXCJ0d29cIlxuICAgICAgICBcbiAgICAgICAgY29uc3QgY2VsbERPTSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzSWR9W2RhdGEtaWQ9XCIke2Nvb3JkaW5hdGVzfVwiXWApXG4gICAgICAgIGNvbnNvbGUubG9nKGNlbGxET00pXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmZpbmQoY2VsbCA9PiBjZWxsLmlkID09PSBjb29yZGluYXRlcylcbiAgICAgICAgY29uc29sZS5sb2coY2VsbClcbiAgICAgICAgaWYgKGNlbGwuYnVzeSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGNlbGxET00uY2xhc3NMaXN0LmFkZChcIm1pc3NcIilcbiAgICAgICAgICAgIHRoaXMubWlzc2VkLnB1c2goY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oaXRzLmluZGV4T2YoY29vcmRpbmF0ZXMpICE9IC0xKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFscmVhZHkgaGl0XCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuaGl0cy5wdXNoKGNvb3JkaW5hdGVzKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlcy5zb21lKGNvb3JkID0+IGNvb3JkID09PSBjb29yZGluYXRlcykpIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuaWNlXCIpXG4gICAgICAgICAgICBjb25zdCBpZHggPSBzaGlwLmNvb3JkaW5hdGVzLmluZGV4T2YoY29vcmRpbmF0ZXMpXG4gICAgICAgICAgICBzaGlwLmhpdChpZHgpO1xuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgY2VsbERPTS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgIH1cbiAgICBjaGVja1N0YXR1cygpIHtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoID09PSB0aGlzLmhpdHMubGVuZ3RoXG4gICAgfVxuICAgICAgIFxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cbiIsImltcG9ydCB7IGJvYXJkMiwgYm9hcmQxLCBwbGF5ZXIyLCBwbGF5ZXIxLCBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiXG5cblxuZXhwb3J0IGNsYXNzIFBsYXllciB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpZCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgICAgIHRoaXMuaWQgPSBpZFxuICAgIH1cblxuICAgIGF0dGFjayhjb29yZGluYXRlcykge1xuICAgICAgICBcbiAgICAgICAgaWYgKHR1cm4gIT09IHRoaXMuaWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IHlvdXIgdHVyblwiKVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlkID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYm9hcmQyLnJlY2VpdmVBdHRhY2soY29vcmRpbmF0ZXMpXG5cbiAgICAgICAgICAgICAgICBpZiAoYm9hcmQyLmNoZWNrU3RhdHVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2FtZShwbGF5ZXIxLm5hbWUpLmVuZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHVybiA9IDI7XG4gICAgICAgICAgICAgICAgcGxheWVyMi5hdHRhY2soKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYm9hcmQxLnJlY2VpdmVBdHRhY2soYWlSYW5kb20oKSlcblxuICAgICAgICAgICAgICAgIGlmIChib2FyZDEuY2hlY2tTdGF0dXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBnYW1lKHBsYXllcjIubmFtZSkuZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0dXJuID0gMTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmxldCB0dXJuID0gMTtcbmV4cG9ydCBsZXQgcmFuZG9tO1xuY29uc3QgYXJyID0gW107XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGFpUmFuZG9tKCkge1xuICAgIGNvbnN0IGxldHRlcnMgPSBcIkFCQ0RFRkdISUpcIjtcbiAgICBjb25zdCBsZXR0ZXIgPSBsZXR0ZXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV1cblxuICAgIGNvbnN0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgcmFuZG9tID0gbGV0dGVyICsgbnVtYmVyXG4gICAgXG4gICAgXG4gICAgaWYgKGFyci5zb21lKHZhbCA9PiB2YWwgPT09IHJhbmRvbSkpIHJldHVybiBhaVJhbmRvbSgpO1xuICAgIGFyci5wdXNoKHJhbmRvbSlcblxuXG4gICAgXG4gICAgcmV0dXJuIHJhbmRvbVxufVxuIiwiXG5cbmltcG9ydCB7IGdhbWVCb2FyZCB9IGZyb20gXCIuL0JvYXJkXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJcIjtcbmltcG9ydCB7bWFrZVNoaXB9IGZyb20gXCIuL3NoaXBzXCI7XG5cblxuXG5leHBvcnQgbGV0IGJvYXJkMTtcbmV4cG9ydCBsZXQgYm9hcmQyO1xuZXhwb3J0IGxldCBwbGF5ZXIxO1xuZXhwb3J0IGxldCBwbGF5ZXIyO1xuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWUodXNlck5hbWUsIGlzRmlyc3QpIHtcblxuICAgIFxuICAgIFxuICAgIFxuICAgIGJvYXJkMSA9IG5ldyBnYW1lQm9hcmQoMSlcbiAgICBib2FyZDIgPSBuZXcgZ2FtZUJvYXJkKDIpXG5cbiAgICBcblxuICAgIHBsYXllcjEgPSBuZXcgUGxheWVyKHVzZXJOYW1lLCAxKVxuICAgIHBsYXllcjIgPSBuZXcgUGxheWVyKFwiYWlcIiwgMilcblxuICAgIFxuICAgIG1ha2VTaGlwKDEsIDEpXG4gICAgbWFrZVNoaXAoMSwgMilcbiAgICBtYWtlU2hpcCgxLCAzKVxuICAgIG1ha2VTaGlwKDEsIDQpXG4gICAgbWFrZVNoaXAoMiwgNSlcbiAgICBtYWtlU2hpcCgyLCA2KVxuICAgIG1ha2VTaGlwKDIsIDcpXG4gICAgbWFrZVNoaXAoMywgOClcbiAgICBtYWtlU2hpcCgzLCA5KVxuICAgIG1ha2VTaGlwKDQsIDEwKVxuXG4gICAgbWFrZVNoaXAoMSwgMTEpXG4gICAgbWFrZVNoaXAoMSwgMTIpXG4gICAgbWFrZVNoaXAoMSwgMTMpXG4gICAgbWFrZVNoaXAoMSwgMTQpXG4gICAgbWFrZVNoaXAoMiwgMTUpXG4gICAgbWFrZVNoaXAoMiwgMTYpXG4gICAgbWFrZVNoaXAoMiwgMTcpXG4gICAgbWFrZVNoaXAoMywgMTgpXG4gICAgbWFrZVNoaXAoMywgMTkpXG4gICAgbWFrZVNoaXAoNCwgMjApXG4gICAgXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJCNlwiXSwgMTEpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJJMTBcIl0sIDEyKVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSDJcIl0sIDEzKVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQzRcIl0sIDE0KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiQTEwXCIsIFwiQjEwXCJdLCAxNSlcbiAgICBib2FyZDIuc2hpcFRvKFtcIkYxXCIsIFwiRjJcIl0sIDE2KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSTZcIiwgXCJKNlwiXSwgMTcpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJEOVwiLCBcIkU5XCIsIFwiRjlcIl0sIDE4KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiRTVcIiwgXCJFNlwiLCBcIkU3XCJdLCAxOSlcbiAgICBib2FyZDIuc2hpcFRvKFtcIkExXCIsIFwiQTJcIiwgXCJBM1wiLCBcIkE0XCJdLCAyMClcblxuICAgIGVuZW15Qm9hcmQoKTtcblxuICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgIGluaXRhbFNoaXBQbGFjZW1lbnQoKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuXG4gICAgXG5cblxuICAgIGZ1bmN0aW9uIHdpbm5lcigpIHtcbiAgICAgICAgY29uc3Qgd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53aW5uZXJcIilcbiAgICAgICAgd2lubmVyLnRleHRDb250ZW50ID0gYCR7cGxheWVyMS5uYW1lfSBpcyB0aGUgd2lubmVyIWBcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwbGF5ZXIxLFxuICAgICAgICBwbGF5ZXIyLFxuICAgICAgICBib2FyZDEsXG4gICAgICAgIGJvYXJkMixcbiAgICAgICAgZW5kKCkge1xuICAgICAgICAgICAgd2lubmVyKCk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGJvYXJkMSlcbiAgICAgICAgICAgIGJvYXJkMSA9IG51bGw7XG4gICAgICAgICAgICBib2FyZDIgPSBudWxsO1xuICAgICAgICAgICAgcGxheWVyMSA9IG51bGw7XG4gICAgICAgICAgICBwbGF5ZXIyID0gbnVsbDtcblxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jZWxsXCIpXG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJidXN5XCIpXG4gICAgICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImhpdFwiKVxuICAgICAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJtaXNzXCIpXG5cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuXG5cblxuXG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpXG5cbmV4cG9ydCBjb25zdCBuZXdHYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxubmV3R2FtZS50ZXh0Q29udGVudCA9IFwiTmV3IEdhbWVcIlxubmV3R2FtZS5jbGFzc0xpc3QuYWRkKFwibmV3LWdhbWVcIilcblxuaWYgKGRvY3VtZW50LmJvZHkgIT09IG51bGwpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5ld0dhbWUpXG59XG5cblxuZnVuY3Rpb24gaW5pdGFsU2hpcFBsYWNlbWVudCgpIHtcbiAgICBib2FyZDEuc2hpcFRvKFtcIkExXCJdLCAxKVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiQTdcIl0sIDIpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJIMVwiXSwgMylcbiAgICBib2FyZDEuc2hpcFRvKFtcIkg0XCJdLCA0KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiQzEwXCIsIFwiRDEwXCJdLCA1KVxuICAgIGJvYXJkMS5zaGlwVG8oW1wiQTVcIiwgXCJCNVwiXSwgNilcbiAgICBib2FyZDEuc2hpcFRvKFtcIko1XCIsIFwiSjZcIl0sIDcpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJEM1wiLCBcIkUzXCIsIFwiRjNcIl0sIDgpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJFNVwiLCBcIkU2XCIsIFwiRTdcIl0sIDkpXG4gICAgYm9hcmQxLnNoaXBUbyhbXCJGMTBcIiwgXCJHMTBcIiwgXCJIMTBcIiwgXCJJMTBcIl0sIDEwKVxuICAgIFxuICAgIFxufVxuXG5mdW5jdGlvbiBlbmVteUJvYXJkKHJhbmRvbSkge1xuICAgIGJvYXJkMi5zaGlwVG8oW1wiQjZcIl0sIDExKVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiSTEwXCJdLCAxMilcbiAgICBib2FyZDIuc2hpcFRvKFtcIkgyXCJdLCAxMylcbiAgICBib2FyZDIuc2hpcFRvKFtcIkM0XCJdLCAxNClcbiAgICBib2FyZDIuc2hpcFRvKFtcIkExMFwiLCBcIkIxMFwiXSwgMTUpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJGMVwiLCBcIkYyXCJdLCAxNilcbiAgICBib2FyZDIuc2hpcFRvKFtcIkk2XCIsIFwiSjZcIl0sIDE3KVxuICAgIGJvYXJkMi5zaGlwVG8oW1wiRDlcIiwgXCJFOVwiLCBcIkY5XCJdLCAxOClcbiAgICBib2FyZDIuc2hpcFRvKFtcIkU1XCIsIFwiRTZcIiwgXCJFN1wiXSwgMTkpXG4gICAgYm9hcmQyLnNoaXBUbyhbXCJBMVwiLCBcIkEyXCIsIFwiQTNcIiwgXCJBNFwiXSwgMjApXG59XG5cblxuXG5cblxuXG5cblxuXG5cbiIsImltcG9ydCB7IGdldEJvYXJkIH0gZnJvbSBcIi4vQm9hcmRcIjtcblxuZXhwb3J0IGNvbnN0IHNoaXBzID0gW107XG5cblxuZXhwb3J0IGNvbnN0IG1ha2VTaGlwID0gKGxlbmd0aCwgaWQpID0+IHtcbiAgICBjb25zdCBib2R5ID0gYm9hdEJvZHkobGVuZ3RoKVxuICAgIGNvbnN0IG9iaiA9IHtcbiAgICAgICAgaWQsXG4gICAgICAgIGJvZHksXG4gICAgICAgIGlzSGl0OiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYm9keS5zb21lKHggPT4geCA9PT0gdHJ1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgaXNTdW5rOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYm9keS5ldmVyeSh4ID0+IHggPT09IHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIGhpdDogKGlkeCkgPT4ge1xuICAgICAgICAgICAgYm9keVtpZHhdID0gdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjb29yZGluYXRlczogW11cbiAgICB9XG4gICAgc2hpcHMucHVzaChvYmopXG4gICAgXG4gICAgcmV0dXJuIG9ialxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2hpcChpZCkge1xuICAgIFxuICAgIHJldHVybiBzaGlwcy5maW5kKHNoaXAgPT4gc2hpcC5pZCA9PT0gaWQpXG59XG5cblxuZnVuY3Rpb24gYm9hdEJvZHkobGVuZ3RoKSB7XG4gICAgbGV0IGFyciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBhcnIucHVzaChmYWxzZSlcbiAgICB9XG4gICAgcmV0dXJuIGFyclxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9nYW1lLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9