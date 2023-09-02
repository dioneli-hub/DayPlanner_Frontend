import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-join-board',
  templateUrl: './join-board.component.html',
  styleUrls: ['./join-board.component.css']
})
export class JoinBoardComponent {

  invitationToken: string;
  decline:string;
  
  constructor(private route: ActivatedRoute,
              private usersService: UsersService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.invitationToken = decodeURIComponent(params['token']);
      this.decline = decodeURIComponent(params['decline']);

      console.log('both')
      console.log( this.invitationToken)
      console.log(typeof this.decline)

      if(this.invitationToken && !this.decline){
        console.log('accept...')
        console.log( this.invitationToken)

        // this.usersService
        // .acceptBoardInvitation(this.invitationToken)
        // .subscribe();
 
      } else if (!this.invitationToken && this.decline){
        console.log('decline...')
        console.log(this.decline)
        // this.usersService
        // .declineBoardInvitation(this.invitationToken)
        // .subscribe();
      }
    });
  }
}
