import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/services/users.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email = '';
  password = '';

  new_email = '';
  new_password = '';
  first_name = '';
  last_name = '';

  error = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService,
              private usersService: UsersService,
              private router: Router) { }

              ngOnInit(): void {
                if (this.authService.isAuthenticated()) {
                  this.router.navigate(['/']).then();
                }
              }

              auth() {
                this.authenticate(this.email, this.password);
              }
            
              authenticate(email: string, password: string) {
                // this.error = '';
                // this.authService
                //   .auth(email, password)
                //   .subscribe((res) => {
                //     if (res) {
                //       this.router.navigate(['/']).then();
                //     }
                //   }, err => this.error = err.error.error)
                  this.error = '';
                  this.errorMessage = '';

                  this.authService
                    .auth(email, password)
                    .subscribe
                      ({
                          next:(res: any) => {
                            console.log(res);
                            if(res)
                            if(res.isSuccess == true){
                              this.router.navigate(['/']).then();
                            } else {
                              this.errorMessage = res.message
                            }
                        },
                          error: error => console.log(error)
                      });
                }
              
            
              createAccount() 
              {
                this.errorMessage = '';
                this.error = '';
                
                this.usersService
                  .create(this.first_name, this.last_name, this.new_email, this.new_password)
                    .subscribe
                    ({
                        next:(res: any) => {
                          console.log(res)
                          if(res.isSuccess == true){
                            this.authenticate(this.new_email, this.new_password);
                          } else {
                            this.errorMessage = res.message
                          }
                      },
                        error: error => console.log(error)
                    });
                      
              }
              // {
              //   this.errorMessage = '';
              //   this.error = '';
              //   this.usersService
              //     .create(this.first_name, this.last_name, this.new_email, this.new_password)
              //     .subscribe({
              //       next: (user) => {

              //       if (user) {
              //         this.authenticate(this.new_email, this.new_password);
              //       }
              //     }, error: (err) => {
              //       this.error = err.error.error;
              //     }})
              // }
}