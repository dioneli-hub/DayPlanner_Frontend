import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserModel } from 'src/api-models/user.model';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {

  @Input() member: UserModel;
  
  @Output()
  deleteMember = new EventEmitter<UserModel>();

  constructor(){

  }
  delete(user: UserModel) {
    this.deleteMember.emit(user);
  }
}
