import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ThemingService {
    private renderer: Renderer2;
  
    constructor(private rendererFactory: RendererFactory2) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
    }
  
    setTheme(themeName: string) {
      const themeFilePath = `assets/themes/${themeName}-theme.css`;
      const head = document.head;
      const themeLink = this.renderer.createElement('link');
      themeLink.setAttribute('rel', 'stylesheet');
      themeLink.setAttribute('type', 'text/css');
      themeLink.setAttribute('href', themeFilePath);
  
      const existingLink = head.querySelector('link[href*="-theme.css"]');
      if (existingLink) {
        this.renderer.removeChild(head, existingLink);
      }
      this.renderer.appendChild(head, themeLink);
    }
  }
