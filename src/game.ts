import { Board } from "./class/board";
import util from "./util";

let firstRun: boolean=true;

let canvas: HTMLCanvasElement | null;
let context: CanvasRenderingContext2D | null;
let fps = 15;

let canvasX = 400;
let canvasY = 400;

//let board: Board; // Tablero de Celulas

let tileX: number = 0;
let tileY: number = 0;

let intervalID: number=0;

function createArray2D(r:number, c:number) {
    let obj = new Array(c);
    for (let i=0; i<c; i++) {
        obj[i] = new Array(r);
    }
    return obj;
};

export function start() {
    canvas = document.getElementById('screen') as HTMLCanvasElement;
    context = canvas.getContext('2d');

    // Ajustar el tamaño del canvas
    canvas.width = canvasX;
    canvas.height = canvasY;

    // Calcular los tiles: cuadricula
    tileX = Math.floor(canvasX/util.props.rows);
    tileY = Math.floor(canvasY/util.props.columns);

    // Crear el tablero
    const board = Board.getInstance(createArray2D(util.props.rows,util.props.columns),context);
    
    // Inicializar el tablero
    if(firstRun){
        board.initializeBoard();
        firstRun=false;
    }

    // Ejecutar el bucle principal
    intervalID=setInterval(function(){main(board,tileX,tileY);}, 1000/fps);
}

function deleteCanvas() {
    // Validar que el canvas exista y no sea nulo
    if (canvas) {
        canvas.width = canvas.width;
        canvas.height = canvas.height;
    }
}

export function stop(){
    clearInterval(intervalID);
}

export function restart(){
    firstRun=true;
    start();
}

function main(board: Board, tileX: number, tileY:number) {
    deleteCanvas();
    board.drawBoard(tileX,tileY);
}