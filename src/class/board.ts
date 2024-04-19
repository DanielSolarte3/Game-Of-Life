import util from "../util";
import { Cell } from "./cell";

export class Board{

    board: Cell[][]=[[]];
    context: CanvasRenderingContext2D | null;

    constructor(board: Cell[][]=[[]], context: CanvasRenderingContext2D | null){
        this.board=board;
        this.context=context;
    }

    initializeBoard() {
        let status: number;
        for (let y = 0; y < util.props.rows; y++) {
            for (let x = 0; x < util.props.columns; x++) {
                status = Math.floor(Math.random() * 2);
                this.board[y][x] = new Cell(x, y, status, status, []);
            }
        }
    
        for (let y = 0; y < util.props.rows; y++) {
            for (let x = 0; x < util.props.columns; x++) {

                let cellNeighbors: Cell[]=[];

                for (let i=-1; i<2; i++) {
                    let xNeighbor;
                    let yNeighbor;
                    
                    for (let j=-1; j<2; j++) {
                        xNeighbor = (x + j + util.props.columns) % util.props.columns;
                        yNeighbor = (y + i + util.props.rows) % util.props.rows;
                        
                        if(i!=0 || j!=0){
                            cellNeighbors.push(this.board[yNeighbor][xNeighbor]);
                        }
                    }
                }

                this.board[y][x].addNeighbors(cellNeighbors);
            }
        }

        return this.board;
    }

    drawBoard(tileX: number, tileY: number) {
        // Dibuja los agentes
        for (let y=0; y<util.props.rows; y++) {
            for (let x=0; x<util.props.columns; x++) {
                this.board[y][x].draw(this.context,tileX,tileY);
            }
        }
    
        // Calcula el siguiente ciclo
        for (let y=0; y<util.props.rows; y++) {
            for (let x=0; x<util.props.columns; x++) {
                this.board[y][x].newCycle();
            }
        }
    
        // Aplica la mutación
        for (let y=0; y<util.props.rows; y++) {
            for (let x=0; x<util.props.columns; x++) {
                this.board[y][x].mutation();
            }
        }
    }
}