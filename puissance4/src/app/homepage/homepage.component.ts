import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GameReset, SetColumns, SetRows } from '../store/game/game.actions';
import { GameState } from '../store/game/game.state';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @Select(GameState.getRows) rows!: Observable<number>;
  @Select(GameState.getColumns) columns!: Observable<number>;

  constructor(
    private store: Store,
    private router: Router) { }

  ngOnInit(): void {
  }

  startGame(){
    this.store.dispatch(new GameReset());
    this.router.navigate(['game']);
  }

  setColumns(event: any){
    this.store.dispatch(new SetColumns(event.value));
  }

  setRows(event: any){
    this.store.dispatch(new SetRows(event.value));
  }

}
