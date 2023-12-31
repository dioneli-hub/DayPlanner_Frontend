import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
    verificationToken: string;
  
    constructor(private route: ActivatedRoute,
                private usersService: UsersService) {}
  
    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        this.verificationToken = decodeURIComponent(params['token']);
        this.usersService
            .verify(this.verificationToken)
            .subscribe();
      });
    }
}
