import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
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

  }

  toogleTheme() {
    this.store.dispatch(new ToogleTheme());
  }

}
