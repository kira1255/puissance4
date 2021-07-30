import { Pawn } from "./pawn";
import { Player } from "./player";

export interface Game {
    player1: Player;
    player2: Player;
    turn?: Player;
    winner?: Player;
    rows: number;
    columns: number;
    pawns: Pawn[];
}