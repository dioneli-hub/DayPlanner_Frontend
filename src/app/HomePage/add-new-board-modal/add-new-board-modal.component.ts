import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BoardModel } from 'src/api-models/board.model';
import { BoardsService } from 'src/services/boards.service';

@Component({
  selector: 'app-add-new-board-modal',
  templateUrl: './add-new-board-modal.component.html',
  styleUrls: ['./add-new-board-modal.component.css']
})
export class AddNewBoardModalComponent{

  private destroy$ = new Subject<void>();

  board_name: string = '';

  @Output()
  boardCreate = new EventEmitter<BoardModel>();
  
  constructor(private boardsService: BoardsService,
    private router: Router,
   ){
  
  }
 
  createBoard() {
    this.boardsService
      .createBoard(this.board_name)
      .pipe(takeUntil(this.destroy$))
      .subscribe((board) => {
        this.board_name = '';
        this.boardCreate.emit(board);
      });
      
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}


