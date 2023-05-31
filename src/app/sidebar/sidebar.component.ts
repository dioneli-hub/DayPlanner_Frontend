import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
    constructor(private authService: AuthenticationService,
                private router: Router) {
    }
  
    get isAuthenticated() {
      return this.authService.isAuthenticated();
    }
  
    logout() {
      this.authService.logout();
      this.router.navigate(['/login']).then();
    }
}
