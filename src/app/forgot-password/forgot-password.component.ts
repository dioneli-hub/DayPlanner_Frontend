import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  email: string = '';
  
  error = '';
  errorMessage: string = '';

  showProcessSuccessMessage: boolean = false;
  showProcessLoadingMessage:boolean = false;


  constructor(//private authService: AuthenticationService,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
    this.showProcessSuccessMessage = false;
    this.showProcessLoadingMessage = false;
  }

              forgotPassword() {
                this.error = '';
                this.errorMessage = '';

                this.showProcessLoadingMessage = true;

                this.usersService.forgotPassword(this.email)
                  .subscribe({
                    next:(res: any) => {
                      if(res)
                      if(res.isSuccess == true){
                        this.errorMessage = ''

                        this.showProcessLoadingMessage = false;
                        this.showProcessSuccessMessage = true;
                        
                      } else {
                        this.showProcessLoadingMessage = false;
                        this.errorMessage = res.message
                      }
                  },
                    error: (error) => {
                      console.log(error)
                    }
                });
              }
}
