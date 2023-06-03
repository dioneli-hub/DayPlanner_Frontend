import { Component, Input } from '@angular/core';
import { UserModel } from 'src/api-models/user.model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {

  @Input() member: UserModel;
}
