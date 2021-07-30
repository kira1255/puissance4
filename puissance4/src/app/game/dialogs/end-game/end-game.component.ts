import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EndGameComponent implements OnInit {

  public redWins: string = "Victoire des rouges !";
  public yellowWins: string = "Victoire des jaunes !";

  constructor(@Inject(MAT_DIALOG_DATA) public winner: Player) {}

  ngOnInit(): void {
  }

}
