import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToogleTheme } from '../../store/theme/theme.actions';
import { ThemeState } from '../../store/theme/theme.state';

/**
 * App header component
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * Gets the theme set from the store
   * @type {Observable<boolean>}
   */
  @Select(ThemeState.getTheme) dark!: Observable<boolean>;

  /**
   * @ignore
   */
  constructor(private store: Store) { 

  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.applyDarkTheme();
  }

  /**
   * Toogle theme
   */
  toogleTheme() {
    this.store.dispatch(new ToogleTheme());
    this.applyDarkTheme();
  }

  /**
   * Applies selected theme in body tag , for global theming
   */
  applyDarkTheme(){
    this.dark.pipe(take(1)).subscribe(isDark => {
      if(isDark){
        document.body.classList.add("dark-theme");
      }
      else{
        
        document.body.classList.remove("dark-theme");
      }
    });
  }

}
