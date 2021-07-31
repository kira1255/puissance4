import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Game } from '../models/game';
import { Pawn } from '../models/pawn';
import { CheckWinner, GameReset, PlayPawn, CancelLastMove } from '../store/game/game.actions';
import { GameState } from '../store/game/game.state';
import { EndGameComponent } from './dialogs/end-game/end-game.component';
import { Router } from '@angular/router';
import { Player } from '../models/player';

/**
 * Game component
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  /**
   * Game State from the store
   * @type {Observable<Game>}
   */
  @Select(GameState.getGame) game!: Observable<Game>;

  /**
   * Number of columns, doesn't get any actual pawn in it
   * @type {Array<Pawn>}
   */
  public gridX: Array<Pawn> = [];

  /**
   * Number of rows, doesn't get any actual pawn in it
   * @type {Array<Pawn>}
   */
  public gridY: Array<Pawn> = [];

  /**
   * @ignore
   */
  constructor(
    private store: Store,
    private _snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
    ) { }

    /**
   * @ignore
   */
  ngOnInit(): void {
    this.initGame();
  }

  /**
   * Get rows and columns to set from the store
   */
  private initGame(){
    this.game.pipe(take(1)).subscribe(g => {
      this.gridX = Array(g!.columns);
      this.gridY = Array(g!.rows);
    });
  }

  /**
   * Dispatch GameReset Action from the store, fresh start (removes all the pawns and set turn to player one)
   */
  resetGame(){
    this.store.dispatch(new GameReset());
  }

  /**
   * Dispatch CancelLastMove Action from the store, remove last pawn played and sets turn to the last player
   */
  cancelLastMove(){
    this.store.dispatch(new CancelLastMove());
  }

  /**
   * Play a pawn if the column played isn't full (shows a snackbar if so), end games if the grid is full or if the player won
   * @param {number} column column in wich the pawns will be put
   */
  public playPawn(column: number){
    this.game.pipe(take(1)).subscribe(g => {
      const playedPawn: Pawn = {
        x: column,
        y: this.getYPositionInColumn(column),
        player: g.turn!
      }
      this.store.dispatch(new PlayPawn( playedPawn )).subscribe(
        (store) => {
          this.animateFallingPawn(playedPawn.x, playedPawn.y, g.turn!);
          this.checkVictory(playedPawn);

          // Vérif : Si la grille est pleine, on termine le jeu sur un match nul
          if(store.game.game.pawns?.length === store.game.game.rows * store.game.game.columns){
            this.openEndGameDialog(store.game.game.winner);
          }
        },
        error => {
          this._snack.open(error.message, "OK");
        }
      );
    })
  }

  /**
   * Get the number of pawns in a column to set the vertical position of the next pawn that will be played in that column
   * @param {number} column column in wich the pawns will be put
   * @return {number}
   */
  private getYPositionInColumn(column: number): number{
    let pawnsInColumn: number = 0;
    this.game.pipe(take(1)).subscribe(g => {
      // On récupère le nombre de pions dans la colonne passée en param
      pawnsInColumn = g.pawns.filter(p => p.x === column).length;
    });
    // on retourne la position en Y à occuper par le pion
    return pawnsInColumn;
  }

  /**
   * Get a Pawn if present on given coordinates
   * @param {number} x column in wich the pawns will be put
   * @param {number} y row in wich the pawns will be put
   * @return {Pawn}
   */
  public displayPawn(x: number, y: number): Pawn{
    let pawnToDisplay!: Pawn;
    
    this.game.pipe(take(1)).subscribe(g => {
      // On check dans la liste de pions du store si on en a un aux coordonnées de la case passée en paramètres
      g.pawns.map(p => {
        if (p.x === x && p.y === y) {
          pawnToDisplay = p;
        }
      });
    });
    return pawnToDisplay;
  }

  /**
   * Dispatch CheckWinner Action from the store, checks if played pawn causes a victory
   * @param {Pawn} playedPawn pawn that was just played
   */
  private checkVictory(playedPawn: Pawn){
    this.store.dispatch(new CheckWinner(playedPawn)).subscribe(store => {
      if(store.game.game.winner){
        this.openEndGameDialog(store.game.game.winner);
      }
    });
  }

  /**
   * Shows the end game dialog
   * @param {Player} winner player that played that last pawn and won
   */
  public openEndGameDialog(winner?: Player) {
    const dialogRef = this.dialog.open(EndGameComponent, {
      data: winner,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 'quit':
          this.router.navigate(['home']);
          break;
        case 'replay':
          this.resetGame()
          break;
      
        default:
          break;
      }
    });
  }

  /**
   * Animate a falling pawn in the column played, falling up to the row where the pawn will fall
   * @param {number} column column played
   * @param {number} row row where the animation ends
   * @param {Player} player player that played to determine the color of the pawn to animate
   */
  animateFallingPawn(column: number, row: number, player: Player){
    const pawnColor = player.id === 0 ? "red" : "yellow";
    let pawnToAnimate: HTMLElement = document.getElementsByClassName(`falling-${pawnColor}-${column}`)[0] as HTMLElement;
    pawnToAnimate.classList.add("show");
    setTimeout(() => {
      pawnToAnimate.style.top = `${((this.gridY.length - 1 - row) * 100)}%`;
    }, 10);
    setTimeout(() => {
      pawnToAnimate.classList.remove("show");
      pawnToAnimate.style.top = "0%";
    }, 140);
    
  }

}
