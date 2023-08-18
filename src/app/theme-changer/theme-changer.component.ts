import { Component, ElementRef, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Themes, ThemingService } from 'src/services/theming.service';

@Component({
  selector: 'app-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.css']
})
export class ThemeChangerComponent {

  @ViewChild('ball', { static: true }) ball: ElementRef;
  @ViewChild('changerBody', { static: true }) body: ElementRef;

  constructor(private renderer: Renderer2,
              private themingService: ThemingService) {}

  ngAfterViewInit(){
      let theme = this.themingService.getActiveColorTheme();
  
      if(theme == Themes.DEFAULT){
        this.moveToFirstPosition();
      } else if (theme == Themes.COLDBLUE) {
        this.moveToSecondPosition()
      } else {
        this.moveToThirdPosition()
      }
  }

  changeToFirstTheme(){
    this.themingService.setTheme(Themes.DEFAULT)
    this.moveToFirstPosition();

  }

  changeToSecondTheme(){
    this.themingService.setTheme(Themes.COLDBLUE)
    this.moveToSecondPosition()
  }

  changeToThirdTheme(){
    this.themingService.setTheme(Themes.BARBIE)
    this.moveToThirdPosition()
  }

private moveToFirstPosition(){
  const ball = this.ball.nativeElement;
  const body = this.body.nativeElement;
  this.renderer.setStyle(ball, 'left', '4px');
  this.renderer.addClass(body, 'moon');
  this.renderer.removeClass(body, 'sun');
  this.renderer.removeClass(body, 'meteor');
}

private moveToSecondPosition(){
  const ball = this.ball.nativeElement;
  const body = this.body.nativeElement;
  this.renderer.setStyle(ball, 'left', '38px');
  this.renderer.removeClass(body, 'meteor');
  this.renderer.removeClass(body, 'moon');
  this.renderer.addClass(body, 'sun');
}



private moveToThirdPosition(){
  const ball = this.ball.nativeElement;
  const body = this.body.nativeElement;
    this.renderer.setStyle(ball, 'left', '72px');
    this.renderer.removeClass(body, 'sun');
    this.renderer.removeClass(body, 'moon');
    

}
}
