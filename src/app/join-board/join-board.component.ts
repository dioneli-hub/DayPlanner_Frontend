import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-join-board',
  templateUrl: './join-board.component.html',
  styleUrls: ['./join-board.component.css']
})
export class JoinBoardComponent {

  invitationToken: string | undefined;
  decline:string | undefined;
  showInvitationMessage: boolean =false;
  showLoading: boolean =false;
  responseMessage:string | null = null;
  status:string | null = null;
  isAuthenticatedAsTargetUser : boolean = false;
  isAuthenticatedAsAnotherUser : boolean = false;
  isAuthenticated: boolean = false;
  currentUserId:number | null = null;
  isAcceptanceResponseSuccessful: boolean | null = null;
  invitationBoardId :number | null = null;
  
  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private authService: AuthenticationService,) {}

    get redirectToBoard(){
      return (this.isAuthenticatedAsTargetUser == true && this.isAcceptanceResponseSuccessful == true && this.decline == 'false')
      && this.showLoading == false?
        true: false
    }

    get redirectHome(){
      return (this.isAuthenticatedAsAnotherUser == true 
      || (this.isAuthenticatedAsTargetUser == true && this.isAcceptanceResponseSuccessful == false) 
      || this.isAuthenticated == true && this.isAuthenticatedAsTargetUser == false)
      && this.showLoading == false ?
        true: false
    }

    get redirectToLogin(){
      return (this.isAuthenticatedAsAnotherUser == false &&
            this.isAuthenticatedAsTargetUser == false
            && this.isAuthenticated == false 
            && this.showLoading == false)
            ||
            (this.isAuthenticated == false 
              && this.showLoading == false)
            ?
        true: false
    }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.invitationToken = decodeURIComponent(params['token']) ;
      this.decline = decodeURIComponent(params['decline']) ;

      if (this.isAuthenticated = this.authService.isAuthenticated()){
        this.usersService.current()
        .subscribe((user)=>{
          this.currentUserId = user.id;
          })
      }

      // if (!this.authService.isAuthenticated()) {
        // this.router.navigate(['/login']).then();
      // }

      if(this.invitationToken && this.decline == 'false'){
        
        this.showLoading = true;

        this.usersService
        .acceptBoardInvitation(this.invitationToken)
        .subscribe(res => {

          // console.log(res)
          this.responseMessage = res.message;

          this.isAuthenticatedAsTargetUser = this.currentUserId == res?.data?.memberId;

          this.isAuthenticatedAsAnotherUser = this.currentUserId !=null && this.currentUserId != res?.data?.memberId;

          if(res.isSuccess == true){
            this.isAcceptanceResponseSuccessful = true;
            this.invitationBoardId = res.data?.boardId;
            this.status = "Congratulations!"
          } else {
            this.isAcceptanceResponseSuccessful == false;
            this.status = "Error..."
          }
          this.showLoading = false;
          this.showInvitationMessage = true;
        });
 
      } else if (this.invitationToken &&  this.decline == 'true'){
        this.usersService
        .declineBoardInvitation(this.invitationToken)
        .subscribe(res=> {

          

          if(res.isSuccess == true){
            this.status = "Invitation Declined!"
            this.responseMessage = "Board owner will be notified"
          } else {
            this.isAcceptanceResponseSuccessful == false;
            this.status = "Error..."
            this.responseMessage = res.message;
          }

          this.showLoading = false;
          this.showInvitationMessage = true;
      });

      }
    });
  }
}