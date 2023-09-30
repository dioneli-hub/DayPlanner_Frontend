import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { Themes, ThemingService } from 'src/services/theming.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
    constructor(private authService: AuthenticationService,
                private router: Router,
                private themingService: ThemingService) {
    }
  
    get isAuthenticated() {
      return this.authService.isAuthenticated();
    }
  
    logout() {
      this.authService.logout();
      this.router.navigate(['/login']).then();
    }

    get logoPath(): string{
      return this.themingService.getActiveColorTheme() == Themes.DEFAULT?  
          "assets/DayPlannerLogoDark.svg" : "assets/DayPlannerLogoLight.svg";
    }

    get sidebarCloseBtnClass(){
      return this.themingService.getActiveColorTheme() == Themes.COLDBLUE? 
        "" : "btn-close-white";
    }

    get navbarTogglerIconClass(){
       return this.themingService.getActiveColorTheme() == Themes.COLDBLUE? 
       "" :  "navbar-dark";
    }
}
