import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BoardsService } from 'src/services/boards.service';

@Component({
  selector: 'app-add-new-board-modal',
  templateUrl: './add-new-board-modal.component.html',
  styleUrls: ['./add-new-board-modal.component.css']
})
export class AddNewBoardModalComponent{

  private destroy$ = new Subject<void>();

  board_name: string = null;
  constructor(private boardsService: BoardsService){
  
  }
  
  createBoard() {
    this.boardsService
      .createBoard(this.board_name)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.board_name = '';
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
}


