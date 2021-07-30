import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GameReset } from '../store/game/game.actions';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private store: Store,
    private router: Router) { }

  ngOnInit(): void {
  }

  startGame(){
    this.store.dispatch(new GameReset());
    this.router.navigate(['game']);
  }

}
