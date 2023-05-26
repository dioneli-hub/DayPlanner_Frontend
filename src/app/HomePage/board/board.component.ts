import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardModel } from 'src/api-models/board.model';
import { environment } from 'src/environments/environment';
import { BoardsService } from 'src/services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() board: BoardModel;

  
  @Output()
  deleteBoard = new EventEmitter<BoardModel>();

  constructor(private boardsService: BoardsService){

  }
  delete(board: BoardModel) {
    this.deleteBoard.emit(board);
  }
  

}
