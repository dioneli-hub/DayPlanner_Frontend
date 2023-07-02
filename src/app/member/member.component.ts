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
  
  currentMemberId;
  currentBoardCreatorId;
  isUserCreator;

  @Output()
  deleteMember = new EventEmitter<UserModel>();

  constructor(){

  }
  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    const isCreator = changes?.['isCreator']?.currentValue || this.isCreator;
    const member = changes?.['member']?.currentValue || this.member;
    const board = changes?.['board']?.currentValue || this.board;

    if(member) this.currentMemberId = member.id;
    if(isCreator) this.currentBoardCreatorId = board.creatorId;
    if(board) this.isUserCreator = isCreator;

    // if (user) {
    //   this.userService
    //     .getFollowers(user.id, this.usersLimit)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe(followers => {
    //       this.followers = followers;
    //       this.totalFollowers = this.followers.length
    //     });
    //   this.userService
    //     .getFollowsTo(user.id, this.usersLimit)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe(followTo => {
    //       this.followsTo = followTo;
    //       this.totalFollows = this.followsTo.length;
    //     });
    // }
  }
  
  delete(user: UserModel) {
    this.deleteMember.emit(user);
  }
}
