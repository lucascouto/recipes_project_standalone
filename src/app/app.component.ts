import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loadedMenu = 'recipe';

  onNavigate(menu: string): void {
    this.loadedMenu = menu;
  }
}
