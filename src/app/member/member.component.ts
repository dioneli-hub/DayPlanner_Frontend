import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BoardModel } from 'src/api-models/board.model';
import { UserModel } from 'src/api-models/user.model';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit, OnChanges {

  @Input() member: UserModel;
  @Input() board: BoardModel;
  @Input() isCreator: boolean;
  
  currentUserId: number;
  currentMemberId: number;
  currentBoardCreatorId: number;
  isUserCreator: boolean;
  boardId: number;

  @Output()  deleteMember = new EventEmitter<UserModel>();
  @Output()  leaveBoard = new EventEmitter<UserModel>();

  constructor(private usersService: UsersService){}

  ngOnInit(): void {
    this.usersService
      .current()
      .subscribe((user)=>{
        this.currentUserId = user?.id;
      })
    this.boardId = this.board?.id
  }

  get memberName(){
    return `${this.member.firstName} ${this.member.lastName}`
  }

  ngOnChanges(changes: SimpleChanges) {
    const isCreator = changes?.['isCreator']?.currentValue || this.isCreator;
    const member = changes?.['member']?.currentValue || this.member;
    const board = changes?.['board']?.currentValue || this.board;

    if(member) this.currentMemberId = member.id;
    if(isCreator) this.currentBoardCreatorId = board.creatorId;
    if(board) this.isUserCreator = isCreator;

  }
  
  delete(user: UserModel) {
    this.deleteMember.emit(user);
  }

  leave(user: UserModel) {
    this.leaveBoard.emit(user);
  }
}
