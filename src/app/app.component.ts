import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ThemingService } from 'src/services/theming.service';
// import { THEMING_SERVICE_TOKEN } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'TimeManagementWeb';

  constructor(private themingService: ThemingService,
) {}

  ngOnInit(): void {
    this.themingService.loadTheme();
  }
}
