import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardModel } from 'src/api-models/board.model';
import { UserModel } from 'src/api-models/user.model';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  isCreator: boolean //= null;
  currentUser:UserModel = null;
  currentUserId:number = null;
  boardId: number = null;

  @Input() board: BoardModel;
  @Output() deleteBoard = new EventEmitter<BoardModel>();
  @Output()  leaveBoard = new EventEmitter<any>();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
                .current()
                .subscribe(user => {
                  this.board.creatorId == user.id ? this.isCreator = true : this.isCreator = false;
                  this.currentUser = user;
                  this.currentUserId = user.id;
                  this.boardId = this.board.id;
                });
  }

  leave(userId, boardId) {
    console.log("board component emitter")
    this.leaveBoard.emit({
      "userId" : userId, 
      "boardId" : boardId});
  } 

  delete(board: BoardModel) {
    this.deleteBoard.emit(board);
  }

  log(board: BoardModel) {
  }
}
