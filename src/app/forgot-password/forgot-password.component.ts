import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email = '';
  
  error = '';
  errorMessage: string = '';


  constructor(//private authService: AuthenticationService,
              private usersService: UsersService,
              private router: Router) { }

              forgotPassword() {
                this.error = '';
                this.errorMessage = '';

                this.usersService.forgotPassword(this.email)
                  .subscribe({
                    next:(res: any) => {
                      if(res)
                      if(res.isSuccess == true){
                        this.errorMessage = ''
                        this.router.navigate(['/reset-password']).then();
                      } else {
                        this.errorMessage = res.message
                        console.log(this.errorMessage)
                      }
                  },
                    error: (error) => {
                      console.log(error)
                    }
                });
              }
}
