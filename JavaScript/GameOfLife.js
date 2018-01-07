document.addEventListener("DOMContentLoaded", start);

var numberOfRows = 50;
var numberOfCells = 50;
var chanceToSpawn = 10;
var widthOfEachCell;
var heightOfEachCell;
var windowWidth;
var windowHeight;
var grid;
var arrayOfCells;

function start() {
    arrayOfCells = new Array(numberOfRows);
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    widthOfEachCell = windowWidth / numberOfCells;
    heightOfEachCell = windowHeight / numberOfRows;
    buildArrayOfCells();
    buildBeginningArray();
    gameArea.start();
}

function buildArrayOfCells() {
    for (let i = 0; i < numberOfRows; i++) {
        arrayOfCells[i] = new Array(numberOfCells);
    }
}

function buildBeginningArray() {
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfCells; j++) {
            var aliveOrDead = Math.floor((Math.random() * 100));
            if (aliveOrDead <= chanceToSpawn) {
                arrayOfCells[i][j] = 1;
            }
            else {
                arrayOfCells[i][j] = 0;
            }
        }
    }
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = windowWidth;
        this.canvas.height = windowHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGrid, 1000);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function updateGrid() {
    gameArea.clear();
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfCells; j++) {
            cntx = gameArea.context;
            if (arrayOfCells[i][j] === 1) {
                cntx.fillStyle = "black";
                cntx.fillRect(widthOfEachCell * i, heightOfEachCell * j,
                                widthOfEachCell, heightOfEachCell);
            }
            else {
                cntx.fillStyle = "white";
            }
        }
    }
    computeNextGrid();
}

function computeNextGrid() {
    var tempArrayOfCells = arrayOfCells;
    for (let i = 0; i < numberOfRows; i++) {
        for (let j = 0; j < numberOfCells; j++) {
            var numberOfNeighbors = computeNumberOfNeighbors(i, j);
            if (arrayOfCells[i][j] === 0) {
                if (numberOfNeighbors === 3) {
                    tempArrayOfCells[i][j] = 1;
                }
            }
            else {
                if (numberOfNeighbors < 2) {
                   tempArrayOfCells[i][j] = 0;
                }
                if (numberOfNeighbors > 3) {
                    tempArrayOfCells[i][j] = 0;
                }
            }
        }
    }
    arrayOfCells = tempArrayOfCells;
}

function computeNumberOfNeighbors(i, j) {
    var numberOfNeighbors = 0;
    var rowLimit = arrayOfCells.length-1;
    var columnLimit = arrayOfCells[0].length-1;
    for(var x = Math.max(0, i-1); x <= Math.min(i+1, rowLimit); x++) {
        for(var y = Math.max(0, j-1); y <= Math.min(j+1, columnLimit); y++) {
            if(x !== i || y !== j) {
                if (arrayOfCells[x][y] === 1) {
                    numberOfNeighbors++;
                }
            }
        }
    }
    return numberOfNeighbors;
}