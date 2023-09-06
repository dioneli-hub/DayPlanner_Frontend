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

  showLoading: boolean = false;
  showVerificationIconLoading: boolean = false;
  email: string = '';
  password: string = '';

  new_email: string = '';
  new_password: string = '';
  first_name: string = '';
  last_name: string = '';

  // verification_token: string = '';

  error = '';
  errorMessage: string = '';
  successMessage: string = '';

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
                  this.showLoading = true;
                  this.error = '';
                  this.errorMessage = '';
                  this.successMessage = '';

                  this.authService
                    .auth(email, password)
                    .subscribe
                      ((res: any) => {
                            this.showLoading = false;
                            if(res)
                            if(res.isSuccess == true){
                              this.router.navigate(['/']).then();
                            } else {
                              
                              this.errorMessage = res.message
                            }
                        },
                        
                          error => {
                            console.log(error)
                            this.showLoading = false;
                          }
                      );
                }
              
            
              createAccount() 
              {
                this.showLoading = true;
                this.successMessage = '';
                this.errorMessage = '';
                this.error = '';
                
                this.usersService
                  .create(this.first_name, this.last_name, this.new_email, this.new_password)
                    .subscribe
                    ((res: any) => {
                          //console.log(res)
                          this.showLoading = false;
                          if(res.isSuccess == true){
                            //this.authenticate(this.new_email, this.new_password);
                            this.errorMessage = '';
                            this.successMessage = res.message;
                          } else {
                            
                            this.errorMessage = res.message
                          }
                      },
                         error => {
                          console.log(error)
                          this.showLoading = false;}
                    );
                      
              }

              sendVerificationEmail(){
                this.successMessage = '';
                this.errorMessage = '';
                this.error = '';
                this.showVerificationIconLoading = true;

                this.usersService
                      .sendVerificationEmail(this.email)
                      .subscribe((res: any) => {

                        this.showVerificationIconLoading = false;
                        if(res.isSuccess == true){
                          this.errorMessage = '';
                          this.successMessage = res.message;
                        } else {
                          
                          this.errorMessage = res.message
                        }
                    },
                       error => {
                        console.log(error)
                        this.errorMessage = "Some error has occured..."
                        setTimeout(()=>{
                          this.errorMessage = '';
                        }, 5000)
                        
                        this.showVerificationIconLoading = false;}
                  );
                    
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

                 // verify() {
              //   this.error = '';
              //   this.errorMessage = '';
              //   this.successMessage = '';

              //   this.usersService.verify(this.verification_token)
              //     .subscribe({
              //       next:(res: any) => {
              //         if(res){
              //           this.errorMessage = ''
              //           this.successMessage = res + "Please, try to log in.";
              //         } else {
              //           this.errorMessage = "Wrong token. Please, try again."
              //         }
              //     },
              //       error: error => console.log(error)
              //   });
              // }

}