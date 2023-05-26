import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
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

  constructor(private authService: AuthenticationService,
              private userService: UserService,
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
                this.error = '';
                this.authService
                  .auth(email, password)
                  .subscribe((res) => {
                    if (res) {
                      this.router.navigate(['/']).then();
                    }
                  }, err => this.error = err.error.error)
              }
            
              createAccount() {
                this.error = '';
                this.userService
                  .create(this.first_name, this.last_name, this.new_email, this.new_password)
                  .subscribe((user) => {
                    if (user) {
                      this.authenticate(this.new_email, this.new_password);
                    }
                  }, err => this.error = err.error.error)
              }
            }