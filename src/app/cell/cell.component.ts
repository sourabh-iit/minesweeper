import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})

export class CellComponent implements OnInit {
  @Input() isRevealed;
  @Input() adjacentMines: number;
  @Input() row: number;
  @Input() column: number;
  @Input() cellLength;
  @Output() clicked = new EventEmitter();

  public isMine = false;
  public position = {};

  constructor(){}

  ngOnInit(){
    if(this.adjacentMines == -1){
      this.isMine = true;
    }
    this.position = {
      position: 'relative',
      top: (this.row+1)*this.cellLength+'px',
      left: this.column*this.cellLength+'px'
    }
  }

  onclick() {
    if(this.adjacentMines==0){
      this.clicked.emit('showMines');
    } else if(this.adjacentMines==-1){
      this.clicked.emit('gameOver');
    } else {
      this.clicked.emit('revealed')
    }
  }

}
