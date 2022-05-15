import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from 'src/app/models/player';

/**
 * Dialog component, shown when the game ends
 */
@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EndGameComponent{

  /**
   * Text to show when red wins
   */
  public redWins: string = "Victoire des rouges !";
  /**
   * Text to show when yellow wins
   */
  public yellowWins: string = "Victoire des jaunes !";

  /**
   * Constructor takes winner in parameter
   * @param {Player} winner the player that did win the game (from the store) 
   */
  constructor(@Inject(MAT_DIALOG_DATA) public winner: Player) {}

}
