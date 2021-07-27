import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeState } from './store/theme/theme.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'puissance4';
  @Select(ThemeState.getTheme) isDarkTheme!: Observable<boolean>;
}
