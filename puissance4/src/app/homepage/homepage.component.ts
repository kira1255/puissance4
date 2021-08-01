import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameReset, SetColumns, SetRows } from '../store/game/game.actions';
import { GameState } from '../store/game/game.state';


/**
 * Homepage component
 */
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {

  /**
   * Rows from the store to set in the slider when loading the component
   * @param {Observable<number>} 
   */
  @Select(GameState.getRows) rows!: Observable<number>;

  /**
   * Columns from the store to set in the slider when loading the component
   * @param {Observable<number>} 
   */
  @Select(GameState.getColumns) columns!: Observable<number>;

  /**
   * @ignore
   */
  constructor(
    private store: Store,
    private router: Router) { }

    /**
   * Resets the game and navigate to the game page
   */
  startGame(){
    this.store.dispatch(new GameReset());
    this.router.navigate(['game']);
  }

  /**
   * Sets the columns in the store from the column slider
   */
  setColumns(event: any){
    this.store.dispatch(new SetColumns(event.value));
  }

  /**
   * Sets the rows in the store from the row slider
   */
  setRows(event: any){
    this.store.dispatch(new SetRows(event.value));
  }

  /**
   * Navigate to an external link
   * @param {string} link link to navigate to
   */
  navigateToExternalURL(link: string){
    window.location.href = link;
  }

}
