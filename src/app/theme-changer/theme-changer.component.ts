import { Component, ElementRef, Renderer2, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-theme-changer',
  templateUrl: './theme-changer.component.html',
  styleUrls: ['./theme-changer.component.css']
})
export class ThemeChangerComponent {

  @ViewChild('ball', { static: true }) ball: ElementRef;
  @ViewChild('changerBody', { static: true }) body: ElementRef;

  constructor(private renderer: Renderer2) {}

// ngAfterViewInit(){
  
// }

changeFirstTheme(){
  const ball = this.ball.nativeElement;
  const body = this.body.nativeElement;
  this.renderer.setStyle(ball, 'left', '4px');
  this.renderer.removeClass(body, 'sun');
  this.renderer.removeClass(body, 'meteor');
}

changeSecondTheme(){
  const ball = this.ball.nativeElement;
  const body = this.body.nativeElement;
  this.renderer.setStyle(ball, 'left', '38px');
  this.renderer.removeClass(body, 'meteor');
  this.renderer.removeClass(body, 'moon');
  this.renderer.addClass(body, 'sun');
}



changeThirdTheme(){
  const ball = this.ball.nativeElement;
  const body = this.body.nativeElement;
    this.renderer.setStyle(ball, 'left', '72px');
    this.renderer.removeClass(body, 'sun');
    this.renderer.removeClass(body, 'moon');
    

}
}
