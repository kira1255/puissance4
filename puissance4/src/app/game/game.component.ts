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

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Select(GameState.getGame) game!: Observable<Game>;

  public gridX: Array<Pawn> = [];
  public gridY: Array<Pawn> = [];

  constructor(
    private store: Store,
    private _snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initGame();
  }

  private initGame(){
    this.game.pipe(take(1)).subscribe(g => {
      this.gridX = Array(g!.columns);
      this.gridY = Array(g!.rows);
    });
  }

  resetGame(){
    this.store.dispatch(new GameReset());
  }

  cancelLastMove(){
    this.store.dispatch(new CancelLastMove());
  }

  public playPawn(column: number){
    this.game.pipe(take(1)).subscribe(g => {
      const playedPawn: Pawn = {
        x: column,
        y: this.getYPositionInColumn(column),
        player: g.turn!
      }
      this.store.dispatch(new PlayPawn( playedPawn )).subscribe(
        (store) => {
          
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

  private getYPositionInColumn(column: number){
    let pawnsInColumn: number = 0;
    this.game.pipe(take(1)).subscribe(g => {
      // On récupère le nombre de pions dans la colonne passée en param
      pawnsInColumn = g.pawns.filter(p => p.x === column).length;
    });
    // on retourne la position en Y à occuper par le pion
    return pawnsInColumn;
  }

  // Pion à montrer passé en Input aux component des cases sur la grille
  public displayPawn(x: number, y: number): Pawn{
    let pawnToDisplay!: Pawn;
    this.game.pipe(take(1)).subscribe(g => {
      // On check dans la liste de pions du store si on en a un aux coordonnées de la case passée en paramètres
      g.pawns.map(p => {
        if(p.x === x && p.y === y){
          pawnToDisplay = p;
        }
      })
    });
    return pawnToDisplay;
  }

  private checkVictory(playedPawn: Pawn){
    this.store.dispatch(new CheckWinner(playedPawn)).subscribe(store => {
      if(store.game.game.winner){
        this.openEndGameDialog(store.game.game.winner);
      }
    });
  }

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

}
