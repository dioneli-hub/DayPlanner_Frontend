import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: 'root'
})


export class ThemingService {
  private renderer: Renderer2;
  private storageKey = 'activeColorTheme';
  
  constructor(private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document) {
      
    this.renderer = this.rendererFactory.createRenderer(null, null);
    }

  loadTheme(){
    const storedTheme = this.getActiveColorTheme();
    if (storedTheme) {
      this.setTheme(storedTheme);
    } else {
      this.setTheme(Themes.DEFAULT);
    }
  }
  setTheme(themeName: string){
    localStorage.setItem(this.storageKey, themeName);
    this.removeUnusedThemes();
    this.document.body.classList.add(themeName);
  }

  private removeUnusedThemes(){
    let classes = document.body.classList;
    let unusedThemes = Array.from(classes).filter(className =>
      className.endsWith('-theme')
      );

      unusedThemes.forEach(className => {
        classes.remove(className);
      });
  }


  getActiveColorTheme(): string {
  return localStorage.getItem(this.storageKey);
  }
}

const Themes = {
  DEFAULT: 'default-theme',
  COLDBLUE: 'coldblue-theme',
};

