import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardModel } from 'src/api-models/board.model';
import { UserModel } from 'src/api-models/user.model';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  @Input() member: UserModel;
  @Input() board: BoardModel;
  @Input() isCreator: boolean;
  
  currentMember;
  currentBoardCreatorId;
  isUserCreator;

  @Output()
  deleteMember = new EventEmitter<UserModel>();

  constructor(){

  }
  ngOnInit(): void {
    this.currentMember = this.member;
    this.currentBoardCreatorId = this.board.creatorId;
    this.isUserCreator = this.isCreator;
  }
  delete(user: UserModel) {
    this.deleteMember.emit(user);
  }
}
