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
/* harmony export */   "board1": () => (/* binding */ board1),
/* harmony export */   "board2": () => (/* binding */ board2),
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard)
/* harmony export */ });
/* harmony import */ var _ships__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ships */ "./src/ships.js");



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
        const ship = (0,_ships__WEBPACK_IMPORTED_MODULE_0__.getShip)(shipId)
        ship.coordinates = coordinates
        this.ships.push(ship)

        this.coordinatesLength += coordinates.length
    }  

    receiveAttack(coordinates) {

        const cell = this.board.find(cell => cell.id === coordinates)
        if (cell.busy === false) {
            this.missed.push(coordinates)
        } else {
            this.hits.push(coordinates)
            this.ships.forEach(ship => {
                if (ship.coordinates.some(coord => coord === coordinates)) {
                    
                    const idx = ship.coordinates.indexOf(coordinates)
                    ship.hit(idx);
                    
                    return;
                } 
                
            })
        } 
        

    }

    checkStatus() {
        console.log(this.hits.length)
        console.log(this.coordinatesLength)


        return this.coordinatesLength === this.hits.length ? console.log("all sunk") : console.log("not sunk")
    }
       
}







const board1 = new gameBoard(1);
const board2 = new gameBoard(2);







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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ "./src/Board.js");
const { makeShip, board1ships } = __webpack_require__(/*! ./ships */ "./src/ships.js");






const ship = makeShip(1, 1)
const ship2 = makeShip(2, 2)
const ship3 = makeShip(1, 3)
const ship4 = makeShip(4, 4)

























})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWlDOzs7QUFHMUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw4QkFBOEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsa0JBQWtCLEVBQUUsU0FBUztBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxxQkFBcUIsK0NBQU87QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUU87QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRjRCOztBQUU1Qjs7O0FBR0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3JDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkEsUUFBUSx3QkFBd0IsRUFBRSxtQkFBTyxDQUFDLCtCQUFTO0FBQ1Y7Ozs7OztBQU16QztBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL0JvYXJkLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U2hpcCB9IGZyb20gXCIuL3NoaXBzXCJcblxuXG5leHBvcnQgY2xhc3MgZ2FtZUJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihpZCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5pZCA9IGlkXG4gICAgICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICAgICAgdGhpcy5oaXRzID0gW107XG4gICAgICAgIHRoaXMubWlzc2VkID0gW107XG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXNMZW5ndGggPSAwO1xuXG4gICAgICAgIGNvbnN0IGNlbGxzUGVyUm93ID0gMTA7XG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBcIkFCQ0RFRkdISUpcIjtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBbXTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1hdGgucG93KGNlbGxzUGVyUm93LCAyKTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB7XG4gICAgICAgICAgICBjb2w6IE1hdGguZmxvb3IoaSAvIGNlbGxzUGVyUm93KSArIDEsXG4gICAgICAgICAgICByb3cgOiBpICUgY2VsbHNQZXJSb3csXG4gICAgICAgICAgICBpZDogXCJcIixcbiAgICAgICAgICAgIGhpdDogZmFsc2UsXG4gICAgICAgICAgICBidXN5OiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICBjZWxsLmlkID0gYCR7bGV0dGVyc1tjZWxsLnJvd119JHtjZWxsLmNvbH1gO1xuICAgICAgICBib2FyZC5wdXNoKGNlbGwpO1xuXG4gICAgICAgIH0gICAgICBcbiAgICB9IFxuICAgIFxuICAgIHNoaXBUbyhjb29yZGluYXRlcywgc2hpcElkKSB7XG4gICAgICAgIFxuICAgICAgICBjb29yZGluYXRlcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuZmluZChjZWxsID0+IGNlbGwuaWQgPT09IGNvb3JkKS5idXN5ID0gdHJ1ZTsgXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IHNoaXAgPSBnZXRTaGlwKHNoaXBJZClcbiAgICAgICAgc2hpcC5jb29yZGluYXRlcyA9IGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKVxuXG4gICAgICAgIHRoaXMuY29vcmRpbmF0ZXNMZW5ndGggKz0gY29vcmRpbmF0ZXMubGVuZ3RoXG4gICAgfSAgXG5cbiAgICByZWNlaXZlQXR0YWNrKGNvb3JkaW5hdGVzKSB7XG5cbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmQuZmluZChjZWxsID0+IGNlbGwuaWQgPT09IGNvb3JkaW5hdGVzKVxuICAgICAgICBpZiAoY2VsbC5idXN5ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5taXNzZWQucHVzaChjb29yZGluYXRlcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGl0cy5wdXNoKGNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwLmNvb3JkaW5hdGVzLnNvbWUoY29vcmQgPT4gY29vcmQgPT09IGNvb3JkaW5hdGVzKSkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gc2hpcC5jb29yZGluYXRlcy5pbmRleE9mKGNvb3JkaW5hdGVzKVxuICAgICAgICAgICAgICAgICAgICBzaGlwLmhpdChpZHgpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IFxuICAgICAgICBcblxuICAgIH1cblxuICAgIGNoZWNrU3RhdHVzKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmhpdHMubGVuZ3RoKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoKVxuXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY29vcmRpbmF0ZXNMZW5ndGggPT09IHRoaXMuaGl0cy5sZW5ndGggPyBjb25zb2xlLmxvZyhcImFsbCBzdW5rXCIpIDogY29uc29sZS5sb2coXCJub3Qgc3Vua1wiKVxuICAgIH1cbiAgICAgICBcbn1cblxuXG5cblxuXG5cblxuZXhwb3J0IGNvbnN0IGJvYXJkMSA9IG5ldyBnYW1lQm9hcmQoMSk7XG5leHBvcnQgY29uc3QgYm9hcmQyID0gbmV3IGdhbWVCb2FyZCgyKTtcblxuXG5cblxuXG4iLCJpbXBvcnQgeyBnZXRCb2FyZCB9IGZyb20gXCIuL0JvYXJkXCI7XG5cbmV4cG9ydCBjb25zdCBzaGlwcyA9IFtdO1xuXG5cbmV4cG9ydCBjb25zdCBtYWtlU2hpcCA9IChsZW5ndGgsIGlkKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IGJvYXRCb2R5KGxlbmd0aClcbiAgICBjb25zdCBvYmogPSB7XG4gICAgICAgIGlkLFxuICAgICAgICBib2R5LFxuICAgICAgICBpc0hpdDogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJvZHkuc29tZSh4ID0+IHggPT09IHRydWUpXG4gICAgICAgIH0sXG4gICAgICAgIGlzU3VuazogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJvZHkuZXZlcnkoeCA9PiB4ID09PSB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICBoaXQ6IChpZHgpID0+IHtcbiAgICAgICAgICAgIGJvZHlbaWR4XSA9IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtdXG4gICAgfVxuICAgIHNoaXBzLnB1c2gob2JqKVxuICAgIFxuICAgIHJldHVybiBvYmpcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNoaXAoaWQpIHtcbiAgICByZXR1cm4gc2hpcHMuZmluZChzaGlwID0+IHNoaXAuaWQgPT09IGlkKVxufVxuXG5cbmZ1bmN0aW9uIGJvYXRCb2R5KGxlbmd0aCkge1xuICAgIGxldCBhcnIgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyLnB1c2goZmFsc2UpXG4gICAgfVxuICAgIHJldHVybiBhcnJcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgeyBtYWtlU2hpcCwgYm9hcmQxc2hpcHMgfSA9IHJlcXVpcmUoXCIuL3NoaXBzXCIpO1xuaW1wb3J0IHsgYm9hcmQxLCBib2FyZHMgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuXG5cblxuXG5cbmNvbnN0IHNoaXAgPSBtYWtlU2hpcCgxLCAxKVxuY29uc3Qgc2hpcDIgPSBtYWtlU2hpcCgyLCAyKVxuY29uc3Qgc2hpcDMgPSBtYWtlU2hpcCgxLCAzKVxuY29uc3Qgc2hpcDQgPSBtYWtlU2hpcCg0LCA0KVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9