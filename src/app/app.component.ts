import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeState } from './store/theme/theme.state';

/**
 * App component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Get theme from the store, gets applied in the template
   */
  @Select(ThemeState.getTheme) isDarkTheme!: Observable<boolean>;
}
