import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardModel } from 'src/api-models/board.model';
import { environment } from 'src/environments/environment';
import { BoardsService } from 'src/services/boards.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  isCreator: boolean = null;

  @Input() board: BoardModel;
  @Output() deleteBoard = new EventEmitter<BoardModel>();

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
                .current()
                .subscribe(user => {
                  this.board.creatorId == user.id ? this.isCreator = true : this.isCreator = false;
                });
  }
 

  

  delete(board: BoardModel) {
    this.deleteBoard.emit(board);
  }

  log(board: BoardModel) {
  }
}
