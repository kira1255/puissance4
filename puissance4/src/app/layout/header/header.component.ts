import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToogleTheme } from '../../store/theme/theme.actions';
import { ThemeState } from '../../store/theme/theme.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(ThemeState.getTheme) dark!: Observable<boolean>;

  constructor(private store: Store) { 

  }

  ngOnInit(): void {
    this.applyDarkTheme();
  }

  toogleTheme() {
    this.store.dispatch(new ToogleTheme());
    this.applyDarkTheme();
  }

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
