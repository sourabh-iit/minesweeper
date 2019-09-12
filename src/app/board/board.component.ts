import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  private size = 9;
  public rows = [];
  private total_mines = 10;
  public cells;
  public cellsRevealed;
  // running = 0, win = 1, lose = 2
  public gameState = 4
  private totalRevealed;
  public level;
  public boardStyle = {};
  public buttonStyle = {};
  public cellLength = 45;

  constructor(
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe(params => {
      this.level = params['level'];
      if(this.level=='beginner'){
        this.size = 9;
        this.total_mines = 10
      } else if(this.level=='intermediate'){
        this.size = 16;
        this.total_mines = 40;
      } else {
        this.size = 50;
        this.total_mines = 99;
      }
    });
  }

  public startGame(){
    this.totalRevealed = 0;
    this.gameState = 0;
    this.boardStyle = {
      width: this.size*this.cellLength+'px'
    };
    this.buttonStyle = {
      posiion: 'relative',
      top: this.size*this.cellLength+'px'
    }
    this.init();
  }

  private init(){
    let i;

    // make array for use in template
    for(i=0;i<this.size;i++){
      this.rows.push(i);
    }
    // init cells 2 dimensional array
    this.cells = [];
    this.cellsRevealed = []
    for(i=0;i<this.size;i++){
      let cellsRow = [];
      let cellsRevealedRow = [];
      for(let j=0;j<this.size;j++){
        cellsRow.push(0);
        cellsRevealedRow.push(false);
      }
      this.cells.push(cellsRow);
      this.cellsRevealed.push(cellsRevealedRow);
    }

    // randomly choose cells as having a mine
    let mine_indexes = [];
    let taken = {};
    let totalCells = this.size*this.size;
    for(i=0;i<this.total_mines;i++){
      let val = Math.floor(Math.random()*totalCells);
      while(val in taken) {
        val = Math.floor(Math.random()*totalCells);
      }
      mine_indexes.push(val);
      taken[val] = true;
    }

    // put -1 if contains mine else put count of number of adjacent mines
    for(i=0;i<this.total_mines;i++){
      let row = Math.floor(mine_indexes[i]/this.size);
      let column = mine_indexes[i]%this.size;
      this.cells[row][column] = -1;
      this.increaseAdjacentIndexesValue(row, column);
    }
  }

  private increaseAdjacentIndexesValue(row, col){
    for(let i=row-1;i<=row+1;i++){
      for(let j=col-1;j<=col+1;j++){
        if(i!=-1 && j!=-1 && i!=this.size && j!=this.size && this.cells[i][j]!=-1){
          this.cells[i][j]+=1;
        }
      }
    }
  }

  private reveal(row, column){
    for(let i=row-1;i<=row+1;i++){
      for(let j=column-1;j<=column+1;j++){
        if(i!=-1 && j!=-1 && i!=this.size && j!=this.size && !(i==row && j==column) && !this.cellsRevealed[i][j]){
          this.totalRevealed += 1
          this.cellsRevealed[i][j] = true;
          if(this.cells[i][j]==0){
            this.reveal(i,j);
          }
        }
      }
    }
  }

  public onclick(value, row, column){
    this.totalRevealed += 1;
    this.cellsRevealed[row][column] = true;
    if(value=='gameOver'){
      setTimeout(()=>this.gameState = 2, 1000);
    } else if(value=='showMines'){
      this.reveal(row, column);
    }
    if(this.totalRevealed==this.size*this.size-this.total_mines){
      this.gameState = 1;
    }
  }
}
