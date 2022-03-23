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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ships.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWlDOzs7QUFHMUI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qiw4QkFBOEI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsa0JBQWtCLEVBQUUsU0FBUztBQUNsRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxxQkFBcUIsK0NBQU87QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUU87QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRjRCOztBQUU1Qjs7O0FBR0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3JDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL0JvYXJkLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlLy4vc3JjL3NoaXBzLmpzIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NhdXRpb3VzLW9jdG8tYWR2ZW50dXJlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jYXV0aW91cy1vY3RvLWFkdmVudHVyZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vY2F1dGlvdXMtb2N0by1hZHZlbnR1cmUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNoaXAgfSBmcm9tIFwiLi9zaGlwc1wiXG5cblxuZXhwb3J0IGNsYXNzIGdhbWVCb2FyZCB7XG4gICAgY29uc3RydWN0b3IoaWQpIHtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuaWQgPSBpZFxuICAgICAgICB0aGlzLnNoaXBzID0gW107XG4gICAgICAgIHRoaXMuaGl0cyA9IFtdO1xuICAgICAgICB0aGlzLm1pc3NlZCA9IFtdO1xuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoID0gMDtcblxuICAgICAgICBjb25zdCBjZWxsc1BlclJvdyA9IDEwO1xuICAgICAgICBjb25zdCBsZXR0ZXJzID0gXCJBQkNERUZHSElKXCI7XG4gICAgICAgIGNvbnN0IGJvYXJkID0gW107XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLnBvdyhjZWxsc1BlclJvdywgMik7IGkrKykge1xuICAgICAgICBjb25zdCBjZWxsID0ge1xuICAgICAgICAgICAgY29sOiBNYXRoLmZsb29yKGkgLyBjZWxsc1BlclJvdykgKyAxLFxuICAgICAgICAgICAgcm93IDogaSAlIGNlbGxzUGVyUm93LFxuICAgICAgICAgICAgaWQ6IFwiXCIsXG4gICAgICAgICAgICBoaXQ6IGZhbHNlLFxuICAgICAgICAgICAgYnVzeTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgY2VsbC5pZCA9IGAke2xldHRlcnNbY2VsbC5yb3ddfSR7Y2VsbC5jb2x9YDtcbiAgICAgICAgYm9hcmQucHVzaChjZWxsKTtcblxuICAgICAgICB9ICAgICAgXG4gICAgfSBcbiAgICBcbiAgICBzaGlwVG8oY29vcmRpbmF0ZXMsIHNoaXBJZCkge1xuICAgICAgICBcbiAgICAgICAgY29vcmRpbmF0ZXMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmZpbmQoY2VsbCA9PiBjZWxsLmlkID09PSBjb29yZCkuYnVzeSA9IHRydWU7IFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBzaGlwID0gZ2V0U2hpcChzaGlwSWQpXG4gICAgICAgIHNoaXAuY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcClcblxuICAgICAgICB0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoICs9IGNvb3JkaW5hdGVzLmxlbmd0aFxuICAgIH0gIFxuXG4gICAgcmVjZWl2ZUF0dGFjayhjb29yZGluYXRlcykge1xuXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmZpbmQoY2VsbCA9PiBjZWxsLmlkID09PSBjb29yZGluYXRlcylcbiAgICAgICAgaWYgKGNlbGwuYnVzeSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMubWlzc2VkLnB1c2goY29vcmRpbmF0ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpdHMucHVzaChjb29yZGluYXRlcylcbiAgICAgICAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcC5jb29yZGluYXRlcy5zb21lKGNvb3JkID0+IGNvb3JkID09PSBjb29yZGluYXRlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHNoaXAuY29vcmRpbmF0ZXMuaW5kZXhPZihjb29yZGluYXRlcylcbiAgICAgICAgICAgICAgICAgICAgc2hpcC5oaXQoaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBcbiAgICAgICAgXG5cbiAgICB9XG5cbiAgICBjaGVja1N0YXR1cygpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5oaXRzLmxlbmd0aClcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb29yZGluYXRlc0xlbmd0aClcblxuXG4gICAgICAgIHJldHVybiB0aGlzLmNvb3JkaW5hdGVzTGVuZ3RoID09PSB0aGlzLmhpdHMubGVuZ3RoID8gY29uc29sZS5sb2coXCJhbGwgc3Vua1wiKSA6IGNvbnNvbGUubG9nKFwibm90IHN1bmtcIilcbiAgICB9XG4gICAgICAgXG59XG5cblxuXG5cblxuXG5cbmV4cG9ydCBjb25zdCBib2FyZDEgPSBuZXcgZ2FtZUJvYXJkKDEpO1xuZXhwb3J0IGNvbnN0IGJvYXJkMiA9IG5ldyBnYW1lQm9hcmQoMik7XG5cblxuXG5cblxuIiwiaW1wb3J0IHsgZ2V0Qm9hcmQgfSBmcm9tIFwiLi9Cb2FyZFwiO1xuXG5leHBvcnQgY29uc3Qgc2hpcHMgPSBbXTtcblxuXG5leHBvcnQgY29uc3QgbWFrZVNoaXAgPSAobGVuZ3RoLCBpZCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBib2F0Qm9keShsZW5ndGgpXG4gICAgY29uc3Qgb2JqID0ge1xuICAgICAgICBpZCxcbiAgICAgICAgYm9keSxcbiAgICAgICAgaXNIaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBib2R5LnNvbWUoeCA9PiB4ID09PSB0cnVlKVxuICAgICAgICB9LFxuICAgICAgICBpc1N1bms6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBib2R5LmV2ZXJ5KHggPT4geCA9PT0gdHJ1ZSlcbiAgICAgICAgfSxcbiAgICAgICAgaGl0OiAoaWR4KSA9PiB7XG4gICAgICAgICAgICBib2R5W2lkeF0gPSB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbXVxuICAgIH1cbiAgICBzaGlwcy5wdXNoKG9iailcbiAgICBcbiAgICByZXR1cm4gb2JqXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaGlwKGlkKSB7XG4gICAgcmV0dXJuIHNoaXBzLmZpbmQoc2hpcCA9PiBzaGlwLmlkID09PSBpZClcbn1cblxuXG5mdW5jdGlvbiBib2F0Qm9keShsZW5ndGgpIHtcbiAgICBsZXQgYXJyID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFyci5wdXNoKGZhbHNlKVxuICAgIH1cbiAgICByZXR1cm4gYXJyXG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NoaXBzLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9