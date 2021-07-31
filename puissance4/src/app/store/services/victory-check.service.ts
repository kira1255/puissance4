import { Injectable } from '@angular/core';
import { Game } from 'src/app/models/game';
import { Pawn } from 'src/app/models/pawn';

/**
 * Provide methods to check if 4 pawns are aligned
 */
@Injectable({
  providedIn: 'root'
})
export class VictoryCheckService {

  /**
   * Check if 4 pawns are aligned vertically in the last column played
   */
  public verticalCheck(game: Game, columnPlayed: number, pawnPlayed: Pawn): boolean{

    let won: boolean = false;

    // On récupère les pions de la colonne jouée qui appartiennent au joueur
    let playerColumn = game.pawns.filter(p => (p.x === columnPlayed && p.player.id === pawnPlayed.player.id));
    // On ordonne le tableau
    playerColumn = playerColumn.sort((a,b) => (a.y - b.y));
    // On check si on a 4 pions alignés
    let alignedPawns: number = 1;
    playerColumn.map((pawn, index, pawnList) => {
        if(pawn.y === pawnList[index - 1]?.y + 1 ) {
            alignedPawns++;
        }
        else alignedPawns = 1;

        if(alignedPawns > 3) {
          console.info(pawnPlayed.player.name + " a aligné 4 pions verticalement! 🎉")
          won = true;
        }
    });

    return won;
  }

  /**
   * Check if 4 pawns are aligned horizontally in the last row played
   */
  public horizontalCheck(game: Game, rowPlayed: number, pawnPlayed: Pawn): boolean{

    let won: boolean = false;

    // On récupère les pions de la ligne jouée qui appartiennent au joueur
    let playerRow = game.pawns.filter(p => (p.y === rowPlayed && p.player.id === pawnPlayed.player.id));
    // On ordonne le tableau
    playerRow = playerRow.sort((a,b) => (a.x - b.x));
    // On check si on a 4 pions alignés
    let alignedPawns: number = 1;
    playerRow.map((pawn, index, pawnList) => {
        if(pawn.x === pawnList[index - 1]?.x + 1 ) {
            alignedPawns++;
        }
        else alignedPawns = 1;

        if(alignedPawns > 3) {
          console.info(pawnPlayed.player.name + " a aligné 4 pions horizontalement! 🎉")
          won = true;
        }
    });

    return won;
  }

  /**
   * Check if 4 pawns are aligned diagonally in the last cell played, from bottom right to up left
   */
  public diagonalRightCheck(game: Game, pawnPlayed: Pawn): boolean{

    let won: boolean = false;

    // On récupère tous les pions du joueur dans la diagonale droite 
    let playerPawns = game.pawns.filter(p => (p.x + p.y === pawnPlayed.x + pawnPlayed.y ) && (p.player.id === pawnPlayed.player.id));
    
    // On ordonne le tableau
    playerPawns = playerPawns.sort((a,b) => (a.x - b.x));
    // On check si on a 4 pions alignés
    let alignedPawns: number = 1;
    playerPawns.map((pawn, index, pawnList) => {
        if((pawn.x === pawnList[index - 1]?.x + 1) && (pawn.y === pawnList[index - 1]?.y - 1)) {
            alignedPawns++;
        }
        else alignedPawns = 1;

        if(alignedPawns > 3) {
          console.info(pawnPlayed.player.name + " a aligné 4 pions en diagonale! 🎉")
          won = true;
        }
    });

    return won;
  }

  /**
   * Check if 4 pawns are aligned diagonally in the last cell played, from bottom left to up right
   */
  public diagonalLeftCheck(game: Game, pawnPlayed: Pawn): boolean{

    let won: boolean = false;

    // On récupère tous les pions du joueur dans la diagonale droite 
    let playerPawns = game.pawns.filter(p => (p.x - p.y === pawnPlayed.x - pawnPlayed.y ) && (p.player.id === pawnPlayed.player.id));
    
    // On ordonne le tableau
    playerPawns = playerPawns.sort((a,b) => (a.x - b.x));
    // On check si on a 4 pions alignés
    let alignedPawns: number = 1;
    playerPawns.map((pawn, index, pawnList) => {
        if((pawn.x === pawnList[index - 1]?.x + 1) && (pawn.y === pawnList[index - 1]?.y + 1)) {
            alignedPawns++;
        }
        else alignedPawns = 1;

        if(alignedPawns > 3) {
          console.info(pawnPlayed.player.name + " a aligné 4 pions en diagonale! 🎉")
          won = true;
        }
    });

    return won;
  }
}
