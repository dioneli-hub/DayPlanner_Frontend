import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{

  new_password = '';
  reset_token = '';
  
  error = '';
  errorMessage: string = '';
  successMessage: string = '';


  constructor(
              private usersService: UsersService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['token'] != undefined)
      this.reset_token = decodeURIComponent(params['token']);
    })
  }

              resetPassword() {
                this.error = '';
                this.errorMessage = '';
                this.successMessage = '';

                this.usersService.resetPassword(this.reset_token, this.new_password)
                  .subscribe({
                    next:(res: any) => {
                       if(res.isSuccess){
                        this.errorMessage = '';
                        this.successMessage = res.message;
                     }
                      else {
                        this.errorMessage = res.message;
                     }
                        
                  },
                    error: (error) => {
                      console.log(error);
                    }
                });
              }
}


