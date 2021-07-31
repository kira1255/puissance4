import { Pawn } from "./pawn";
import { Player } from "./player";

/**
 * Represents the game state
 */
export interface Game {
    /**
     * player one
     */
    player1: Player;

    /**
     * player two
     */
    player2: Player;

    /**
     * player that have to play now
     */
    turn?: Player;

    /**
     * player that did win the game
     */
    winner?: Player;

    /**
     * number of rows of the grid, to be selected on the homepage
     */
    rows: number;

    /**
     * number of columns of the grid, to be selected on the homepage
     */
    columns: number;

    /**
     * Pawns that have been played since the game began
     */
    pawns: Pawn[];
}