import { Component } from '@angular/core';
import { ThemingService } from 'src/services/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TimeManagementWeb';

  constructor(private themingService: ThemingService) {}

  setTheme(theme: string) {
    this.themingService.setTheme(theme);
  }
}
