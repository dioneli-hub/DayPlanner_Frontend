import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersBoardsComponent } from './users-boards/users-boards.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { TodaysTasksComponent } from './todays-tasks/todays-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsersBoardsComponent,
    HomeContentComponent,
    TodaysTasksComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
